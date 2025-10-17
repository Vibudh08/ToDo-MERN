import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [checkboxTask, setCheckboxTask] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    const result = await axios.get("http://localhost:3400/",{
      withCredentials:'include'
    });
    console.log(result);
    setDetails(result.data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `http://localhost:3400/delete-task/${id}`
    );
    if (result) {
      getData();
    }
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      let items = details.map((items) => items._id);
      setCheckboxTask(items);
    } else {
      setCheckboxTask([]);
    }
  };

  const selectSingleItem = (id) => {
    if (checkboxTask.includes(id)) {
      const items = checkboxTask.filter((item) => item != id);
      setCheckboxTask(items);
    } else {
      setCheckboxTask([id, ...checkboxTask]);
    }
  };

  const handleDeleteButton = async () => {
    const result = await axios.delete(
      "http://localhost:3400/delete-multiple-task/",
      { data: checkboxTask }
    );
    if (result) {
      setCheckboxTask([]);
      getData();
    }
  };

  return (
    <>
      <h1 className="text-3xl max-md:text-2xl font-extrabold text-center text-gray-800 mt-10 mb-8">
        To-Do List
      </h1>

      <div className="flex justify-center flex-col items-center px-4 pb-12">
        {/* Button placed after the first div but above the table */}
        {checkboxTask.length > 0 && (
          <div className="flex justify-start w-full max-w-5xl pb-2">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-700 transition"
              onClick={handleDeleteButton}
            >
              Delete Selected
            </button>
          </div>
        )}

        <div className="w-full max-w-5xl overflow-x-auto rounded-2xl shadow-lg text-center bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm uppercase tracking-wide">
                <th className="p-4 border-b rounded-tl-2xl">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={selectAll}
                    checked={
                      checkboxTask.length === details.length &&
                      details.length > 0
                    }
                  />
                </th>
                <th className="p-4 border-b">S.No.</th>
                <th className="p-4 border-b">Title</th>
                <th className="p-4 border-b">Description</th>
                <th className="p-4 border-b rounded-tr-2xl text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-8 text-gray-500 italic"
                  >
                    Loading...
                  </td>
                </tr>
              ) : details.length > 0 ? (
                details.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="hidden">{item._id}</td>
                    <td className="p-4 border-b text-gray-600">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        onChange={() => selectSingleItem(item._id)}
                        checked={checkboxTask.includes(item._id)}
                      />
                    </td>
                    <td className="p-4 border-b text-gray-600">{index + 1}</td>
                    <td className="p-4 border-b font-medium text-gray-800">
                      {item.title}
                    </td>
                    <td className="p-4 border-b text-gray-600">{item.desc}</td>
                    <td className="p-4 border-b text-center">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition">
                          <Pencil
                            size={18}
                            onClick={() => navigate(`/edit-task/${item._id}`)}
                          />
                        </button>
                        <button className="p-2 rounded-full hover:bg-red-100 text-red-600 transition">
                          <Trash2
                            size={18}
                            onClick={() => handleDelete(item._id)}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-8 text-gray-500 italic"
                  >
                    No tasks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default TaskList;
