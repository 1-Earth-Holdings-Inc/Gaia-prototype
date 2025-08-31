"use client";
import CustomDropdown from '@/shared/components/ui/CustomDropdown';
import StepIndicator from './StepIndicator';
import { countries } from '@/shared/lib/countries';
import { educationLevels } from '@/shared/lib/educationLevels';

export default function CitizenshipStep({ form, updateForm }) {
  const countryOptions = countries.map(country => ({
    value: country.name,
    label: country.name.toUpperCase()
  }));

  const educationOptions = educationLevels.map(level => ({
    value: level.value,
    label: level.label.toUpperCase()
  }));

  return (
    <div className="space-y-6">
      <StepIndicator 
        message="These fields help us understand your background better. You can skip any field."
        type="optional"
      />
      
      <CustomDropdown
        options={countryOptions}
        value={form.citizenshipByBirth} 
        onChange={(value) => updateForm({ citizenshipByBirth: value })}
        placeholder="SELECT COUNTRY OF BIRTH"
        searchable
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input 
            className="w-full rounded-xl ring-1 ring-gray-300 px-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 uppercase" 
            placeholder="Province/State" 
            value={form.birthplaceProvinceState} 
            onChange={(e) => updateForm({ birthplaceProvinceState: e.target.value.toUpperCase() })} 
          />
        </div>
        <div>
          <input 
            className="w-full rounded-xl ring-1 ring-gray-300 px-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 uppercase" 
            placeholder="City" 
            value={form.birthplaceCity} 
            onChange={(e) => updateForm({ birthplaceCity: e.target.value.toUpperCase() })} 
          />
        </div>
      </div>

      <CustomDropdown
        options={countryOptions}
        value={form.citizenshipByNaturalization} 
        onChange={(value) => updateForm({ citizenshipByNaturalization: value })}
        placeholder="DUAL CITIZENSHIP (OPTIONAL)"
        searchable
      />

      <CustomDropdown
        options={educationOptions}
        value={form.educationLevel}
        onChange={(value) => updateForm({ educationLevel: value })}
        placeholder="SELECT EDUCATION LEVEL"
        searchable
      />
    </div>
  );
}
