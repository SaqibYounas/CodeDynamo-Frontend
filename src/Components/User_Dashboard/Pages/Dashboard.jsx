import React from 'react';

const UserDashboard = () => {
  return (
    <div className="ml-64 p-6 min-h-screen bg-gray-100">
      {/* Welcome Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, Saqib!</h2>
      <p className="text-gray-600 mb-6">
        Glad to see you again on{' '}
        <span className="text-blue-600 font-semibold">CodeDynamo</span>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Services */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            My Services
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              🌐 Web Development –{' '}
              <span className="text-yellow-500">In Progress</span>
            </li>
            <li>
              🔍 SEO Optimization –{' '}
              <span className="text-green-600">Completed</span>
            </li>
            <li>
              📱 Mobile App – <span className="text-red-500">Not Started</span>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Recent Support
          </h3>
          <p className="text-gray-700 mb-1">“When will my website go live?”</p>
          <p className="text-sm text-green-600">
            Reply: It will be deployed by Monday!
          </p>
        </div>

        {/* Download */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Downloads
          </h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Download Invoice
          </button>
        </div>

        {/* Logout */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Account</h3>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
