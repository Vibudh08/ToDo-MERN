import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Regsiter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // validations
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email should be in correct format";
    if (!password) newErrors.password = "Password is required";

    // if errors exist, set and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const data = { name, email, password };

    const result = await axios.post("http://localhost:3400/signup", data);
    if (result) {
      navigate("/task-list");
      const token = result.data.token;
      document.cookie = "token=" + token;
    }
  };
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 ">Signup</h1>
      <form className="space-y-4 ">
        <div>
          <label className="block text-sm font-bold text-start text-gray-700 mb-1">
            Name:
          </label>
          <input
            value={name}
            type="text"
            placeholder="Enter Name"
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-start text-gray-700 mb-1">
            Email:
          </label>
          <input
            value={email}
            type="text"
            placeholder="Enter Email"
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
            value={password}
            type="password"
            placeholder="Enter Password"
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          className="w-full bg-blue-600 font-semibold text-white p-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleClick}
        >
          Signup
        </button>
      </form>
    </>
  );
};
export default Regsiter;
