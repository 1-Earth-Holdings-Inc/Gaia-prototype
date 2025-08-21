export default function ForgotPage() {
  return (
    <div className="min-h-screen grid place-items-center p-6 bg-gradient-to-b from-white to-rose-50">
      <div className="w-full max-w-md rounded-3xl bg-white ring-1 ring-black/5 shadow p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">Password Recovery</h1>
        <p className="text-sm text-gray-600">Enter your registered email and we will send you reset instructions (placeholder UI).</p>
        <form className="space-y-3">
          <input className="w-full rounded-xl ring-1 ring-black/10 px-3 py-2" placeholder="Email" />
          <button className="w-full rounded-xl bg-rose-600 text-white py-2 font-medium hover:bg-rose-700">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}


