import Head from 'next/head'
import { useState } from 'react'

export default function DriversManagement() {
  const [search, setSearch] = useState('')
  const [verificationFilter, setVerificationFilter] = useState('all')

  const drivers = [
    { id: 'DRV001', name: 'Michael Driver', email: 'michael@example.com', phone: '+2348012345678', rating: 4.8, trips: 124, status: 'Verified', vehicle: 'Toyota Camry - ABC123XY', joinDate: '2023-06-15' },
    { id: 'DRV002', name: 'David Chauffeur', email: 'david@example.com', phone: '+2348023456789', rating: 4.9, trips: 89, status: 'Verified', vehicle: 'Honda Accord - DEF456ZW', joinDate: '2023-07-20' },
    { id: 'DRV003', name: 'James Rider', email: 'james@example.com', phone: '+2348034567890', rating: 4.5, trips: 67, status: 'Pending', vehicle: 'Nissan Altima - GHI789AB', joinDate: '2023-09-10' },
    { id: 'DRV004', name: 'Robert Driver', email: 'robert@example.com', phone: '+2348045678901', rating: 4.7, trips: 102, status: 'Verified', vehicle: 'Ford Fusion - JKL012CD', joinDate: '2023-08-05' },
    { id: 'DRV005', name: 'Thomas Chauffeur', email: 'thomas@example.com', phone: '+2348056789012', rating: 4.3, trips: 45, status: 'Suspended', vehicle: 'Hyundai Elantra - MNO345EF', joinDate: '2023-10-15' },
  ]

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(search.toLowerCase()) ||
                         driver.email.toLowerCase().includes(search.toLowerCase()) ||
                         driver.phone.includes(search)
    const matchesVerification = verificationFilter === 'all' || driver.status === verificationFilter
    return matchesSearch && matchesVerification
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <Head>
        <title>Drivers Management - Ride9ja Admin</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">👨‍✈️ Drivers Management</h1>
                <p className="text-gray-600 mt-2">Manage driver profiles and verification</p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-blue-700">
                + Add New Driver
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">👨‍✈️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Drivers</p>
                  <p className="text-2xl font-bold text-blue-600">89</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-green-600">72</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">⏳</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">⛔</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Suspended</p>
                  <p className="text-2xl font-bold text-red-600">5</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Drivers</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, or phone..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Verification Status</label>
                <select
                  value={verificationFilter}
                  onChange={(e) => setVerificationFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Rating (High to Low)</option>
                  <option>Trips (High to Low)</option>
                  <option>Join Date (Newest)</option>
                  <option>Join Date (Oldest)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drivers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrivers.map((driver) => (
              <div key={driver.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  {/* Driver Header */}
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl text-white">👨‍✈️</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900">{driver.name}</h3>
                      <p className="text-gray-600">ID: {driver.id}</p>
                    </div>
                  </div>

                  {/* Driver Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3">📧</span>
                      <span className="text-gray-700">{driver.email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3">📱</span>
                      <span className="text-gray-700">{driver.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3">🚗</span>
                      <span className="text-gray-700">{driver.vehicle}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3">📅</span>
                      <span className="text-gray-700">Joined: {driver.joinDate}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{driver.rating}</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{driver.trips}</div>
                      <div className="text-sm text-gray-600">Trips</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">₦{(driver.trips * 2500).toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Earned</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                      {driver.status}
                    </span>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200">
                        View
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
                        Edit
                      </button>
                      {driver.status === 'Pending' && (
                        <button className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200">
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredDrivers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No drivers found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
