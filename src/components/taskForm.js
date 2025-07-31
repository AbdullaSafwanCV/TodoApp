import React, { useState } from "react";

const TaskForm = ({ setShowForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    duedate: "",
    user: 1,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    console.log("Form submitted:", formData);
    e.preventDefault();
    fetch("http://localhost:8000/api/todos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      setShowForm(false);
    //   window.location.reload();
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-red-700 rounded-xl shadow-2xl p-8 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">Add New Note</h2>
          <div>
            <label className="block text-sm font-medium mb-1 text-black" htmlFor="title">
              Title
            </label>
            <input
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black" htmlFor="content">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              name="content"
              id="content"
              rows="4"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black" htmlFor="duedate">
              Due Date
            </label>
            <input
              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              type="date"
              name="duedate"
              id="duedate"
            //   defaultValue={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
          >
            Save Note
          </button>
            <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full py-2 px-4 bg-blue-500 text-black font-semibold rounded hover:bg-blue-600 transition mt-2"
              >
                Cancel
              </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
