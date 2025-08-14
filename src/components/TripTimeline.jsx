import React from 'react'

const TripTimeline = ({ tripData, onStopClick, onHotelSearch }) => {
  if (!tripData || !tripData.stops) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Trip Timeline</h2>
        <div className="text-sm text-gray-600">
          {tripData.stops.length} stops • {tripData.duration} days • {tripData.estimated_budget || '—'}
        </div>
      </div>
      <div className="space-y-4">
        {tripData.stops.map((stop, index) => (
          <div
            key={stop.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onStopClick(stop)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{stop.name}</h3>
                    <p className="text-sm text-gray-600">{stop.duration}</p>
                  </div>
                </div>
                {stop.isMetadataOnly ? (
                  <div className="text-blue-600 text-sm">Click for details</div>
                ) : (
                  <div>
                    <p className="text-gray-700 mb-2">{stop.description}</p>
                    {stop.highlights && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {stop.highlights.map((h, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onHotelSearch(stop) }}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Search Hotels
              </button>
            </div>
            {stop.isLoading && (
              <div className="mt-2 flex items-center text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Loading detailed information...
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TripTimeline