import { Container } from "@mantine/core";
import { Footer } from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { useAuth } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import { useEffect, useState } from "react";
import userProfile from "../assets/userProfile.png";
import { changePassword, updateUserInfo } from "../services/api/users";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

interface ProfileFormValues {
  fullName: string;
  email: string;
  bio: string;
  currentPassword: string;
  newPassword: string;
  avatar: FileList;
}

const defaultBio =
  "Exploring the intersection of architectural Brutalism and modern digital interfaces. Based in London. Dedicated to finding the quiet moments in a loud digital world.";

const Profile = () => {
  const { user, token, syncUser } = useAuth();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, reset, watch } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: user?.name || "Elena Sterling",
      email: user?.email || "e.sterling@curator.com",
      bio: user?.bio || defaultBio,
      currentPassword: "",
      newPassword: "",
    },
  });

  const watchedFullName = watch("fullName");
  const watchedBio = watch("bio");
  const watchedAvatar = watch("avatar");

  useEffect(() => {
    reset({
      fullName: user?.name || "Elena Sterling",
      email: user?.email || "e.sterling@curator.com",
      bio: user?.bio || defaultBio,
      currentPassword: "",
      newPassword: "",
    });
  }, [user, reset]);

  useEffect(() => {
    const selectedFile = watchedAvatar?.[0];

    if (!selectedFile) {
      setAvatarPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setAvatarPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [watchedAvatar]);

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: ProfileFormValues) => {
      if (!user || !token) {
        throw new Error("You must be logged in to update your profile.");
      }

      const payload = new FormData();
      payload.append("name", formData.fullName.trim());
      payload.append("bio", formData.bio.trim());

      const selectedFile = formData.avatar?.[0];
      if (selectedFile) {
        payload.append("avatar", selectedFile);
      }

      const userResponse = await updateUserInfo(user.id, token, payload);

      if (formData.currentPassword && formData.newPassword) {
        await changePassword(user.id, token, {
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
        });
      }

      return userResponse;
    },
    onSuccess: (userResponse) => {
      syncUser({
        name: userResponse.user.name,
        bio: userResponse.user.bio,
        avatar: userResponse.user.avatar,
        role: userResponse.user.role,
      });

      reset({
        fullName: userResponse.user.name,
        email: user?.email || "",
        bio: userResponse.user.bio || "",
        currentPassword: "",
        newPassword: "",
      });

      setStatusMessage("Profile updated successfully.");
      setErrorMessage("");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string })?.message ||
          "Update failed. Please try again.";
        setErrorMessage(message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Update failed. Please try again.");
      }
      setStatusMessage("");
    },
  });

  const handleCancel = () => {
    reset({
      fullName: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      currentPassword: "",
      newPassword: "",
    });

    setStatusMessage("");
    setErrorMessage("");
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    updateProfileMutation.mutate(data);
  };

  const isSaving = updateProfileMutation.isPending;

  const cardBase = clsx(
    "rounded-2xl border transition-colors duration-200",
    isDark ? "bg-[#1E1E1E] border-[#2D2D2D]" : "bg-[#F8F8F9] border-[#ECECEF]",
  );

  const sectionTitle = clsx(
    "text-[11px] font-extrabold tracking-[0.22em] uppercase mb-5",
    isDark ? "text-[#D1D5DB]" : "text-[#6B7280]",
  );

  const inputClass = clsx(
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all",
    isDark
      ? "bg-[#141414] border-[#323232] text-[#F3F4F6] placeholder:text-[#6B7280] focus:border-[#5866FA]"
      : "bg-[#F3F4F6] border-[#E8EAEF] text-[#222222] placeholder:text-[#9AA0AD] focus:border-[#5866FA]",
  );

  const statValueClass = clsx(
    "text-sm font-bold",
    isDark ? "text-[#8C97FF]" : "text-[#5866FA]",
  );

  const buttonBase =
    "px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer";

  return (
    <div
      className={clsx("min-h-screen transition-colors duration-200", {
        "bg-[#111111]": isDark,
        "bg-[#FBF8F7]": !isDark,
      })}
    >
      <Navbar />
      <Container size={1232} className="py-10 md:py-14 px-4 md:px-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          <aside className="lg:col-span-4 xl:col-span-3 space-y-4">
            <div className={clsx(cardBase, "p-6")}>
              <img
                src={avatarPreview || user?.avatar || userProfile}
                alt={watchedFullName}
                className="w-20 h-20 rounded-xl object-cover mb-5"
              />
              <label
                className={clsx(
                  "text-xs inline-flex mb-4 font-semibold px-3 py-1.5 rounded-lg cursor-pointer",
                  isDark
                    ? "bg-[#2A2A2A] text-[#D1D5DB] hover:bg-[#333333]"
                    : "bg-[#EBEDF2] text-[#4B5563] hover:bg-[#DFE3EB]",
                )}
              >
                Change Avatar
                <input
                  type="file"
                  accept="image/*"
                  {...register("avatar")}
                  className="hidden"
                />
              </label>

              <Link to="/my-posts">
                <button
                  type="button"
                  className={clsx(
                    "text-xs mx-2 rounded-lg px-3 py-0.5 inline-flex font-bold cursor-pointer",
                    isDark
                      ? "border-[#2e3c5b] bg-[#5866FA] text-[#eee]"
                      : "bg-[#EBEDF2] text-[#4B5563] hover:bg-[#DFE3EB]",
                  )}
                >
                  My Posts
                </button>
              </Link>
              <h2
                className={clsx(
                  "text-2xl font-bold leading-tight mb-1",
                  isDark ? "text-[#F3F4F6]" : "text-[#1F2937]",
                )}
              >
                {watchedFullName}
              </h2>
              <p
                className={clsx(
                  "text-xs font-semibold uppercase tracking-[0.08em] mb-4",
                  isDark ? "text-[#A1A1AA]" : "text-[#9AA0AD]",
                )}
              >
                Senior Contributing Editor
              </p>
              <p
                className={clsx(
                  "text-sm leading-6",
                  isDark ? "text-[#A1A1AA]" : "text-[#6B7280]",
                )}
              >
                {watchedBio?.slice(0, 96)}
                {watchedBio && watchedBio.length > 96 ? "..." : ""}
              </p>
            </div>

            <div className={clsx(cardBase, "p-5")}>
              <p className={sectionTitle}>Profile Stats</p>
              <div className="flex justify-between items-center text-sm mb-3">
                <span className={isDark ? "text-[#C4C4C8]" : "text-[#6B7280]"}>
                  Published Essays
                </span>
                <span className={statValueClass}>24</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className={isDark ? "text-[#C4C4C8]" : "text-[#6B7280]"}>
                  Reader Appreciation
                </span>
                <span className={statValueClass}>1.2k</span>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-8 xl:col-span-9 space-y-6">
            <div className={clsx(cardBase, "p-6 md:p-8")}>
              <h3 className={sectionTitle}>Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className={clsx(
                      "block text-xs font-bold uppercase tracking-[0.08em] mb-2",
                      isDark ? "text-[#A1A1AA]" : "text-[#6B7280]",
                    )}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    className={clsx(
                      "block text-xs font-bold uppercase tracking-[0.08em] mb-2",
                      isDark ? "text-[#A1A1AA]" : "text-[#6B7280]",
                    )}
                  >
                    Public Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={inputClass}
                    disabled
                  />
                </div>
              </div>

              <div>
                <label
                  className={clsx(
                    "block text-xs font-bold uppercase tracking-[0.08em] mb-2",
                    isDark ? "text-[#A1A1AA]" : "text-[#6B7280]",
                  )}
                >
                  Editorial Biography
                </label>
                <textarea
                  {...register("bio")}
                  rows={5}
                  className={inputClass}
                />
                <p
                  className={clsx(
                    "mt-2 text-xs",
                    isDark ? "text-[#777A84]" : "text-[#9AA0AD]",
                  )}
                >
                  Visible on your public author page. Max 300 characters.
                </p>
              </div>
            </div>

            <div className={clsx(cardBase, "p-6 md:p-8")}>
              <h3 className={sectionTitle}>Account Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={clsx(
                      "block text-xs font-bold uppercase tracking-[0.08em] mb-2",
                      isDark ? "text-[#A1A1AA]" : "text-[#6B7280]",
                    )}
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    {...register("currentPassword")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    className={clsx(
                      "block text-xs font-bold uppercase tracking-[0.08em] mb-2",
                      isDark ? "text-[#A1A1AA]" : "text-[#6B7280]",
                    )}
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    {...register("newPassword")}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {(statusMessage || errorMessage) && (
              <div
                className={clsx(
                  "rounded-xl border px-4 py-3 text-sm font-medium",
                  statusMessage
                    ? isDark
                      ? "border-[#2E5B3B] bg-[#173121] text-[#9AE6B4]"
                      : "border-[#BEE3C9] bg-[#F0FFF4] text-[#276749]"
                    : isDark
                      ? "border-[#5E2B2B] bg-[#2F1717] text-[#FEB2B2]"
                      : "border-[#FECACA] bg-[#FFF5F5] text-[#C53030]",
                )}
              >
                {statusMessage || errorMessage}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className={clsx(
                  buttonBase,
                  isDark
                    ? "text-[#9AA0AD] hover:text-[#E5E7EB]"
                    : "text-[#5866FA] hover:text-[#3C4AE0]",
                )}
              >
                Cancel Changes
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={clsx(
                  buttonBase,
                  "text-white shadow-lg",
                  isDark
                    ? "bg-[#5866FA] hover:bg-[#6B77FF]"
                    : "bg-[#5866FA] hover:bg-[#3C4AE0]",
                  isSaving && "opacity-60 cursor-not-allowed",
                )}
              >
                {isSaving ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </section>
        </form>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
