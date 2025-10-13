import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
