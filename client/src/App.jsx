import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MessageSender from './Composants/MessageSender'
import Monmenu from './Composants/MonMenu'

import LogoutButton from './Composants/LogOut'
import { useAuth0 } from "@auth0/auth0-react";
import MonAcceuil from './Composants/Acceuil'
import AcceuilVisiteur from './Composants/AcceuilVisiteur'




function App() {
  const [count, setCount] = useState(0)
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>en cours de chargement.</div>;
  }

  return (
    <>
      <div>
      {isAuthenticated ?
          <div>
            <Monmenu /> 
            
          </div>
           :
          <AcceuilVisiteur />
        }
        
        
        
      </div>
    </>
  )
}

export default App
