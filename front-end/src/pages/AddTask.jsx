import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../components/axiosInstance.jsx";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [done, setDone] = useState();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const data = useParams();
  const id = data.id;
  // console.log(id);

  if (id) {
    const getSingleData = async () => {
      const result = await api.get(`http://localhost:3400/get-one/${id}`, {
        withCredentials: "include",
      });
      setTitle(result.data.title);
      setDesc(result.data.desc);
    };

    useEffect(() => {
      getSingleData();
    }, [id]);
  }

  const handleImageChange = (e) => {
    const files = e.target.files[0];
    setImage(files);
    setPreview(URL.createObjectURL(files));
    console.log(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!desc) newErrors.desc = "Description is required";
    if (!image) newErrors.image = "Image is required";
    if (!priority) newErrors.priority = "Priority is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const taskData = { title, desc };

    if (id) {
      const data = await api.put(
        `http://localhost:3400/update-one/${id}`,
        taskData,
        {
          withCredentials: "include",
        }
      );
      if (data) {
        alert("Task Updated");
        console.log(data);
        navigate("/");
      }
    } else {
      const data = await api.post("http://localhost:3400/add-task", taskData, {
        withCredentials: "include",
      });
      if (data) {
        alert("Task Added");
        console.log(data);
        navigate("/");
      }
    }

    setTitle("");
    setDesc("");
  };
  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-50 px-4">
      <div className="max-w-lg w-full p-8 max-md:p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {id ? "Update Task" : "Add New Task"}
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

          <div>
            <div className="flex gap-3 items-center">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Priority:
              </label>
              <select
                name=""
                value={priority}
                id=""
                className="w-fit px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-50 cursor-pointer"
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
            )}
          </div>

          <div className="flex gap-5">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Completed:
            </label>
            <input
              type="checkbox"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
              className="cursor-pointer"
            />
          </div>

          <div>
            <div className="flex gap-3 text-center items-center">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Image:
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-fit px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-50 cursor-pointer"
              />
            </div>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-30 h-30 object-cover rounded-lg shadow-md"
              />
            )}
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
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
            {id ? "Update Task" : "Add New Task"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddTask;
