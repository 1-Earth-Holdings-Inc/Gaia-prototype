"use client";
import CustomDropdown from '@/shared/components/ui/CustomDropdown';
import StepIndicator from './StepIndicator';

export default function BirthDateStep({ form, updateForm, handleBirthYearChange }) {
  const monthOptions = [
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
  ];

  const yearOptions = Array.from({ length: 100 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });

  const dayOptions = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    return { value: day.toString(), label: day.toString() };
  });

  return (
    <div className="space-y-6">
      <StepIndicator 
        message="Year of birth is mandatory. This helps us calculate your generational identity."
        type="info"
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Birth Year <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          <CustomDropdown
            options={yearOptions}
            value={form.birthYear} 
            onChange={handleBirthYearChange}
            placeholder="YEAR"
            required
          />
          <CustomDropdown
            options={monthOptions}
            value={form.birthMonth}
            onChange={(value) => updateForm({ birthMonth: value })}
            placeholder="MONTH"
          />
          <CustomDropdown
            options={dayOptions}
            value={form.birthDay}
            onChange={(value) => updateForm({ birthDay: value })}
            placeholder="DAY"
          />
        </div>
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
  );
}
