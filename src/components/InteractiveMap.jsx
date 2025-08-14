import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const InteractiveMap = ({ onRegionSelect, tripData, onMarkerClick }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    mapInstanceRef.current = L.map(mapRef.current).setView([20, 0], 2)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstanceRef.current)

    mapInstanceRef.current.on('click', handleMapClick)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    // Clear previous markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    if (tripData?.stops?.length) {
      tripData.stops.forEach((stop, idx) => {
        const marker = L.marker([stop.lat, stop.lng]).addTo(mapInstanceRef.current)
        marker.bindPopup(`<b>${idx + 1}. ${stop.name}</b>`)
        marker.on('click', () => onMarkerClick?.(stop))
        markersRef.current.push(marker)
      })
      const group = L.featureGroup(markersRef.current)
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.3))
    }
  }, [tripData])

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng
    onRegionSelect?.({
      name: 'Selected Region',
      bounds: { center: { lat, lng } },
    })
  }

  return <div ref={mapRef} className="w-full h-96 rounded-lg overflow-hidden shadow" />
}

export default InteractiveMap