import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/context/AuthContext';
import { calculateGenerationalIdentity } from '@/shared/lib/generationalIdentity';
import { validateRegistrationForm } from '../utils/registrationValidation';
import { requestGeolocation } from '../utils/geolocation';

/**
 * Custom hook for registration form logic
 */
export const useRegistration = () => {
  const router = useRouter();
  const { register } = useAuth();
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

  const handleLocationAllow = async () => {
    setShowLocationModal(false);
    const location = await requestGeolocation();
    await submitRegistration(location);
  };

  const handleLocationSkip = () => {
    setShowLocationModal(false);
    submitRegistration(null);
  };

  const submitRegistration = async (locationData) => {
    try {
      const registrationData = {
        ...form,
        location: locationData
      };
      
      await register(registrationData);
      sessionStorage.setItem('newUser', 'true');
      router.push('/');
    } catch (error) {
      setErrors({ message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    // Final step validation
    const newErrors = validateRegistrationForm(form, step);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setShowLocationModal(true);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateForm = (updates) => {
    setForm(prev => ({ ...prev, ...updates }));
    // Clear any existing errors for updated fields
    const clearedErrors = { ...errors };
    Object.keys(updates).forEach(key => {
      delete clearedErrors[key];
    });
    setErrors(clearedErrors);
  };

  const progressWidth = (step / 4) * 100;

  return {
    // State
    step,
    form,
    errors,
    isSubmitting,
    showLocationModal,
    passwordRequirements,
    
    // Actions
    setStep,
    setShowLocationModal,
    setErrors,
    updateForm,
    handleBirthYearChange,
    handleLocationAllow,
    handleLocationSkip,
    handleSubmit,
    goBack,
    
    // Computed values
    progressWidth,
    
    // Utilities
    isValidEmail,
    validatePassword
  };
};
