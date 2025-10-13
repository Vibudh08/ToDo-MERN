import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const handleClick = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log(email, password);
  };
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">LogIn</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-start text-gray-700 mb-1">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-start text-gray-700 mb-1">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {errors.general && (
          <p className="text-red-500 text-sm">{errors.general}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 font-semibold text-white p-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleClick}
        >
          LogIn
        </button>
      </form>
    </>
  );
};
export default Login;
