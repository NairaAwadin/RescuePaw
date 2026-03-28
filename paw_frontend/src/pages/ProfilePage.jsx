import React, { useState } from "react";
import { User, Mail, MapPin, Shield, Trash2, ArrowLeft, LogOut } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage({ onNavigate }) {
  const { user, isAdoptant, isObservateur, logout } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    // api.deleteProfil(user.id) — quand backend prêt
    logout();
    onNavigate("home");
  };

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-6 cursor-pointer">
          <ArrowLeft size={18} strokeWidth={1.5} /> Retour
        </button>

        <h1 className="text-2xl font-bold text-anthracite mb-6">Mon profil</h1>

        {/* User info */}
        <Card padding="p-6" className="mb-4">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 bg-forest-50 rounded-2xl flex items-center justify-center">
              <User size={28} strokeWidth={1.5} className="text-forest-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-anthracite">{user?.username || "Utilisateur"}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={isAdoptant ? "bg-terra-100 text-terra-700" : "bg-forest-100 text-forest-700"}>
                  {isAdoptant ? "Adoptant" : "Observateur"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} strokeWidth={1.5} className="text-text-muted" />
              <span className="text-text-secondary">{user?.email || "email@exemple.fr"}</span>
            </div>
          </div>
        </Card>

        {/* Quick actions */}
        {isAdoptant && (
          <Card padding="p-6" className="mb-4">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Actions rapides</h3>
            <div className="space-y-2">
              <Button variant="outline" size="md" className="w-full justify-start" onClick={() => onNavigate("quiz")}>
                Refaire le quiz d'adoption
              </Button>
              <Button variant="outline" size="md" className="w-full justify-start" onClick={() => onNavigate("signalement")}>
                Signaler un animal
              </Button>
            </div>
          </Card>
        )}

        {isObservateur && (
          <Card padding="p-6" className="mb-4">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Accès observatoire</h3>
            <Button variant="primary" size="md" className="w-full" onClick={() => onNavigate("dashboard")}>
              Accéder au dashboard
            </Button>
          </Card>
        )}

        {/* RGPD Section */}
        <Card padding="p-6" className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} strokeWidth={1.5} className="text-forest-600" />
            <h3 className="text-sm font-semibold text-anthracite">Vie privée & RGPD</h3>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            Conformément au RGPD, vous pouvez supprimer votre profil et toutes vos données à tout moment. Cette action est irréversible.
          </p>
          {!showDeleteConfirm ? (
            <Button variant="ghost" size="sm" icon={Trash2} className="text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => setShowDeleteConfirm(true)}>
              Supprimer mon profil
            </Button>
          ) : (
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-red-700 mb-3">Êtes-vous sûr ? Cette action est irréversible.</p>
              <div className="flex gap-2">
                <Button variant="danger" size="sm" onClick={handleDelete}>Oui, supprimer</Button>
                <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(false)}>Annuler</Button>
              </div>
            </div>
          )}
        </Card>

        {/* Logout */}
        <Button variant="ghost" size="md" icon={LogOut} className="w-full text-text-muted" onClick={() => { logout(); onNavigate("home"); }}>
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}
