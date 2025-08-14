import React, { useState } from 'react'
import InteractiveMap from './InteractiveMap'
import Sidebar from './Sidebar'
import TripTimeline from './TripTimeline'
import RegionSelector from './RegionSelector'
import ChatDialog from './ChatDialog'
import openaiService from '../services/openaiService'

const defaultParams = {
  duration: 7,
  themes: ['culture', 'food'],
  budget: 3,
  aiModel: 'gpt-4o',
}

const MapView = ({ onBack }) => {
  const [params, setParams] = useState(defaultParams)
  const [trip, setTrip] = useState(null)
  const [selectorOpen, setSelectorOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleRegionSelect = async (region) => {
    setLoading(true)
    try {
      const metadata = await openaiService.generateTripMetadata(region, params)
      // Mark metadata stops
      if (metadata?.stops) {
        metadata.stops = metadata.stops.map((s, i) => ({
          ...s,
          id: s.id ?? i + 1,
          isMetadataOnly: true,
          isLoading: false,
        }))
      }
      setTrip(metadata)
    } catch (e) {
      console.error(e)
      alert('Failed to generate trip. Check console and API key.')
    } finally {
      setLoading(false)
    }
  }

  const handleParamChange = (k, v) => setParams((p) => ({ ...p, [k]: v }))

  const handleStopClick = async (stop) => {
    if (!trip) return
    const idx = trip.stops.findIndex((s) => s.id === stop.id)
    const updated = { ...trip }
    updated.stops[idx] = { ...updated.stops[idx], isLoading: true }
    setTrip(updated)

    try {
      const detailed = await openaiService.generateStopDetails(
        { duration: trip.duration, themes: params.themes, budget: params.budget },
        stop
      )
      updated.stops[idx] = { ...detailed, isMetadataOnly: false, isLoading: false }
      setTrip({ ...updated })
    } catch (e) {
      console.error(e)
      updated.stops[idx] = { ...updated.stops[idx], isLoading: false }
      setTrip({ ...updated })
      alert('Failed to load details for this stop.')
    }
  }

  const handleHotelSearch = (stop) => {
    const base = 'https://www.booking.com/searchresults.html'
    const u = new URL(base)
    u.searchParams.set('ss', stop.name)
    u.searchParams.set('group_adults', '2')
    u.searchParams.set('no_rooms', '1')
    window.open(u.toString(), '_blank')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
      <div className="lg:col-span-3">
        <Sidebar
          parameters={params}
          onParameterChange={handleParamChange}
          isCollapsed={false}
          onToggle={() => {}}
        />
        <button onClick={onBack} className="mt-4 text-sm underline">← Back</button>
      </div>

      <div className="lg:col-span-6 space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Map</div>
            <button className="text-sm px-2 py-1 rounded bg-blue-600 text-white" onClick={() => setSelectorOpen(true)}>
              Select Region
            </button>
          </div>
          <InteractiveMap
            onRegionSelect={handleRegionSelect}
            tripData={trip}
            onMarkerClick={handleStopClick}
          />
          {loading && (
            <div className="mt-2 flex items-center text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Generating preview...
            </div>
          )}
        </div>
        <TripTimeline tripData={trip} onStopClick={handleStopClick} onHotelSearch={handleHotelSearch} />
      </div>

      <div className="lg:col-span-3">
        <ChatDialog />
      </div>

      <RegionSelector isOpen={selectorOpen} onClose={() => setSelectorOpen(false)} onSelect={handleRegionSelect} />
    </div>
  )
}

export default MapView