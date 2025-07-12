import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { apiURL } from '../lib/apiURL'
import { Toaster, toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/userSlice';

export const NavBar = () => {
  // Récupération de l'utilisateur connecté
  const { currentUser } = useSelector((state) => state.user)

  const dispatch = useDispatch();

  //Fonction pour la déconnexion
  const handleSignOut = async () => {
    try {
      await fetch(`${apiURL}/api/auth/deconnexion`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(signOut());
      navigate("/");
      toast.success("Vous êtes déconnecté avec succès !");
    } catch (error) {
      toast.error(
        error.message || "Une erreur est survenue. Veuillez réessayer."
      );
    }
  };



  return (
    <div className="flex justify-between nav bg-gray-800 text-white text-lg">
      <span>Verha</span>
     <div className="flex gap-5">
        <Link to="/" className="hover:text-gray-300">Accueil</Link>
        <Link to="/client" className="hover:text-gray-300">Client</Link>
        <Link to="/driver" className="hover:text-gray-300">Chauffeur</Link>
        <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        {currentUser ? (
          <button onClick={handleSignOut} className="hover:text-gray-300 text-white rounded p-2 cursor-pointer bg-red-500">Deconnexion</button>
        ) : (
          <>
            <Link to="/connexion" className="hover:text-gray-300">Connexion</Link>
            <Link to="/inscription" className="hover:text-gray-300">Inscription</Link>
          </>
        )}
     </div>
    </div>
  )
}
