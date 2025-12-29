import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ride9ja Dashboard</title>
        <meta name="description" content="Admin dashboard for Ride9ja" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">🚗 Ride9ja Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your ride-hailing platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-700">Total Rides</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">1,247</p>
              <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-700">Active Drivers</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">89</p>
              <p className="text-sm text-gray-500 mt-1">Online now: 42</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">₦4.2M</p>
              <p className="text-sm text-gray-500 mt-1">This month</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold text-gray-700">New Users</h3>
              <p className="text-3xl font-bold text-orange-600 mt-2">312</p>
              <p className="text-sm text-gray-500 mt-1">+8% from last week</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎉 Welcome to Ride9ja Admin</h2>
            <p className="text-gray-600 mb-4">
              This is your dashboard to manage drivers, riders, trips, and payments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-700">Next Steps:</h3>
                <ul className="mt-2 text-blue-600 list-disc list-inside">
                  <li>Connect to your API backend</li>
                  <li>Add authentication</li>
                  <li>View trip analytics</li>
                  <li>Manage driver verification</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-700">Quick Links:</h3>
                <ul className="mt-2 text-purple-600 list-disc list-inside">
                  <li>Trips Management</li>
                  <li>Driver Profiles</li>
                  <li>Payment Records</li>
                  <li>System Settings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
