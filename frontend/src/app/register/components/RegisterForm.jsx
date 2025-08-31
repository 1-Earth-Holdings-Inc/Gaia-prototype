"use client";
import { useRegistration } from '../hooks/useRegistration';
import { 
  ProgressBar,
  FormHeader,
  PersonalInfoStep,
  BirthDateStep,
  CitizenshipStep,
  AccountSetupStep,
  NavigationButtons,
  FormFooter,
  LocationPermissionModal
} from './index';
import { ErrorAlert } from '@/shared/components/ui/Alert';

export default function RegisterForm() {
  const {
    step,
    form,
    errors,
    isSubmitting,
    showLocationModal,
    passwordRequirements,
    progressWidth,
    setShowLocationModal,
    handleBirthYearChange,
    handleLocationAllow,
    handleLocationSkip,
    handleSubmit,
    goBack,
    updateForm,
    isValidEmail,
    validatePassword
  } = useRegistration();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoStep form={form} updateForm={updateForm} />;
      case 2:
        return <BirthDateStep form={form} updateForm={updateForm} handleBirthYearChange={handleBirthYearChange} />;
      case 3:
        return <CitizenshipStep form={form} updateForm={updateForm} />;
      case 4:
        return (
          <AccountSetupStep
            form={form}
            updateForm={updateForm}
            errors={errors}
            passwordRequirements={passwordRequirements}
            validatePassword={validatePassword}
            isValidEmail={isValidEmail}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl">
        <ProgressBar step={step} progressWidth={progressWidth} />

        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
          <FormHeader />

          <form onSubmit={handleSubmit} className="space-y-4">
            {renderStep()}
            
            <NavigationButtons
              step={step}
              isSubmitting={isSubmitting}
              onBack={goBack}
              onSubmit={handleSubmit}
            />
          </form>

          <FormFooter />
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
          onDismiss={() => updateForm({})}
        />
      )}
    </>
  );
}
