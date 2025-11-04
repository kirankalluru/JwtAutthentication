import React, { useState } from "react";
import Login from "./Login";
import Protected from "./Protected";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          JWT Authentication
        </h1>
        {!token ? (
          <Login onLogin={setToken} />
        ) : (
          <Protected token={token} onLogout={() => setToken(null)} />
        )}
      </div>
    </div>
  );
}
