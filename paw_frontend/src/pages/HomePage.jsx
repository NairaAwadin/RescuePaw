import React, { useState } from "react";
import HeroSearch from "../components/home/HeroSearch";
import MapView from "../components/home/MapView";
import WellbeingCard from "../components/home/WellbeingCard";
import Card from "../components/ui/Card";
import { mockTerritoires } from "../data/mockData";
import { Sparkles, TrendingUp, Shield, PawPrint, AlertCircle } from "lucide-react";
import { api } from "../api/client";

export default function HomePage({ onNavigate }) {
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");

  const handleSearch = async (query) => {
    setSearchError("");
    try {
      const res = await api.getWellbeing(query.length === 5 ? { zip_code: query } : { ville: query });
      setSearchResult(res);
    } catch {
      // Fallback mock
      const found = mockTerritoires.find(t => t.zip_code === query || t.ville.toLowerCase().includes(query.toLowerCase()));
      if (found) setSearchResult(found);
      else { setSearchResult(null); setSearchError("Aucune ville trouvée pour cette recherche."); }
    }
  };

  const features = [
    { icon: Sparkles, title: "Matching IA", desc: "Notre algorithme trouve le compagnon idéal selon votre mode de vie." },
    { icon: TrendingUp, title: "Score territorial", desc: "Chaque ville reçoit une note de bien-être animal de A à E." },
    { icon: Shield, title: "Données vérifiées", desc: "Sources INSEE et OpenStreetMap pour des analyses fiables." },
  ];

  return (
    <div className="min-h-screen bg-beige-50">
      <HeroSearch onSearch={handleSearch} onStartQuiz={() => onNavigate("quiz")} />

      {searchError && (
        <div className="max-w-2xl mx-auto px-6 relative z-10 -mt-8 mb-12">
          <div className="bg-ambre-50 border border-ambre-200 rounded-2xl p-5 flex items-center gap-3">
            <AlertCircle size={18} className="text-ambre-600 shrink-0" />
            <span className="text-sm text-ambre-700 font-medium">{searchError}</span>
          </div>
        </div>
      )}

      {searchResult && (
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-taupe-900">Score de bien-être</h2>
            <button 
              onClick={() => setSearchResult(null)}
              className="text-taupe-300 hover:text-taupe-600 transition-colors text-3xl font-light cursor-pointer"
            >
              ✕
            </button>
          </div>
          <MapView territoire={searchResult} />
        </section>
      )}

      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-taupe-900 mb-4">Pourquoi RescuePaw ?</h2>
          <p className="text-taupe-600 text-lg">Une plateforme pensée pour vous et les animaux</p>
        </div>
        <div className="space-y-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-12 h-12 bg-canard-100 rounded-xl flex items-center justify-center shrink-0 mt-1">
                <Icon size={24} className="text-canard-600" />
              </div>
              <div>
                <h3 className="font-semibold text-taupe-900 mb-1">{title}</h3>
                <p className="text-sm text-taupe-600 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <button 
          onClick={() => onNavigate("signalement")}
          className="w-full bg-white border border-beige-300 rounded-2xl p-8 hover:shadow-lg transition-all text-left group"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-ambre-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-ambre-100 transition-colors">
              <AlertCircle size={28} className="text-ambre-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-taupe-900 mb-2">Vous avez trouvé un animal ?</h3>
              <p className="text-taupe-600">Signalez-le de manière anonyme. Nous proposons les refuges locaux pour aider.</p>
            </div>
          </div>
        </button>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24 pb-32">
        <div className="bg-gradient-to-br from-canard-600 to-canard-700 rounded-3xl p-12 sm:p-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Prêt à changer une vie ?</h2>
          <p className="text-canard-100 text-base mb-10 max-w-md mx-auto leading-relaxed">En 2 minutes, trouvez l'animal qui correspond parfaitement à votre style de vie.</p>
          <button 
            onClick={() => onNavigate("quiz")} 
            className="bg-ambre-400 hover:bg-ambre-500 text-white px-10 py-4 rounded-2xl text-base font-semibold transition-all inline-block shadow-lg hover:shadow-xl"
          >
            Lancer le quiz
          </button>
        </div>
      </section>
    </div>
  );
}
