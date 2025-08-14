import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import MapView from './components/MapView'

function App() {
  const [currentView, setCurrentView] = useState('landing')
  return (
    <div className="min-h-screen">
      {currentView === 'landing' && (
        <LandingPage onStartPlanning={() => setCurrentView('planning')} />
      )}
      {currentView === 'planning' && (
        <MapView onBack={() => setCurrentView('landing')} />
      )}
    </div>
  )
}

export default App