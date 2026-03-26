import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskInput = () => {
  const { addTask } = useTaskContext();
  const [text, setText] = useState("");

  function handleText(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }
  function handleSubmit() {
    if (text.trim() !== "") {
      addTask(text);
      setText("");
    }
  }

  return (
    <div className="text-center flex flex-col">
      <label htmlFor="task" className="text-2xl font-bold bg-amber-300 p-5">
        Add Task
      </label>
      <div className="container mt-5 ">
        <input
          placeholder="go to the gym..."
          name="task"
          type="text"
          className="border-b border-b-[#eee] rounded px-4 py-2 my-3 mx-2 placeholder:text-gray-200 placeholder:text-[14px]  text-[18px] text-white focus:outline-0"
          value={text}
          onChange={handleText}
        />
        <button
          onClick={handleSubmit}
          className="rounded bg-[#eee] px-4  cursor-pointer text-xl h-10 "
        >
          add task!
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
