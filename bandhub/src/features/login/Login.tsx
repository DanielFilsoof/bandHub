import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email og adgangskode er påkrævet");
      return;
    }
    // Implement login logic here
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F5DEB3] py-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto mt-16">
        <h1 className="text-3xl font-bold text-[#8B4513] mb-6 text-center">
          Log ind
        </h1>
        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-[#8B4513] font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-[#8B4513] rounded"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-[#8B4513] font-semibold mb-2"
            >
              Adgangskode
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-[#8B4513] rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-[#FFE4B5] rounded-lg px-4 py-2 transition-colors duration-200"
          >
            Log ind
          </button>
        </form>
      </div>
    </div>
  );
}
