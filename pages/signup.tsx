// pages/signup.tsx
"use client";

export default function SignupPage() {
  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Signup</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        This is a placeholder for the signup form. Backend integration will come later.
      </p>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </form>
    </main>
  );
}
