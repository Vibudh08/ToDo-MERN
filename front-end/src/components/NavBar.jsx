import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <header className="bg-black shadow-md p-2">
      <div className=" mx-auto px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src="/todo_logo.png" className="w-16" alt="" />
        </Link>

        {/* Navigation */}
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
        </nav>
      </div>
    </header>
  );
}

export default NavBar