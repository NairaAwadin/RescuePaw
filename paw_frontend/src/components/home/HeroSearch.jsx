import React, { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function HeroSearch({ onSearch, onStartQuiz }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <div className="bg-beige-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl px-6 py-24">
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl font-bold text-taupe-900 mb-8 leading-tight">
            Trouver le compagnon idéal
          </h1>
          <p className="text-lg text-taupe-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Découvrez le bien-être animal de votre région et trouvez l'animal qui vous correspond.
          </p>
        </div>
        <div className="space-y-6 max-w-lg mx-auto">
          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={20} strokeWidth={1.5} className="text-ambre-400" />
              </div>
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Code postal ou ville…" 
                className="w-full pl-12 pr-4 py-4 bg-white border border-beige-300 rounded-2xl text-taupe-800 placeholder:text-taupe-400 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-canard-500 focus:border-canard-500 transition-all"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-canard-600 hover:bg-canard-700 text-white px-6 py-2 rounded-xl font-medium text-sm transition-all"
              >
                Rechercher
              </button>
            </div>
          </form>

          {/* CTA Button */}
          <button 
            onClick={onStartQuiz}
            className="w-full bg-canard-600 hover:bg-canard-700 text-white py-4 rounded-2xl font-semibold text-base transition-all"
          >
            Lancer le quiz d'adoption
          </button>
        </div>
      </div>
    </div>
  );
}
