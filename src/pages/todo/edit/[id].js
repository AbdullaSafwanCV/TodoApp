import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditTodo = () => {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://todolist-backend-w1jq.onrender.com/api/todos/${id}/`)
        .then((res) => res.json())
        .then((data) => setTask(data));
    }
  }, [id]);

  // handle form update and submission here

  return (
    <div className="flex items-center justify-center min-h-screen bg-black ">
      <div className="bg-red-700 rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Edit Task</h1>
        {task && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetch(`https://todolist-backend-w1jq.onrender.com/api/todos/${task.id}/`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
              }).then(() => router.push("/index"));
            }}
            className="space-y-4"
          >
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                id="title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="content"
              >
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="content"
                value={task.content}
                onChange={(e) => setTask({ ...task, content: e.target.value })}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="duedate"
              >
                Due Date
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="date"
                id="duedate"
                value={task.duedate}
                onChange={(e) => setTask({ ...task, duedate: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              Update Task
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTodo;
