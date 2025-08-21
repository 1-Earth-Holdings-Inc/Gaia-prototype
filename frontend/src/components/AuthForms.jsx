"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { countries } from '@/lib/countries';
import { educationLevels } from '@/lib/educationLevels';
import { calculateGenerationalIdentity, getGenerationalDescription } from '@/lib/generationalIdentity';
import CustomDropdown from './ui/CustomDropdown';
import LocationPermissionModal from './LocationPermissionModal';
import { ErrorAlert } from './ui/Alert';

export default function AuthForms({ type = 'login' }) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [step, setStep] = useState(1);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
    gender: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    generationalIdentity: '',
    citizenshipByBirth: '',
    birthplaceProvinceState: '',
    birthplaceCity: '',
    citizenshipByNaturalization: '',
    educationLevel: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim().toLowerCase());
  };

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    setPasswordRequirements(requirements);
    return Object.values(requirements).every(Boolean);
  };

  const handleBirthYearChange = (birthYear) => {
    const generationalIdentity = calculateGenerationalIdentity(birthYear);
    setForm({ ...form, birthYear, generationalIdentity });
  };

  const requestGeolocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date()
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  const handleLocationAllow = async () => {
    setShowLocationModal(false);
    const location = await requestGeolocation();
    if (location) {
      setForm({ ...form, location });
    }
    handleSubmit();
  };

  const handleLocationSkip = () => {
    setShowLocationModal(false);
    handleSubmit();
  };

    const handleSubmit = async () => {
    if (type === 'login') {
      // Login logic here
      setIsSubmitting(true);
      setErrors({});
      
      try {
        await login(form.email, form.password);
        router.push('/');
      } catch (error) {
        setErrors({ message: error.message || 'Login failed' });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Registration logic
    setIsSubmitting(true);
    setErrors({});

    // Validate password before submitting
    if (!validatePassword(form.password)) {
      setErrors({ message: 'Password does not meet security requirements' });
      setIsSubmitting(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors({ message: 'Passwords do not match' });
      setIsSubmitting(false);
      return;
    }

          try {
        await register(form);
        // Set flag for new user to auto-open profile sidebar
        sessionStorage.setItem('newUser', 'true');
        router.push('/');
      } catch (error) {
      setErrors({ message: error.message || 'Registration failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (type === 'register' && step < 4) {
      setStep(step + 1);
    } else if (type === 'register' && step === 4) {
      setShowLocationModal(true);
    } else {
      handleSubmit();
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (type === 'login') {
  return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl ring-1 ring-gray-300 px-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
        </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-xl ring-1 ring-gray-300 px-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center">
              <Link href="/forgot" className="text-emerald-600 hover:text-emerald-700 text-sm">
                Forgot your password?
              </Link>
            </div>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Registration Form
  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress Bar - Outside the container */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <span className="text-sm text-gray-500">Step {step} of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
      </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

      <form onSubmit={onSubmit} className="space-y-6">
            {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800">
                    <span className="font-medium">Required:</span> Please provide your basic information.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input 
                  className="w-full rounded-xl ring-1 ring-gray-300 px-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 uppercase" 
                  placeholder="First Name" 
                  value={form.firstName} 
                  onChange={(e) => setForm({ ...form, firstName: e.target.value.toUpperCase() })} 
                  required
                />
                <span className="pointer-events-none text-red-500 absolute top-2 left-3">*</span>
              </div>
              <div>
                <input 
                  className="w-full rounded-xl ring-1 ring-gray-300 px-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 uppercase" 
                  placeholder="Middle Initial" 
                  value={form.middleInitial} 
                  onChange={(e) => setForm({ ...form, middleInitial: e.target.value.toUpperCase() })} 
                />
              </div>
              <div className="relative">
                <input 
                  className="w-full rounded-xl ring-1 ring-gray-300 px-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 uppercase" 
                  placeholder="Last Name" 
                  value={form.lastName} 
                  onChange={(e) => setForm({ ...form, lastName: e.target.value.toUpperCase() })} 
                  required
                />
                <span className="pointer-events-none text-red-500 absolute top-2 left-3">*</span>
              </div>
            </div>

                <CustomDropdown
                  options={[
                    { value: 'Male', label: 'MALE' },
                    { value: 'Female', label: 'FEMALE' }
                  ]}
                value={form.gender} 
                  onChange={(value) => setForm({ ...form, gender: value })}
                  placeholder="SELECT GENDER"
                required
                />
          </div>
        )}

        {/* Step 2: Date of Birth */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Required:</span> Year of birth is mandatory. This helps us calculate your generational identity.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
                  <CustomDropdown
                    options={Array.from({ length: 100 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return { value: year.toString(), label: year.toString() };
                    })}
                  value={form.birthYear} 
                    onChange={handleBirthYearChange}
                    placeholder="YEAR"
                  required
                  />
                  <CustomDropdown
                    options={[
                    { value: '1', label: 'JANUARY' },
                    { value: '2', label: 'FEBRUARY' },
                    { value: '3', label: 'MARCH' },
                    { value: '4', label: 'APRIL' },
                    { value: '5', label: 'MAY' },
                    { value: '6', label: 'JUNE' },
                    { value: '7', label: 'JULY' },
                    { value: '8', label: 'AUGUST' },
                    { value: '9', label: 'SEPTEMBER' },
                    { value: '10', label: 'OCTOBER' },
                    { value: '11', label: 'NOVEMBER' },
                    { value: '12', label: 'DECEMBER' }
                    ]}
                    value={form.birthMonth}
                    onChange={(value) => setForm({ ...form, birthMonth: value })}
                    placeholder="MONTH"
                  />
                  <CustomDropdown
                    options={Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1;
                      return { value: day.toString(), label: day.toString() };
                    })}
                    value={form.birthDay}
                    onChange={(value) => setForm({ ...form, birthDay: value })}
                    placeholder="DAY"
                  />
                </div>
                
                {/* Generational Identity Display */}
                {form.generationalIdentity && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        Your Generational Identity
                      </h3>
                      <p className="text-2xl font-bold text-blue-700">
                        {form.generationalIdentity}
                      </p>
            </div>
                  </div>
                )}
          </div>
        )}

        {/* Step 3: Citizenship & Education */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Optional:</span> These fields help us understand your background better. You can skip any field.
              </p>
            </div>
            
                <CustomDropdown
                  options={countries.map(country => ({
                    value: country.name,
                    label: country.name.toUpperCase()
                  }))}
                value={form.citizenshipByBirth} 
                  onChange={(value) => setForm({ ...form, citizenshipByBirth: value })}
                  placeholder="SELECT COUNTRY OF BIRTH"
                  searchable
                />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input 
                  className="w-full rounded-xl ring-1 ring-gray-300 px-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 uppercase" 
                  placeholder="Province/State" 
                  value={form.birthplaceProvinceState} 
                  onChange={(e) => setForm({ ...form, birthplaceProvinceState: e.target.value.toUpperCase() })} 
                />
              </div>
              <div>
                <input 
                  className="w-full rounded-xl ring-1 ring-gray-300 px-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 uppercase" 
                  placeholder="City" 
                  value={form.birthplaceCity} 
                  onChange={(e) => setForm({ ...form, birthplaceCity: e.target.value.toUpperCase() })} 
                />
              </div>
            </div>

                <CustomDropdown
                  options={countries.map(country => ({
                    value: country.name,
                    label: country.name.toUpperCase()
                  }))}
                value={form.citizenshipByNaturalization} 
                  onChange={(value) => setForm({ ...form, citizenshipByNaturalization: value })}
                  placeholder="DUAL CITIZENSHIP (OPTIONAL)"
                  searchable
                />

                <CustomDropdown
                  options={educationLevels.map(level => ({
                    value: level.value,
                    label: level.label.toUpperCase()
                  }))}
                  value={form.educationLevel}
                  onChange={(value) => setForm({ ...form, educationLevel: value })}
                  placeholder="SELECT EDUCATION LEVEL"
                  searchable
                />
          </div>
        )}

        {/* Step 4: Account Setup */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Required:</span> Email and password are mandatory. Password must meet security requirements.
              </p>
            </div>
            
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                <input 
                    id="email"
                  type="email" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
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
                    setForm({ ...form, password: e.target.value });
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
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
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
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      <div className={`flex items-center text-xs ${passwordRequirements.length ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${passwordRequirements.length ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        At least 8 characters
                      </div>
                      <div className={`flex items-center text-xs ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${passwordRequirements.uppercase ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        One uppercase letter (A-Z)
                      </div>
                      <div className={`flex items-center text-xs ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${passwordRequirements.lowercase ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        One lowercase letter (a-z)
                      </div>
                      <div className={`flex items-center text-xs ${passwordRequirements.number ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${passwordRequirements.number ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        One number (0-9)
                      </div>
                      <div className={`flex items-center text-xs ${passwordRequirements.special ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${passwordRequirements.special ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        One special character (!@#$%^&*)
                      </div>
                    </div>
                  </div>
                )}
          </div>
        )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {step > 1 && (
            <button 
              type="button" 
                  onClick={goBack}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back
            </button>
              )}
              
            <button 
              type="submit"
                disabled={isSubmitting}
                className="ml-auto bg-emerald-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Processing...' : step === 4 ? 'Complete Registration' : 'Next'}
            </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Sign in
            </Link>
          </div>
        </div>
    </div>

      {/* Location Permission Modal */}
      <LocationPermissionModal
        isOpen={showLocationModal}
        onAllow={handleLocationAllow}
        onSkip={handleLocationSkip}
      />

      {/* Error Alert */}
      {errors.message && (
        <ErrorAlert
          title="Registration Error"
          message={errors.message}
          onDismiss={() => setErrors({})}
        />
      )}
    </>
  );
}


