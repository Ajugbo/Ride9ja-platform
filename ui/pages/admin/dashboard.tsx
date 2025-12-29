import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const stats = {
    totalRides: 1247,
    activeDrivers: 89,
    revenue: '₦4.2M',
    newUsers: 312,
  }

  const recentTrips = [
    { id: 'TRP001', rider: 'John Doe', driver: 'Michael Driver', fare: '₦2,500', status: 'Completed', time: '10:30 AM' },
    { id: 'TRP002', rider: 'Sarah Smith', driver: 'David Chauffeur', fare: '₦1,800', status: 'Ongoing', time: '11:15 AM' },
    { id: 'TRP003', rider: 'Alex Johnson', driver: 'James Rider', fare: '₦3,200', status: 'Requested', time: '11:45 AM' },
    { id: 'TRP004', rider: 'Emma Wilson', driver: 'Robert Driver', fare: '₦2,100', status: 'Completed', time: '12:00 PM' },
  ]

  const drivers = [
    { name: 'Michael Driver', rating: 4.8, trips: 124, status: 'Online', vehicle: 'Toyota Camry' },
    { name: 'David Chauffeur', rating: 4.9, trips: 89, status: 'Online', vehicle: 'Honda Accord' },
    { name: 'James Rider', rating: 4.5, trips: 67, status: 'Offline', vehicle: 'Nissan Altima' },
    { name: 'Robert Driver', rating: 4.7, trips: 102, status: 'Online', vehicle: 'Ford Fusion' },
  ]

  return (
    <>
      <Head>
        <title>Dashboard - Ride9ja Admin</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🚗</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Ride9ja Dashboard</h1>
                    <p className="text-sm text-gray-600">Welcome back, Admin!</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Refresh Data
                </button>
                <button 
                  onClick={() => router.push('/admin/login')}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Rides', value: stats.totalRides, color: 'blue', icon: '🚕' },
              { label: 'Active Drivers', value: stats.activeDrivers, color: 'green', icon: '👨‍✈️' },
              { label: 'Revenue', value: stats.revenue, color: 'purple', icon: '💰' },
              { label: 'New Users', value: stats.newUsers, color: 'orange', icon: '👥' },
            ].map((stat, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${stat.color}-500`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`text-3xl bg-${stat.color}-100 p-3 rounded-full`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['overview', 'trips', 'drivers', 'riders', 'payments'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Trips */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Trips</h2>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trip ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rider</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fare</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentTrips.map((trip) => (
                        <tr key={trip.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{trip.id}</td>
                          <td className="px-4 py-3 text-gray-700">{trip.rider}</td>
                          <td className="px-4 py-3 text-gray-700">{trip.driver}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{trip.fare}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              trip.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              trip.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {trip.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Active Drivers */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Active Drivers</h2>
                <div className="space-y-4">
                  {drivers.map((driver, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{driver.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-yellow-500">⭐ {driver.rating}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">{driver.trips} trips</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{driver.vehicle}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        driver.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {driver.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
