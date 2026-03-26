import { useTaskContext } from "../context/TaskContext";

const TaskList = () => {
  const { tasks, toggleTask, deleteTask, clearAll } = useTaskContext();

  // 1. تصفية المهام المكتملة فقط
  const completedTasks = tasks.filter((item) => item.isCompleted);
  // 2. تصفية المهام المتبقية (غير المكتملة)
  const activeTasks = tasks.filter((item) => !item.isCompleted);

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4 pb-20">
      {/* القسم الأول: المهام النشطة */}
      <h2 className="text-amber-400 text-sm font-bold mb-4 uppercase tracking-widest">
        Pending Tasks ({activeTasks.length})
      </h2>
      <div className="flex flex-col gap-3 mb-10">
        {activeTasks.map((item) => (
          <TaskItem
            key={item.id}
            item={item}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
        {activeTasks.length === 0 && (
          <p className="text-gray-500 italic text-sm text-center py-4 bg-gray-900/20 rounded-xl">
            No pending tasks. You're all caught up! 🌟
          </p>
        )}
      </div>

      {/* القسم الثاني: المهام المكتملة (الذي طلبته) */}
      {completedTasks.length > 0 && (
        <>
          <h2 className="text-green-500 text-sm font-bold mb-4 uppercase tracking-widest">
            Completed ({completedTasks.length})
          </h2>
          <div className="flex flex-col gap-3 opacity-70">
            {" "}
            {/* تعتيم بسيط للمكتملة لتركيز الانتباه على النشطة */}
            {completedTasks.map((item) => (
              <TaskItem
                key={item.id}
                item={item}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                clearTasks={clearAll}
                isFinished
              />
            ))}
          </div>
        </>
      )}
      {tasks.length > 0 && (
        <button
          onClick={clearAll}
          className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-700 transition cursor-pointer"
        >
          Clear All Tasks 🗑️
        </button>
      )}
    </div>
  );
};

// مكون فرعي صغير لتجنب تكرار الكود (Sub-component)
const TaskItem = ({
  item,
  toggleTask,
  deleteTask,

  isFinished = false,
}: any) => (
  <div
    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
      isFinished
        ? "bg-gray-900/30 border-gray-800"
        : "bg-gray-800/50 border-gray-700 hover:border-amber-300/50"
    }`}
  >
    <div className="flex items-center gap-4 flex-1">
      <input
        type="checkbox"
        checked={item.isCompleted}
        onChange={() => toggleTask(item.id)}
        className="w-5 h-5 cursor-pointer accent-green-500"
      />
      <span
        className={`text-lg ${isFinished ? "line-through text-gray-500" : "text-gray-100"}`}
      >
        {item.title}
      </span>
    </div>
    <button
      onClick={() => deleteTask(item.id)}
      className="text-gray-500 hover:text-red-500 transition-colors p-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d=" orbit 19l-1-4h-10l-1 4M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
        />
      </svg>
    </button>
  </div>
);

export default TaskList;
