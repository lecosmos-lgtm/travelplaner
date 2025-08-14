import React, { useState } from 'react'

const RegionSelector = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const popularRegions = [
    { name: 'Paris & Surroundings', country: 'France' },
    { name: 'Rome & Central Italy', country: 'Italy' },
    { name: 'London & Southeast England', country: 'UK' },
  ]
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Select Your Travel Region</h2>
          <button onClick={onClose} className="text-sm px-3 py-1 rounded hover:bg-gray-100">
            Close
          </button>
        </div>
        <input
          type="text"
          placeholder="Search cities, countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <div className="space-y-2">
          {popularRegions.map((region, index) => (
            <button
              key={index}
              onClick={() => { onSelect(region); onClose(); }}
              className="w-full text-left p-3 hover:bg-gray-100 rounded-lg"
            >
              <div className="font-semibold">{region.name}</div>
              <div className="text-gray-600">{region.country}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RegionSelector