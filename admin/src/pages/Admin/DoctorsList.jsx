import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">All Doctors</h1>
          <p className="text-gray-600">
            Manage and view all registered doctors in the system
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {doctors.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              {/* Doctor Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Doctor";
                  }}
                />
                {/* Availability Badge */}
                <div className="absolute top-3 right-3">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.available
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4 font-medium">
                  {item.speciality}
                </p>

                {/* Availability Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    Available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {doctors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Doctors Found
            </h3>
            <p className="text-gray-500">
              There are no doctors registered in the system yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
