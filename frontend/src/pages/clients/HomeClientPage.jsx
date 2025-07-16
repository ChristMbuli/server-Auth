import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { NavClient } from './composants/NavClient'

export const HomeClientPage = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div>
        <h1>Page d'accueil client</h1>
        <p>Vous etes connecté en tant que client</p>
        <hr />
        <NavClient />
        <hr />
        <p>Vos informations</p>
        <p>{currentUser.username}</p>
        <p>{currentUser.email}</p>
        <p>{currentUser.role}</p>
        <hr />
        <button className="hover:text-gray-300 cursor-pointer bg-gray-800 p-2 rounded text-white"> 
          <Link to="/client/do-booking" className="hover:text-gray-300 cursor-pointer">Reserver une voiture</Link>
        </button>
        <br /> <br />
        <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}
