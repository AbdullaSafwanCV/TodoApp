import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const TodoDetail = () => {
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

  const deleteTask = () => {
    fetch(`https://todolist-backend-w1jq.onrender.com/api/todos/${task.id}/`, {
      method: "DELETE",
    }).then(() => router.push("/index"));
  };

  const editTask = () => {
    router.push(`/index/edit/${task.id}`);
  };

  if (!task) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-black-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-red-700 rounded-xl shadow-lg p-8 relative">
      <Link
        className="absolute top-4 right-4 px-3 py-1 rounded bg-red-700 text-white font-medium hover:bg-red-400"
        href={`/index/`}
      >
        X
      </Link>
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
      <p className="mb-4 text-grey">{task.content}</p>
      <div className="mb-2 text-sm text-black-500">
        Created:{" "}
        {new Date(task.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </div>
      <div className="mb-6 text-sm text-black-500">
        Due:{" "}
        {new Date(task.duedate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </div>
      <div className="flex gap-4">
        <button
          id="buttonDelete"
          onClick={deleteTask}
          className="flex-1 px-3 py-1 rounded bg-red-400 text-white font-medium hover:bg-red-500"
        >
          Delete
        </button>
        <button
          id="buttonEdit"
          onClick={editTask}
          className="flex-1 px-3 py-1 rounded bg-blue-400 text-white font-medium hover:bg-red-500"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TodoDetail;
