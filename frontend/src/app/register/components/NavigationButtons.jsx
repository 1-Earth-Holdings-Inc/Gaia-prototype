"use client";

export default function NavigationButtons({ 
  step, 
  isSubmitting, 
  onBack, 
  onSubmit 
}) {
  return (
    <div className="flex justify-between pt-6">
      {step > 1 && (
        <button 
          type="button" 
          onClick={onBack}
          className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Back
        </button>
      )}
      
      <button 
        type="submit"
        disabled={isSubmitting}
        className="ml-auto bg-emerald-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onSubmit}
      >
        {isSubmitting ? 'Processing...' : step === 4 ? 'Complete Registration' : 'Next'}
      </button>
    </div>
  );
}
