import Login from "../components/Login";
import Regsiter from "../components/Regsiter";
import { useState } from "react";

const Signup = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">

        {login ? <Login /> : <Regsiter />}

        <button
          onClick={() => setLogin(!login)}
          className="mt-6 w-full border border-gray-300 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          {login ? "Don't have an account?" : "Already have an account?"}
        </button>
      </div>
    </div>
  );
};
export default Signup;
