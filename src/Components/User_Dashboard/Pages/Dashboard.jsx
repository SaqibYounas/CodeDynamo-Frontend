import React from 'react';

const UserDashboard = () => {
  return (
    <div className="ml-64 min-h-screen bg-gray-100 p-6">
      {/* Welcome Section */}
      <h2 className="mb-2 text-2xl font-bold text-gray-800">Welcome, Saqib!</h2>
      <p className="mb-6 text-gray-600">
        Glad to see you again on{' '}
        <span className="font-semibold text-blue-600">CodeDynamo</span>.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Services */}
        <div className="rounded-xl bg-white p-5 shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            My Services
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-gray-700">
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
        <div className="rounded-xl bg-white p-5 shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Recent Support
          </h3>
          <p className="mb-1 text-gray-700">“When will my website go live?”</p>
          <p className="text-sm text-green-600">
            Reply: It will be deployed by Monday!
          </p>
        </div>

        {/* Download */}
        <div className="rounded-xl bg-white p-5 shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Downloads
          </h3>
          <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Download Invoice
          </button>
        </div>

        {/* Logout */}
        <div className="rounded-xl bg-white p-5 shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">Account</h3>
          <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
