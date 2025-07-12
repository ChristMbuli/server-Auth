import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner';
import { apiURL } from '../../lib/apiURL';

export const SignUpPage = () => {
  // Réinitialisation des champs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
  });
  const [error, setError] = useState('');
const navigate = useNavigate();

  // Gestion des champs de formulaire détecte les changements
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/api/auth/inscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        toast.success('Inscription reussie');
        setTimeout(() => {
          navigate('/connexion');
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
        setError(errorData.message);
      }

      setFormData({
        username: '',
        email: '',
        role: '',
        password: '',
      });
      
    } catch (error) {
      setError(error.message);
      toast.error("Une erreur est survenue: " + error.message);
    }

    
  };

  return (
    <div className="flex flex-col gap-5">
      <Toaster  />
      {error && <p className="text-red-500">{error}</p>}
        <h1>Page d'inscription</h1>
        <form onSubmit={handleSubmit}>
            <input className="p-2 border border-gray-300" onChange={handleChange} name="username" type="text" placeholder="username" />
            <br />
            <br />

            <input className="p-2 border border-gray-300" onChange={handleChange} name="email" type="email" placeholder="Email" />
            <br />
            <br />
           <select name="role" onChange={handleChange} id="">
            <option value="">Selectionner un role</option>
            <option value="client">client</option>
            <option value="driver">chauffeur</option>
           </select>
            <br />
            <br />
          
            <input onChange={handleChange} className="p-2 border border-gray-300" name="password" type="password" placeholder="Mot de passe" />
            <br />
              <br />
            <button className="p-2 bg-gray-800 cursor-pointer text-white" type="submit">S'inscrire</button>
            <br />
            <br />
            <Link to="/connexion">Vous avez déjà un compte ? <span>Connectez-vous</span></Link>
            <br />
            <Link to="/">Retour à l'accueil</Link>
        </form>
    </div>
  )
}
