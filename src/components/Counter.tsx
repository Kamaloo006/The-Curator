import { useReducer } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

const profiles = [1, 2, 3, 4, 5];

interface State {
  count: number;
  error: string | null;
}

interface Action {
  type: "increment" | "decrement" | "reset";
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "increment": {
      const newCount = state.count + 1;
      const hasError = newCount > 5;
      return {
        ...state,
        count: hasError ? state.count : newCount,
        error: hasError ? "Maximum Reached" : null,
      };
    }
    case "decrement": {
      const newCount = state.count - 1;
      const hasError = newCount < 0;
      return {
        ...state,
        count: hasError ? state.count : newCount,
        error: hasError ? "Minimum Reached" : null,
      };
    }
    case "reset":
      return { ...state, count: 0 };
    default:
      return state;
  }
}

const Counter = () => {
  const { theme } = useThemeContext();
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    error: null,
  });

  return (
    <section
      className={`${theme === "light" ? `bg-[#7453c294]` : `bg-[#4009d8]`} p-10 flex items-center justify-center`}
    >
      <Link to="/">Return to home page</Link>
      <div className="container flex items-center  justify-center gap-2 mt-10 bg-blue-300 p-2 w-150 rounded">
        <h1 className="text-xl">
          Count:{" "}
          <span className="text-zinc-600 text-xl bg-white rounded px-6 py-2">
            {state.count}
          </span>
        </h1>
        <div className="text-red-500 ">
          {state.error && <h1>{state.error}</h1>}
        </div>
        <button
          className="bg-amber-300 text-xl mx-3 p-2 h-10 flex justify-center rounded items-center"
          onClick={() => dispatch({ type: "increment" })}
        >
          +
        </button>
        <button
          className="bg-amber-300 text-xl mx-3 p-2 h-10 flex justify-center rounded items-center"
          onClick={() => dispatch({ type: "decrement" })}
        >
          -
        </button>
        <button
          className="bg-amber-300 text-xl mx-3 p-2 h-10 flex justify-center rounded items-center"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {profiles.map((profile) => (
          <NavLink
            className={({ isActive }) => {
              return isActive ? "text-blue-500" : "";
            }}
            key={profile}
            to={`/counter/${profile}`}
          >
            Profile {profile}
          </NavLink>
        ))}
      </div>
      <div className="mx-2">
        <Outlet />
      </div>
    </section>
  );
};

export default Counter;
