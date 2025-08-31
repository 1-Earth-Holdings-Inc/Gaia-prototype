"use client";
import { useLogin } from '../hooks/useLogin';
import { 
  FormHeader,
  EmailField,
  PasswordField,
  SubmitButton,
  ForgotPasswordLink,
  SignUpLink
} from './index';
import { ErrorAlert } from '@/shared/components/ui/Alert';

export default function LoginForm() {
  const { form, errors, isSubmitting, handleSubmit, handleChange } = useLogin();

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
      <FormHeader />

      {errors.general && (
        <div className="mb-6">
          <ErrorAlert message={errors.general} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <EmailField
          email={form.email}
          error={errors.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <PasswordField
          password={form.password}
          error={errors.password}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <SubmitButton isSubmitting={isSubmitting} />
      </form>

      <ForgotPasswordLink />
      <SignUpLink />
    </div>
  );
}
