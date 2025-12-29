import Head from 'next/head'
import { useState } from 'react'

export default function MapView() {
  const [viewMode, setViewMode] = useState<'drivers' | 'trips'>('drivers')
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null)

  // Mock data
  const activeDrivers = [
    { id: 'DRV001', name: 'Michael Driver', lat: 6.5244, lng: 3.3792, status: 'Available', vehicle: 'Toyota Camry' },
    { id: 'DRV002', name: 'David Chauffeur', lat: 6.5240, lng: 3.3790, status: 'On Trip', vehicle: 'Honda Accord' },
    { id: 'DRV003', name: 'James Rider', lat: 6.5248, lng: 3.3795, status: 'Available', vehicle: 'Nissan Altima' },
    { id: 'DRV004', name: 'Robert Driver', lat: 6.5242, lng: 3.3788, status: 'Available', vehicle: 'Ford Fusion' },
  ]

  const activeTrips = [
    { id: 'TRP001', rider: 'John Doe', driver: 'Michael Driver', pickup: { lat: 6.5244, lng: 3.3792 }, dropoff: { lat: 6.5250, lng: 3.3800 }, status: 'Ongoing' },
    { id: 'TRP002', rider: 'Sarah Smith', driver: 'David Chauffeur', pickup: { lat: 6.5240, lng: 3.3790 }, dropoff: { lat: 6.5235, lng: 3.3785 }, status: 'Requested' },
    { id: 'TRP003', rider: 'Alex Johnson', driver: 'James Rider', pickup: { lat: 6.5248, lng: 3.3795 }, dropoff: { lat: 6.5255, lng: 3.3805 }, status: 'Ongoing' },
  ]

  return (
    <>
      <Head>
        <title>Real-time Map - Ride9ja Admin</title>
      </Head>
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">🗺️ Real-time Map View</h1>
                <p className="text-gray-300">Live tracking of drivers and trips</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('drivers')}
                    className={`px-4 py-2 rounded-md ${viewMode === 'drivers' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
                  >
                    Drivers ({activeDrivers.length})
                  </button>
                  <button
                    onClick={() => setViewMode('trips')}
                    className={`px-4 py-2 rounded-md ${viewMode === 'trips' ? 'bg-purple-600 text-white' : 'text-gray-300'}`}
                  >
                    Trips ({activeTrips.length})
                  </button>
                </div>
                <button className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700">
                  Refresh Map
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden h-[600px] relative">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900">
                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `linear-gradient(#4b5563 1px, transparent 1px),
                                    linear-gradient(90deg, #4b5563 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                  }}></div>
                  
                  {/* Main roads */}
                  <div className="absolute w-full h-2 bg-yellow-500 top-1/4 left-0"></div>
                  <div className="absolute w-2 h-full bg-yellow-500 left-1/3 top-0"></div>
                  <div className="absolute w-2 h-full bg-yellow-500 right-1/3 top-0"></div>
                  
                  {/* Drivers */}
                  {activeDrivers.map((driver, index) => (
                    <div
                      key={driver.id}
                      className={`absolute w-10 h-10 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
                        driver.status === 'On Trip' ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{
                        left: `${20 + index * 20}%`,
                        top: `${30 + index * 15}%`
                      }}
                    >
                      <span className="text-white">🚗</span>
                    </div>
                  ))}
                  
                  {/* Trip Routes */}
                  {activeTrips.map((trip, index) => (
                    <div key={trip.id}>
                      {/* Route line */}
                      <div className="absolute h-1 bg-white opacity-50 transform -translate-y-1/2"
                        style={{
                          left: `${30 + index * 15}%`,
                          top: `${40 + index * 10}%`,
                          width: '100px',
                          transform: 'rotate(45deg)'
                        }}
                      ></div>
                      {/* Pickup */}
                      <div className="absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${30 + index * 15}%`,
                          top: `${40 + index * 10}%`
                        }}
                      >
                        <span className="text-white">📍</span>
                      </div>
                      {/* Dropoff */}
                      <div className="absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${40 + index * 15}%`,
                          top: `${50 + index * 10}%`
                        }}
                      >
                        <span className="text-white">🏁</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 text-white">
                  <h3 className="font-bold mb-2">Legend</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      <span>Available Driver</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                      <span>Driver on Trip</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                      <span>Pickup Location</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Dropoff Location</span>
                    </div>
                  </div>
                </div>
                
                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button className="w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white flex items-center justify-center hover:bg-gray-800">
                    +
                  </button>
                  <button className="w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white flex items-center justify-center hover:bg-gray-800">
                    -
                  </button>
                  <button className="w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white flex items-center justify-center hover:bg-gray-800">
                    ↻
                  </button>
                </div>
              </div>
              
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-800 rounded-xl p-4 text-white">
                  <div className="text-2xl font-bold text-green-400">{activeDrivers.filter(d => d.status === 'Available').length}</div>
                  <div className="text-gray-300">Available Drivers</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-white">
                  <div className="text-2xl font-bold text-blue-400">{activeTrips.length}</div>
                  <div className="text-gray-300">Active Trips</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-white">
                  <div className="text-2xl font-bold text-yellow-400">3.2min</div>
                  <div className="text-gray-300">Avg. Wait Time</div>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-xl shadow-2xl p-6 text-white h-full">
                <h2 className="text-xl font-bold mb-6">
                  {viewMode === 'drivers' ? 'Active Drivers' : 'Active Trips'}
                </h2>
                
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {viewMode === 'drivers' ? (
                    // Drivers List
                    activeDrivers.map((driver) => (
                      <div
                        key={driver.id}
                        className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 cursor-pointer border-l-4 border-green-500"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                              <span>👨‍✈️</span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{driver.name}</h3>
                              <p className="text-sm text-gray-300">{driver.vehicle}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            driver.status === 'Available' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                          }`}>
                            {driver.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400 mt-2">
                          📍 Lat: {driver.lat.toFixed(4)}, Lng: {driver.lng.toFixed(4)}
                        </div>
                        <button className="w-full mt-3 px-3 py-2 bg-gray-600 rounded-lg text-sm hover:bg-gray-500">
                          View Details
                        </button>
                      </div>
                    ))
                  ) : (
                    // Trips List
                    activeTrips.map((trip) => (
                      <div
                        key={trip.id}
                        onClick={() => setSelectedTrip(trip.id)}
                        className={`bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 cursor-pointer border-l-4 ${
                          selectedTrip === trip.id ? 'border-purple-500' : 'border-blue-500'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">Trip {trip.id}</h3>
                          <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs">
                            {trip.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <span className="text-gray-400 mr-2">👤</span>
                            <span className="text-gray-300">Rider: {trip.rider}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-400 mr-2">👨‍✈️</span>
                            <span className="text-gray-300">Driver: {trip.driver}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-400 mr-2">📍</span>
                            <span className="text-gray-300">Pickup: {trip.pickup.lat.toFixed(4)}, {trip.pickup.lng.toFixed(4)}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-400 mr-2">🏁</span>
                            <span className="text-gray-300">Dropoff: {trip.dropoff.lat.toFixed(4)}, {trip.dropoff.lng.toFixed(4)}</span>
                          </div>
                        </div>
                        <button className="w-full mt-3 px-3 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-500">
                          Track Live
                        </button>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Live Updates */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h3 className="font-bold mb-3">🔄 Live Updates</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-green-400">
                      <span className="mr-2">●</span>
                      <span>Driver DRV001 just went online</span>
                    </div>
                    <div className="flex items-center text-blue-400">
                      <span className="mr-2">●</span>
                      <span>Trip TRP002 accepted by David Chauffeur</span>
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <span className="mr-2">●</span>
                      <span>New ride request in Victoria Island</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
