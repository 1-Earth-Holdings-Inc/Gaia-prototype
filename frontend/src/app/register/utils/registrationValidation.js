import { isValidEmail, validatePassword } from './validations';

/**
 * Validation utilities for registration form
 */

export const validateRegistrationForm = (form, step) => {
  const errors = {};

  // Step 1: Personal Information
  if (step >= 1) {
    if (!form.firstName.trim()) errors.firstName = 'First name is required';
    if (!form.lastName.trim()) errors.lastName = 'Last name is required';
    if (!form.gender) errors.gender = 'Gender is required';
  }

  // Step 2: Date of Birth
  if (step >= 2) {
    if (!form.birthYear) errors.birthYear = 'Birth year is required';
  }

  // Step 4: Account Setup
  if (step >= 4) {
    if (!form.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!form.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(form.password)) {
      errors.password = 'Password does not meet requirements';
    }
    
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  return errors;
};


