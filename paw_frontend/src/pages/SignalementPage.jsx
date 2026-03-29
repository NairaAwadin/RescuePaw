import React from "react";
import SignalementForm from "../components/signalement/SignalementForm";

export default function SignalementPage({ onExit }) {
  return (
    <div className="min-h-screen bg-beige-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SignalementForm onSuccess={onExit} />
      </div>
    </div>
  );
}
