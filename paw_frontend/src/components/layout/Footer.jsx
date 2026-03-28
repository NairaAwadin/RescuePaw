import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-beige-200/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="RescuePaw" className="h-12 w-auto" />
          </div>
          <p className="text-xs text-taupe-400 flex items-center gap-1">
            Projet PFE — Fait avec <Heart size={12} strokeWidth={2} className="text-ambre-400" /> pour le bien-être animal
          </p>
        </div>
      </div>
    </footer>
  );
}
