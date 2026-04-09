import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import clsx from "clsx";
import { useThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {
  createCategory,
  deleteCategory,
  getAdminCategories,
  type AdminCategory,
} from "../../services/api/admin";

const AdminCategories = () => {
  const { theme } = useThemeContext();
  const { token } = useAuth();

  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadCategories = async () => {
    if (!token) return;

    setIsLoading(true);
    setError("");

    try {
      const data = await getAdminCategories(token);
      setCategories(data);
    } catch {
      setError("Could not load categories.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [token]);

  const onAddCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token || !name.trim()) return;

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const created = await createCategory(token, name.trim());

      if (created) {
        setCategories((prev) => [created, ...prev]);
      } else {
        await loadCategories();
      }

      setName("");
      setSuccess("Category added successfully.");
    } catch {
      setError("Failed to add category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDeleteCategory = async (category: AdminCategory) => {
    if (!token) return;

    const confirmed = window.confirm(
      `Delete the category \"${category.name}\"?`,
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await deleteCategory(token, category.id);
      setCategories((prev) => prev.filter((item) => item.id !== category.id));
      setSuccess("Category deleted successfully.");
    } catch {
      setError("Failed to delete category.");
    }
  };

  return (
    <section className="space-y-6">
      <header>
        <h2
          className={clsx("text-3xl font-extrabold", {
            "text-[#2c2014]": theme === "light",
            "text-[#f7e4c6]": theme === "dark",
          })}
        >
          Category Management
        </h2>
        <p
          className={clsx("mt-1", {
            "text-[#6d5b49]": theme === "light",
            "text-[#c9b396]": theme === "dark",
          })}
        >
          Add and remove blog categories used by authors.
        </p>
      </header>

      <form
        onSubmit={onAddCategory}
        className={clsx(
          "rounded-2xl p-4 border flex flex-col md:flex-row gap-3",
          {
            "bg-white border-[#ead8bf]": theme === "light",
            "bg-[#222] border-[#363636]": theme === "dark",
          },
        )}
      >
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="New category name"
          className={clsx("flex-1 rounded-xl px-4 py-2 outline-none border", {
            "bg-white border-[#d8c4a8] text-[#2c2014]": theme === "light",
            "bg-[#2a2a2a] border-[#454545] text-[#f7e4c6]": theme === "dark",
          })}
        />
        <button
          type="submit"
          disabled={isSubmitting || !name.trim()}
          className={clsx("px-4 py-2 rounded-xl font-bold", {
            "bg-[#2c2014] text-white hover:bg-[#1f170f]": theme === "light",
            "bg-[#f7e4c6] text-[#2d2216] hover:bg-[#edd5af]": theme === "dark",
            "opacity-60 cursor-not-allowed": isSubmitting || !name.trim(),
          })}
        >
          {isSubmitting ? "Adding..." : "Add Category"}
        </button>
      </form>

      {error && (
        <p className="rounded-xl bg-red-100 text-red-700 px-4 py-2 text-sm">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-xl bg-green-100 text-green-700 px-4 py-2 text-sm">
          {success}
        </p>
      )}

      <div
        className={clsx("rounded-2xl border overflow-hidden", {
          "border-[#ead8bf] bg-white": theme === "light",
          "border-[#363636] bg-[#222]": theme === "dark",
        })}
      >
        <div
          className={clsx("px-4 py-3 border-b font-semibold", {
            "border-[#ead8bf] text-[#2c2014]": theme === "light",
            "border-[#363636] text-[#f7e4c6]": theme === "dark",
          })}
        >
          Existing Categories
        </div>

        {isLoading ? (
          <p className="px-4 py-4 text-sm">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="px-4 py-4 text-sm">No categories found.</p>
        ) : (
          <ul className="divide-y divide-[#e9dcc8] dark:divide-[#353535]">
            {categories.map((category) => (
              <li
                key={category.id}
                className="px-4 py-3 flex items-center justify-between gap-3"
              >
                <span
                  className={clsx("font-medium", {
                    "text-[#2c2014]": theme === "light",
                    "text-[#f7e4c6]": theme === "dark",
                  })}
                >
                  {category.name}
                </span>
                <button
                  onClick={() => onDeleteCategory(category)}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default AdminCategories;
