import { createContext, useContext, useReducer, type ReactNode } from "react";
import { nanoid } from "nanoid";

interface Task {
  isCompleted: boolean;
  id: string;
  title: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearAll: () => void;
}

type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "CLEAR_TASKS" };

export function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD_TASK": {
      return [
        ...state,
        { id: nanoid(), title: action.payload, isCompleted: false },
      ];
    }
    case "DELETE_TASK": {
      return state.filter((task) => task.id !== action.payload);
    }
    case "TOGGLE_TASK": {
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, isCompleted: !task.isCompleted }
          : task,
      );
    }
    case "CLEAR_TASKS": {
      return [];
    }
    default:
      return state;
  }
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const addTask = (title: string) =>
    dispatch({ type: "ADD_TASK", payload: title });
  const deleteTask = (id: string) =>
    dispatch({ type: "DELETE_TASK", payload: id });
  const toggleTask = (id: string) =>
    dispatch({ type: "TOGGLE_TASK", payload: id });
  const clearAll = () => dispatch({ type: "CLEAR_TASKS" });

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, toggleTask, clearAll }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
}
