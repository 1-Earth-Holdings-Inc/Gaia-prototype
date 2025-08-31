"use client";
import StepIndicator from './StepIndicator';
import PasswordRequirements from './PasswordRequirements';

export default function AccountSetupStep({ 
  form, 
  updateForm, 
  errors, 
  passwordRequirements, 
  validatePassword,
  isValidEmail 
}) {
  return (
    <div className="space-y-6">
      <StepIndicator 
        message="Email and password are mandatory. Password must meet security requirements."
        type="info"
      />
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input 
          id="email"
          type="email" 
          value={form.email} 
          onChange={(e) => updateForm({ email: e.target.value })} 
          className={`w-full rounded-xl ring-1 px-4 py-4 focus:ring-2 focus:border-transparent transition-all ${
            form.email 
              ? isValidEmail(form.email) 
                ? 'ring-emerald-300 focus:ring-emerald-500' 
                : 'ring-red-300 focus:ring-red-500'
              : 'ring-gray-300 focus:ring-emerald-500'
          }`}
          placeholder="Enter your email address"
          required
        />
        {form.email && !isValidEmail(form.email) && (
          <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input 
            id="password"
            type="password" 
            value={form.password} 
            onChange={(e) => {
              updateForm({ password: e.target.value });
              validatePassword(e.target.value);
            }} 
            className="w-full rounded-xl ring-1 ring-gray-300 px-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            placeholder="Create a password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => updateForm({ confirmPassword: e.target.value })}
            className={`w-full rounded-xl ring-1 px-4 py-4 focus:ring-2 focus:border-transparent transition-all ${
              form.confirmPassword 
                ? form.password === form.confirmPassword 
                  ? 'ring-emerald-300 focus:ring-emerald-500' 
                  : 'ring-red-300 focus:ring-red-500'
                : 'ring-gray-300 focus:ring-emerald-500'
            }`}
            placeholder="Confirm your password"
            required
          />
          {form.confirmPassword && form.password !== form.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
          )}
        </div>
      </div>

      {/* Password Requirements */}
      {form.password && (
        <PasswordRequirements requirements={passwordRequirements} />
      )}
    </div>
  );
}
