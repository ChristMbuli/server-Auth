import React from 'react'
import { Link } from 'react-router-dom'

export const NavClient = () => {
  return (
    <div>
        <nav className="flex gap-5 cursor-pointer hover:text-gray-300 mb-10">
            <ul className="flex gap-5">
                <li>
                    <Link to="/client" className="hover:text-gray-300">Mon compte</Link>
                </li>
                <li>
                    <Link to="/client/my-bookings" className="hover:text-gray-300">Mes Réservations</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
