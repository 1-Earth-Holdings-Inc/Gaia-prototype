import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/context/AuthContext';
import { validateLoginForm } from '../utils/loginValidation';

/**
 * Custom hook for login form logic
 */
export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateLoginForm(form);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await login(form.email, form.password);
      router.push('/');
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return {
    // State
    form,
    errors,
    isSubmitting,
    
    // Actions
    handleSubmit,
    handleChange
  };
};
