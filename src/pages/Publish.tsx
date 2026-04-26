import { Container } from "@mantine/core";
import { isAxiosError } from "axios";
import {
  IconBold,
  IconCamera,
  IconItalic,
  IconLink,
  IconList,
  IconQuote,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Footer } from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { useAuth } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import { useCategories } from "../hooks/useCategories";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  addCategoryToPost,
  saveDraftPost,
  submitPostReview,
} from "../services/api/posts";

interface PublishFormValues {
  title: string;
  content: string;
  image: FileList;
}

const Publish = () => {
  const { token } = useAuth();
  const { theme } = useThemeContext();
  const { categories } = useCategories();

  const { register, getValues, watch } = useForm<PublishFormValues>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const watchedTitle = watch("title") || "";
  const watchedContent = watch("content") || "";
  const watchedImage = watch("image");

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [postId, setPostId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const file = watchedImage?.[0];

    if (!file) {
      setCoverPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setCoverPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [watchedImage]);

  const normalizedCategories = useMemo(() => {
    const fromApi = categories.map((item) => item.name).filter(Boolean);
    if (fromApi.length > 0) return fromApi;
    return ["Editorial", "Design", "Technology"];
  }, [categories]);

  const selectedCategoryIds = useMemo(() => {
    return categories
      .filter(
        (item) =>
          selectedCategory.includes(item.name) && typeof item.id === "number",
      )
      .map((item) => item.id as number);
  }, [categories, selectedCategory]);

  const toggleCategory = (categoryName: string) => {
    setSelectedCategory((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    );
  };

  const isValidForSave =
    watchedTitle.trim().length > 0 && watchedContent.trim().length > 0;

  const extractError = (err: unknown, fallback: string) => {
    if (isAxiosError(err)) {
      const payload = err.response?.data as { message?: string } | undefined;
      if (payload?.message) return payload.message;
    }

    if (err instanceof Error) return err.message;

    return fallback;
  };

  const createDraft = async (formValues: PublishFormValues) => {
    if (!token) throw new Error("You must be logged in.");

    const selectedImage = formValues.image?.[0] ?? null;

    const createdId = await saveDraftPost(token, {
      title: formValues.title.trim(),
      content: formValues.content.trim(),
      image: selectedImage,
      status: "draft",
    });

    return createdId;
  };

  const saveDraftMutation = useMutation({
    mutationFn: (formValues: PublishFormValues) => createDraft(formValues),
    onSuccess: (createdId) => {
      setPostId(createdId);
      setErrorMessage("");
      setSuccessMessage("Draft saved successfully.");
    },
    onError: (err) => {
      setSuccessMessage("");
      setErrorMessage(extractError(err, "Could not save draft."));
    },
  });

  const submitPostMutation = useMutation({
    mutationFn: async (formValues: PublishFormValues) => {
      if (!token) throw new Error("You must be logged in.");

      if (selectedCategoryIds.length === 0) {
        throw new Error("Please select at least one category before submitting.");
      }

      const currentPostId = postId ?? (await createDraft(formValues));

      await Promise.all(
        selectedCategoryIds.map((categoryId) =>
          addCategoryToPost(token, currentPostId, categoryId),
        ),
      );

      const message = await submitPostReview(token, currentPostId);
      return { message, currentPostId };
    },
    onSuccess: ({ message, currentPostId }) => {
      setPostId(currentPostId);
      setErrorMessage("");
      setSuccessMessage(message);
    },
    onError: (err) => {
      setSuccessMessage("");
      setErrorMessage(extractError(err, "Could not submit post for review."));
    },
  });

  const isSavingDraft = saveDraftMutation.isPending;
  const isSubmitting = submitPostMutation.isPending;

  const handleSaveDraft = async () => {
    if (!isValidForSave) {
      setErrorMessage("Please add title and content first.");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    saveDraftMutation.mutate(getValues());
  };

  const handleSubmitPost = async () => {
    if (!isValidForSave) {
      setErrorMessage("Please add title and content first.");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    submitPostMutation.mutate(getValues());
  };

  return (
    <>
      <div
        className={clsx({
          "bg-[#242424]": theme === "dark",
          "bg-[#FBF8F7]": theme === "light",
        })}
      >
        <Navbar />
        <Container size={980} className="py-10 px-4 md:px-6">
          <section
            className={clsx("rounded-3xl border p-5 md:p-8", {
              "bg-white border-[#ece8e2]": theme === "light",
              "bg-[#171717] border-[#303030]": theme === "dark",
            })}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8c8c8c]">
                  Drafting Workspace
                </span>
                <h1
                  className={clsx("text-4xl md:text-5xl font-black mt-2", {
                    "text-[#191919]": theme === "light",
                    "text-[#f3f3f3]": theme === "dark",
                  })}
                >
                  New Entry
                </h1>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveDraft}
                  disabled={isSavingDraft || isSubmitting}
                  className={clsx(
                    "px-4 py-2 rounded-lg border font-semibold text-sm transition",
                    {
                      "border-[#1C2AC8] text-[#1C2AC8] hover:bg-[#eef0ff]":
                        theme === "light",
                      "border-[#8ea2ff] text-[#8ea2ff] hover:bg-[#20253f]":
                        theme === "dark",
                      "opacity-55 cursor-not-allowed":
                        isSavingDraft || isSubmitting,
                    },
                  )}
                >
                  {isSavingDraft ? "Saving..." : "Save Draft"}
                </button>
                <button
                  onClick={handleSubmitPost}
                  disabled={isSavingDraft || isSubmitting}
                  className="px-4 py-2 rounded-lg font-semibold text-sm bg-[#1C2AC8] text-white hover:bg-[#1521a3] transition disabled:opacity-55 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Post"}
                </button>
              </div>
            </div>

            <label
              htmlFor="cover-upload"
              className={clsx(
                "mt-8 block w-full rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden",
                {
                  "border-[#dbd9d4] bg-[#f8f7f5]": theme === "light",
                  "border-[#3a3a3a] bg-[#1f1f1f]": theme === "dark",
                },
              )}
            >
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full h-56 md:h-72 object-cover"
                />
              ) : (
                <div className="h-56 md:h-72 flex flex-col items-center justify-center gap-3 text-[#9e9e9e]">
                  <IconCamera size={28} />
                  <p className="font-semibold">Click to add cover image</p>
                  <p className="text-xs tracking-wide uppercase">
                    High resolution recommended
                  </p>
                </div>
              )}
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                {...register("image")}
                className="hidden"
              />
            </label>

            <input
              {...register("title")}
              placeholder="Title your story..."
              className={clsx(
                "mt-8 w-full text-4xl md:text-6xl font-extrabold bg-transparent outline-none",
                {
                  "text-[#191919] placeholder:text-[#d4d4d4]":
                    theme === "light",
                  "text-[#f5f5f5] placeholder:text-[#5e5e5e]": theme === "dark",
                },
              )}
            />

            <div
              className={clsx("mt-5 flex items-center gap-2", {
                "text-[#4d4d4d]": theme === "light",
                "text-[#b9b9b9]": theme === "dark",
              })}
            >
              {[IconBold, IconItalic, IconQuote, IconLink, IconList].map(
                (EditorIcon, index) => (
                  <button
                    key={index}
                    type="button"
                    className={clsx("p-2 rounded-md transition", {
                      "hover:bg-[#efefef]": theme === "light",
                      "hover:bg-[#2a2a2a]": theme === "dark",
                    })}
                  >
                    <EditorIcon size={16} />
                  </button>
                ),
              )}
            </div>

            <textarea
              {...register("content")}
              placeholder="Begin your narrative..."
              rows={12}
              className={clsx(
                "mt-4 w-full bg-transparent outline-none resize-none leading-8 text-lg",
                {
                  "text-[#2f2f2f] placeholder:text-[#d1d1d1]":
                    theme === "light",
                  "text-[#e3e3e3] placeholder:text-[#5f5f5f]": theme === "dark",
                },
              )}
            />

            <div
              className={clsx("mt-10 pt-6 border-t grid gap-6 md:grid-cols-2", {
                "border-[#ece8e2]": theme === "light",
                "border-[#303030]": theme === "dark",
              })}
            >
              <div>
                <p className="text-xs tracking-[0.15em] text-[#9b9b9b] uppercase mb-3">
                  Category
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {normalizedCategories.map((categoryName) => {
                    const isActive = selectedCategory.includes(categoryName);

                    return (
                      <button
                        key={categoryName}
                        type="button"
                        onClick={() => toggleCategory(categoryName)}
                        className={clsx(
                          "px-3 py-1.5 rounded-full text-sm border transition",
                          {
                            "bg-[#e9ebff] text-[#1C2AC8] border-[#cfd4ff]":
                              isActive && theme === "light",
                            "bg-[#27306d] text-[#dee2ff] border-[#3f4b9a]":
                              isActive && theme === "dark",
                            "bg-transparent text-[#595959] border-[#d8d8d8]":
                              !isActive && theme === "light",
                            "bg-transparent text-[#c0c0c0] border-[#4a4a4a]":
                              !isActive && theme === "dark",
                          },
                        )}
                      >
                        {categoryName}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {selectedCategory.length} selected
                </p>
              </div>
            </div>

            {postId && (
              <p className="mt-5 text-sm text-[#8f8f8f]">Draft id: {postId}</p>
            )}

            {errorMessage && (
              <p className="mt-3 rounded-lg bg-red-100 text-red-700 px-3 py-2 text-sm">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="mt-3 rounded-lg bg-green-100 text-green-700 px-3 py-2 text-sm">
                {successMessage}
              </p>
            )}
          </section>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Publish;
