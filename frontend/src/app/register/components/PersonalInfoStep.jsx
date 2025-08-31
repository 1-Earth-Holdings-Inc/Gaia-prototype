"use client";
import CustomDropdown from '@/shared/components/ui/CustomDropdown';
import StepIndicator from './StepIndicator';

export default function PersonalInfoStep({ form, updateForm }) {
  const handleInputChange = (field, value) => {
    updateForm({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <StepIndicator 
        message="First name, last name, and gender are mandatory fields."
        type="info"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input 
            className="w-full rounded-xl ring-1 ring-gray-300 px-3 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 uppercase" 
            placeholder="FIRST NAME" 
            value={form.firstName} 
            onChange={(e) => handleInputChange('firstName', e.target.value.toUpperCase())} 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Middle Name
          </label>
          <input 
            className="w-full rounded-xl ring-1 ring-gray-300 px-3 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 uppercase" 
            placeholder="MIDDLE NAME" 
            value={form.middleInitial} 
            onChange={(e) => handleInputChange('middleInitial', e.target.value.toUpperCase())} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input 
            className="w-full rounded-xl ring-1 ring-gray-300 px-3 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 uppercase" 
            placeholder="LAST NAME" 
            value={form.lastName} 
            onChange={(e) => handleInputChange('lastName', e.target.value.toUpperCase())} 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender <span className="text-red-500">*</span>
        </label>
        <CustomDropdown
          options={[
            { value: 'Male', label: 'MALE' },
            { value: 'Female', label: 'FEMALE' }
          ]}
          value={form.gender} 
          onChange={(value) => handleInputChange('gender', value)}
          placeholder="SELECT GENDER"
          required
        />
      </div>
    </div>
  );
}
