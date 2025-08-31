"use client";

export default function ProgressBar({ step, progressWidth }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Step {step} of 4</span>
        <span>{Math.round(progressWidth)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-sky-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
    </div>
  );
}
