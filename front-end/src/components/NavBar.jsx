import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Delete cookie by setting expiry to past date
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("login");
    navigate("/");
  };

  const data = localStorage.getItem("login");
  return (
    <header className="bg-black shadow-md p-2">
      <div className=" mx-auto px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src="/todo_logo.png" className="w-16" alt="" />
        </Link>

        {/* Navigation */}
        {data && (
          <nav className="space-x-6">
            <Link
              to="/task-list"
              className="text-white hover:font-semibold text-xl transition"
            >
              List
            </Link>
            <Link
              to="/add-task"
              className="text-white hover:font-semibold text-xl transition"
            >
              Add Task
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:font-semibold text-xl transition"
            >
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavBar;
