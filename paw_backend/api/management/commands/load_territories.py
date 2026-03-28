"""
Django management command pour charger les données territoriales depuis le CSV villes_scored_final.csv
Usage: python manage.py load_territories
"""

import pandas as pd
import os
from django.core.management.base import BaseCommand
from django.db.models import Q
from api.models import Territoire


class Command(BaseCommand):
    help = 'Charge les données territoriales depuis villes_scored_final.csv'

    def handle(self, *args, **options):
        # Chemin du fichier CSV
        csv_path = os.path.join(
            os.path.dirname(__file__),
            '../../../../paw_data/donnees_propres/villes_scored_final.csv'
        )

        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f'Fichier non trouvé: {csv_path}'))
            return

        try:
            # Charger le CSV
            df = pd.read_csv(csv_path)
            self.stdout.write(f'CSV chargé: {len(df)} lignes trouvées')

            # Vérifier les colonnes nécessaires
            required_cols = ['code_postal', 'nom_commune', 'nom_departement', 'note_bien_etre']
            missing_cols = [col for col in required_cols if col not in df.columns]
            if missing_cols:
                self.stdout.write(self.style.ERROR(f'Colonnes manquantes: {missing_cols}'))
                return

            # Importer les données
            created_count = 0
            updated_count = 0

            for idx, row in df.iterrows():
                zip_code = str(row['code_postal']).strip()
                ville = str(row['nom_commune']).strip()
                # Extraire le code département des deux premiers chiffres du code postal
                department_code = zip_code[:2] if len(zip_code) >= 2 else '00'
                well_being_score = str(row['note_bien_etre']).strip()

                # Préparer les données OSM si disponibles
                osm_details = {}
                # Mapper les colonnes du CSV aux clés attendues par le frontend
                osm_mapping = {
                    'nb_vets': 'vets',
                    'nb_parcs': 'parks',
                    'nb_parcs_canins': 'dog_parks',
                    'nb_forets': 'forests',
                    'nb_refuges': 'shelters'
                }
                for csv_col, key in osm_mapping.items():
                    if csv_col in df.columns and pd.notna(row[csv_col]):
                        osm_details[key] = int(row[csv_col])

                # Préparer les données INSEE si disponibles
                income_level = 0.0
                unemployment_rate = 0.0
                sec_home_ratio = 0.0
                latitude = 46.603  # Défaut: centre de la France
                longitude = 2.888

                if 'score_brut' in df.columns and pd.notna(row['score_brut']):
                    income_level = float(row['score_brut'])

                if 'latitude' in df.columns and pd.notna(row['latitude']):
                    latitude = float(row['latitude'])

                if 'longitude' in df.columns and pd.notna(row['longitude']):
                    longitude = float(row['longitude'])

                # Créer ou mettre à jour le territoire
                territoire, created = Territoire.objects.update_or_create(
                    zip_code=zip_code,
                    defaults={
                        'ville': ville,
                        'department_code': department_code,
                        'well_being_score': well_being_score,
                        'income_level': income_level,
                        'unemployment_rate': unemployment_rate,
                        'sec_home_ratio': sec_home_ratio,
                        'osm_details': osm_details,
                        'latitude': latitude,
                        'longitude': longitude,
                        'risk_index': 0.0,  # À calculer par l'IA
                        'score_factors': [f'Score bien-être: {well_being_score}'],
                    }
                )

                if created:
                    created_count += 1
                else:
                    updated_count += 1

            self.stdout.write(self.style.SUCCESS(
                f'✓ Importation réussie!\n'
                f'  - {created_count} territoires créés\n'
                f'  - {updated_count} territoires mis à jour\n'
                f'  - Total en BD: {Territoire.objects.count()}'
            ))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Erreur lors du chargement: {str(e)}'))
