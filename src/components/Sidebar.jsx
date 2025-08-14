import React from 'react'

const Sidebar = ({ parameters, onParameterChange, isCollapsed, onToggle }) => {
  const themes = [
    { id: 'culture', label: '🏛 Culture & History' },
    { id: 'food', label: '🍽 Food & Dining' },
    { id: 'nature', label: '🌲 Nature & Outdoors' },
    { id: 'adventure', label: '🏔 Adventure Sports' },
    { id: 'relaxation', label: '🧘 Relaxation & Spa' },
    { id: 'nightlife', label: '🎭 Nightlife & Entertainment' },
    { id: 'shopping', label: '🛍 Shopping' },
    { id: 'art', label: '🎨 Art & Museums' },
  ]

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'}`}>
      <div className="p-4">
        <button onClick={onToggle} className="mb-4 p-2 bg-blue-600 text-white rounded">
          {isCollapsed ? '→' : '←'}
        </button>
        {!isCollapsed && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                type="range"
                min="1"
                max="30"
                value={parameters.duration}
                onChange={(e) => onParameterChange('duration', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">{parameters.duration} days</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Travel Themes</label>
              <div className="space-y-2">
                {themes.map((theme) => (
                  <label key={theme.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={parameters.themes?.includes(theme.id) || false}
                      onChange={(e) => {
                        const cur = parameters.themes || []
                        const newThemes = e.target.checked ? [...cur, theme.id] : cur.filter((t) => t !== theme.id)
                        onParameterChange('themes', newThemes)
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{theme.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Budget Level</label>
              <input
                type="range"
                min="1"
                max="5"
                value={parameters.budget || 3}
                onChange={(e) => onParameterChange('budget', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>Budget</span><span>Standard</span><span>Luxury</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar