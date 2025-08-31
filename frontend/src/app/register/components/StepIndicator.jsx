"use client";

export default function StepIndicator({ step, message, type = 'info' }) {
  const bgColor = type === 'info' ? 'bg-blue-50' : 'bg-green-50';
  const borderColor = type === 'info' ? 'border-blue-200' : 'border-green-200';
  const textColor = type === 'info' ? 'text-blue-800' : 'text-green-800';

  return (
    <div className={`${bgColor} p-4 rounded-xl border ${borderColor}`}>
      <p className={`text-sm ${textColor}`}>
        <span className="font-medium">
          {type === 'info' ? 'Required:' : 'Optional:'}
        </span> {message}
      </p>
    </div>
  );
}
