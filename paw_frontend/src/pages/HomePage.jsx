import React, { useState } from "react";
import HeroSearch from "../components/home/HeroSearch";
import MapView from "../components/home/MapView";
import WellbeingCard from "../components/home/WellbeingCard";
import Card from "../components/ui/Card";
import { mockTerritoires } from "../data/mockData";
import { Sparkles, TrendingUp, Shield, PawPrint, AlertCircle, ArrowRight } from "lucide-react";
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
        <div className="w-full flex justify-center px-6 relative z-10 -mt-12 mb-20">
          <div className="max-w-4xl w-full bg-ambre-50 border border-ambre-200 rounded-2xl p-5 flex items-center gap-3">
            <AlertCircle size={18} className="text-ambre-600 shrink-0" />
            <span className="text-sm text-ambre-700 font-medium">{searchError}</span>
          </div>
        </div>
      )}

      {searchResult && (
        <section className="bg-white py-28 flex flex-col items-center justify-center px-6">
          <div className="max-w-4xl w-full">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-taupe-900">Score de bien-être</h2>
              <button 
                onClick={() => setSearchResult(null)}
                className="text-taupe-300 hover:text-taupe-600 transition-colors text-3xl font-light cursor-pointer"
              >
                ✕
              </button>
            </div>
            <MapView territoire={searchResult} />
          </div>
        </section>
      )}

      <section className="py-44 bg-beige-50 flex flex-col items-center justify-center px-6 pb-32">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-28">
              <h2 className="text-4xl font-extrabold text-taupe-900 mb-4">Pourquoi RescuePaw ?</h2>
              <p className="text-lg text-taupe-600">Une plateforme pensée pour vous et les animaux</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-canard-100 hover:bg-canard-200 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                    <Icon size={32} className="text-canard-600" />
                  </div>
                  <h3 className="font-bold text-taupe-900 mb-3 text-lg">{title}</h3>
                  <p className="text-taupe-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
      </section>

      <section className="py-48 bg-beige-50 flex flex-col items-center justify-center px-6">
        <div className="max-w-4xl w-full">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-6 flex-1">
              <div className="w-14 h-14 bg-canard-100 rounded-xl flex items-center justify-center shrink-0">
                <PawPrint size={28} className="text-canard-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-taupe-900">Prêt à changer une vie ?</h3>
                <p className="text-sm text-taupe-600 mt-1">Trouvez votre compagnon idéal en 2 minutes</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate("quiz")} 
              className="shrink-0 bg-ambre-400 hover:bg-ambre-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
            >
              Lancer <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-48 bg-beige-50 flex flex-col items-center justify-center px-6">
        <div className="max-w-4xl w-full">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-6 flex-1">
              <div className="w-14 h-14 bg-ambre-100 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle size={24} className="text-ambre-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-taupe-900">Vous avez trouvé un animal ?</h3>
                <p className="text-sm text-taupe-600 mt-1">Signalez-le anonymement et aidez-le rapidement</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate("signalement")} 
              className="shrink-0 bg-ambre-400 hover:bg-ambre-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
            >
              Signaler <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
