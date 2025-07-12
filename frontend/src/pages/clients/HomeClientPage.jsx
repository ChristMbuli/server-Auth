import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const HomeClientPage = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div>
        <h1>Page d'accueil client</h1>
        <p>Vous etes connecté en tant que client</p>
        <hr />
        <p>Vos informations</p>
        <p>{currentUser.username}</p>
        <p>{currentUser.email}</p>
        <p>{currentUser.role}</p>
        <br /> <br />
        <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}
