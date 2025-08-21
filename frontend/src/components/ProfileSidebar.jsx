"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getEducationShortForm } from '@/lib/educationLevels';

export default function ProfileSidebar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Listen for custom event to open sidebar
  useEffect(() => {
    const handleOpenSidebar = () => setIsOpen(true);
    window.addEventListener('openProfileSidebar', handleOpenSidebar);
    
    return () => {
      window.removeEventListener('openProfileSidebar', handleOpenSidebar);
    };
  }, []);

  if (!user) return null;

  const tabs = [
    { id: 'profile', icon: '👤' },
    { id: 'settings', icon: '⚙️' }
  ];

  return (
    <>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Profile</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* User Avatar & Info */}
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
              {user.firstName.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-bold mb-2">{user.firstName} {user.lastName}</h3>
            <p className="text-emerald-100 text-sm">{user.email}</p>
            
            {/* Planetarian Badge */}
            {user.earthCharterSigned && (
              <div className="mt-3 inline-block bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                🌍 Planetarian
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">👤</span>
                  Personal Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">First Name:</span>
                    <span className="font-medium text-gray-900 capitalize">{user.firstName.toLowerCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Name:</span>
                    <span className="font-medium text-gray-900 capitalize">{user.lastName.toLowerCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Education:</span>
                    <span className="font-medium text-gray-900">{getEducationShortForm(user.educationLevel)}</span>
                  </div>
                  {user.generationalIdentity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Generation:</span>
                      <span className="font-medium text-blue-600">{user.generationalIdentity}</span>
                    </div>
                  )}
                </div>
              </div>



              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">🌍</span>
                  Gaia Status
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Earth Charter:</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                      user.earthCharterSigned 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {user.earthCharterSigned ? 'Planetarian' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

                     {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">⚙️</span>
                  Account Settings
                </h4>
                <div className="space-y-3">
                  <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-colors duration-200">
                    Edit Profile
                  </button>
                  <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-colors duration-200">
                    Change Password
                  </button>
                  <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-colors duration-200">
                    Privacy Settings
                  </button>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                  <span className="mr-2">⚠️</span>
                  Danger Zone
                </h4>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={logout}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
