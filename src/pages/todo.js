import React, { useEffect, useState } from "react";
import Link from "next/link";
import TaskForm from "../components/taskForm";
const Todo = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("https://todolist-backend-w1jq.onrender.com/api/todos/") // Adjust URL
      .then((res) => res.json())
      .then((data) => {
        const active = data.results.filter((task) => !task.completed);
        const completed = data.results.filter((task) => task.completed);
        setUpcomingTasks(active);
        setCompletedTasks(completed);
      });
  }, []);
  const toggleCompletion = (task) => {
    fetch(`https://todolist-backend-w1jq.onrender.com/api/todos/${task.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !task.completed }),
    }).then(() => window.location.reload());
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 ml-78">Upcoming Task&apos;s</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded bg-green-500 text-white font-medium hover:bg-green-600"
        >
          {showForm ? "Cancel" : "Add Task"}
        </button>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {showForm && <TaskForm setShowForm={setShowForm} />}
        {upcomingTasks.map((task) => (
          <div
            key={task.id}
            className="bg-red-700 shadow-lg rounded-xl p-6 w-72 min-h-64 flex flex-col justify-between transition-transform hover:scale-105"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white-700">
                {task.title}
              </h3>
              <ul className="mb-4">
                <li className="text-white-700 mb-2">{task.content}</li>
                <p className="text-xs text-white-500">
                  Created:{" "}
                  {new Date(task.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-white-500">
                  Due:{" "}
                  {new Date(task.duedate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </ul>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                id="buttonCompleted"
                onClick={() => toggleCompletion(task)}
                className={`flex-1 px-3 py-1 rounded font-medium ${
                  task.isCompleted
                    ? "bg-green-400 text-white hover:bg-green-500"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
              >
                {task.isCompleted ? "Not Completed" : "Completed"}
              </button>

              <Link
                className="flex-1 px-3 py-1 rounded bg-blue-400 text-white font-medium hover:bg-blue-500"
                href={`/todo/${task.id}`}
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-6 ml-78">Completed Tasks</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {completedTasks.map((task) => (
          <div
            key={task.id}
            className="bg-red-700 shadow-lg rounded-xl p-6 w-72 min-h-64 flex flex-col justify-between transition-transform hover:scale-105"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white-700">
                {task.title}
              </h3>
              <ul className="mb-4">
                <li className="text-white-700 mb-2">{task.content}</li>
                <p className="text-xs text-white-500">
                  Created:{" "}
                  {new Date(task.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-white-500">
                  Due:{" "}
                  {new Date(task.duedate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </ul>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                id="buttonCompleted"
                onClick={() => toggleCompletion(task)}
                className={`flex-1 px-3 py-1 rounded font-medium ${
                  task.isCompleted
                    ? "bg-green-400 text-white hover:bg-green-500"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
              >
                {task.isCompleted ? "Not Completed" : "Completed"}
              </button>
              <Link
                className="text-center flex-1 px-3 py-1 rounded bg-blue-400 text-white font-medium hover:bg-blue-500"
                href={`/todo/${task.id}`}
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
