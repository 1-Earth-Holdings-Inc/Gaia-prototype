"use client";
import { formatSignatureDate } from '../utils/charterUtils';

export default function SignatureConfirmation({ user }) {
  return (
    <div className="mt-12 pt-8 border-t-2 border-amber-700 bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-lg border-2 border-emerald-300 text-center">
      <h3 className="text-lg font-bold text-emerald-800 mb-2">Charter Signed</h3>
      <p className="text-emerald-700 text-sm mb-2">
        Signed by <span className="font-bold">{user.firstName} {user.lastName}</span>
      </p>
      <p className="text-emerald-600 text-xs mb-2">
        {formatSignatureDate()}
      </p>
      <div className="inline-block px-3 py-1 bg-emerald-600 text-white rounded text-sm font-medium">
        Planetarian Status Confirmed
      </div>
    </div>
  );
}
