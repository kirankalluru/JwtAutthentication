import React, { useEffect, useState } from "react";

export default function Protected({ token, onLogout }) {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const res = await fetch("https://jwt-autthentication.vercel.app/api/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Access denied");
        setMessage(data.message);
      } catch (err) {
        setMessage(err.message);
      }
    };
    fetchProtected();
  }, [token]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">
        Protected Page
      </h2>
      <p className="text-gray-600 text-center">{message}</p>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
