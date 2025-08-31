/**
 * Validation utilities for login form
 */

export const validateLoginForm = (form) => {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!form.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

export const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim().toLowerCase());
};
