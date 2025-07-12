// Imports des dépendances React
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

// Imports des actions Redux pour la gestion de l'authentification
import { signInFailure, signInStart, signInSuccess } from '../../redux/userSlice';

// Import de l'URL de base de l'API
import { apiURL } from '../../lib/apiURL';

// Import du système de notifications toast
import { Toaster, toast } from 'sonner';

/**
 * Composant SignInPage - Page de connexion utilisateur
 * Gère l'authentification avec Redux et redirige selon le rôle utilisateur
 */
export const SignInPage = () => {
 
  // État local pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // État local pour stocker les messages d'erreur
  const [error, setError] = useState('');

  // Hook Redux pour dispatcher les actions
  const dispatch = useDispatch();
  
  // Hook React Router pour la navigation programmatique
  const navigate = useNavigate();

  /**
   * Gère les changements dans les champs du formulaire
   * @param {Event} e - L'événement de changement du champ
   */
  const handleChange = (e) => {
    setFormData({
      ...formData, // Garde les autres champs inchangés
      [e.target.name]: e.target.value, // Met à jour le champ modifié
    });
  };

  /**
   * Gère la soumission du formulaire de connexion
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      // Dispatche l'action de début de connexion (loading state)
      dispatch(signInStart())
      
      // Envoi de la requête de connexion à l'API
      const response = await fetch(`${apiURL}/api/auth/connexion`, {
        method: 'POST',
        credentials: 'include', // Include les cookies pour l'authentification
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Conversion des données en JSON
      });

      // Vérification si la réponse est positive
      if (response.ok) {
        // Récupération des données utilisateur
        const data = await response.json();

        // Dispatche l'action de succès avec les données utilisateur
        dispatch(signInSuccess(data));
        
        // Affiche une notification de succès
        toast.success('Connexion reussie');

        // Redirection après 2 secondes selon le rôle utilisateur
        setTimeout(() => {
          if(data.user.role === "client") {
            navigate('/client'); // Redirection vers l'espace client
          } else if(data.user.role === "driver") {
            navigate('/driver'); // Redirection vers l'espace conducteur
          } else {
            navigate('/'); // Redirection vers l'accueil par défaut
          }
        }, 2000);
        
      } else {
        // Gestion des erreurs de réponse HTTP
        const errorData = await response.json();
        
        // Affiche une notification d'erreur
        toast.error(errorData.message);
        
        // Met à jour l'état d'erreur local
        setError(errorData.message);
        
        // Dispatche l'action d'échec de connexion
        dispatch(signInFailure(error))
      }
    } catch (error) {
      // Gestion des erreurs de réseau ou autres erreurs
      setError(error.message);
      toast.error("Une erreur est survenue: " + error.message);
    }
  };

  return (
    <div>
      {/* Composant pour afficher les notifications toast */}
      <Toaster />
      
      {/* Titre de la page */}
      <h1>Page de connexion</h1>
      
      {/* Formulaire de connexion */}
      <form onSubmit={handleSubmit}>
        {/* Champ email */}
        <input 
          className="p-2 border border-gray-300" 
          onChange={handleChange} 
          name="email" 
          type="email" 
          placeholder="Email" 
        />
        <br />
        <br />
        
        {/* Champ mot de passe */}
        <input 
          className="p-2 border border-gray-300" 
          onChange={handleChange} 
          name="password" 
          type="password" 
          placeholder="Mot de passe" 
        />
        <br />
        <br />
        
        {/* Bouton de soumission */}
        <button 
          className="p-2 bg-gray-800 cursor-pointer text-white" 
          type="submit"
        >
          Se connecter
        </button>
        <br />
        <br />
        
        {/* Lien vers la page d'inscription */}
        <Link to="/inscription">
          Vous n'avez pas de compte ? <span>Créez-en un</span>
        </Link>
        <br />
        
        {/* Lien de retour à l'accueil */}
        <Link to="/">Retour à l'accueil</Link>
      </form>
    </div>
  )
}