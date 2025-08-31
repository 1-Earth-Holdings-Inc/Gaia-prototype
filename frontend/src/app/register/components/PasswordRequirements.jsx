"use client";

export default function PasswordRequirements({ requirements }) {
  const requirementItems = [
    { key: 'length', label: 'At least 8 characters' },
    { key: 'uppercase', label: 'One uppercase letter (A-Z)' },
    { key: 'lowercase', label: 'One lowercase letter (a-z)' },
    { key: 'number', label: 'One number (0-9)' },
    { key: 'special', label: 'One special character (!@#$%^&*)' }
  ];

  return (
    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
      <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {requirementItems.map(({ key, label }) => (
          <div 
            key={key}
            className={`flex items-center text-xs ${requirements[key] ? 'text-green-600' : 'text-gray-500'}`}
          >
            <span 
              className={`w-2 h-2 rounded-full mr-2 ${requirements[key] ? 'bg-green-500' : 'bg-gray-300'}`}
            ></span>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
