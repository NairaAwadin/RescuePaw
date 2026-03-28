import React, { useState, useMemo } from "react";
import { ArrowLeft, SlidersHorizontal, Dog, Cat, RotateCcw } from "lucide-react";
import AnimalCard from "../components/matching/AnimalCard";
import AnimalProfile from "../components/matching/AnimalProfile";
import Button from "../components/ui/Button";
import { mockAnimals } from "../data/mockData";

export default function MatchingPage({ answers, onRestart, onExit, onLoginRequired }) {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [speciesFilter, setSpeciesFilter] = useState("ALL");

  // In production: api.getMatching() would return ranked animals
  // For now, use mock data sorted by match_score
  const sortedAnimals = useMemo(() => {
    let filtered = [...mockAnimals];
    // Apply species preference from quiz
    if (answers?.species_pref && answers.species_pref !== "BOTH") {
      // Boost matching species but still show all
    }
    if (speciesFilter !== "ALL") {
      filtered = filtered.filter(a => a.species === speciesFilter);
    }
    return filtered.sort((a, b) => b.match_score - a.match_score);
  }, [speciesFilter, answers]);

  if (selectedAnimal) {
    return <AnimalProfile animal={selectedAnimal} onBack={() => setSelectedAnimal(null)} onLoginRequired={onLoginRequired} />;
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={onExit} className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-4 cursor-pointer">
            <ArrowLeft size={18} strokeWidth={1.5} /> Retour à l'accueil
          </button>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-anthracite">Vos compagnons compatibles</h1>
              <p className="text-text-secondary mt-1">{sortedAnimals.length} animaux correspondent à votre profil</p>
            </div>
            <div className="flex items-center gap-2">
              {[{ value: "ALL", label: "Tous", icon: SlidersHorizontal }, { value: "DOG", label: "Chiens", icon: Dog }, { value: "CAT", label: "Chats", icon: Cat }].map(({ value, label, icon: Icon }) => (
                <button key={value} onClick={() => setSpeciesFilter(value)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${speciesFilter === value ? "bg-forest-600 text-white shadow-sm" : "bg-white text-text-secondary border border-border hover:border-sage-300"}`}>
                  <Icon size={15} strokeWidth={1.5} />{label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {sortedAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedAnimals.map(animal => <AnimalCard key={animal.id} animal={animal} onSelect={setSelectedAnimal} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-muted mb-4">Aucun animal ne correspond à ce filtre.</p>
            <Button variant="outline" icon={RotateCcw} onClick={() => setSpeciesFilter("ALL")}>Réinitialiser les filtres</Button>
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="ghost" icon={RotateCcw} onClick={onRestart}>Refaire le quiz</Button>
        </div>
      </div>
    </div>
  );
}
