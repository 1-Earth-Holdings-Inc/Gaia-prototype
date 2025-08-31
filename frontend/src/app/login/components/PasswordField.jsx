"use client";

export default function PasswordField({ 
  password, 
  error, 
  onChange, 
  disabled 
}) {
  return (
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={onChange}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="Enter your password"
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
