import { useState } from "react";
import axios from "axios";
const AddTask = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!desc) newErrors.desc = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const taskData = { title, desc };

    const data = await axios.post("http://localhost:3400/add-task", taskData);
    if (data) {
      alert("Task Added");
      console.log(data);
    }

    setTitle("");
    setDesc("");
  };
  return (
    <div className="max-w-lg mx-auto p-8 max-md:p-6 items-center mt-32 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add New Task
      </h2>
      <form className="space-y-5">
        {/* Task Name */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Title:
          </label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Enter task description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.desc && (
            <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 shadow-md transition-all"
          onClick={handleSubmit}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};
export default AddTask;
