import React from 'react'

const LandingPage = ({ onStartPlanning }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Select your region. AI plans it.</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose your destination using the smart region selector and let the AI create a personalized itinerary.
          </p>
          <button
            onClick={onStartPlanning}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Start Planning Your Trip ✈
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage