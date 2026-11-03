
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Building2,
  MapPin,
  DollarSign,
  Users,
  Loader2,
  Check,
} from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { CategoryType } from "@/type";

const amenitiesList = [
  "Wi-Fi",
  "Air Conditioning",
  "Parking",
  "Lighting Equipment",
  "Camera Equipment",
  "Soundproofing",
  "Green Screen",
  "Natural Lighting",
  "Restroom",
  "Kitchen",
  "Furniture",
  "Projector",
];

interface AddNewStudioProps {
  studioId?: string;
}

interface StudioFormData {
  title: string;
  category: string;
  hourlyRate: string;
  securityDeposit: string;
  maxCapacity: string;
  location: string;
  image: string;
  amenities: string[];
  overview: string;
}

const initialFormData: StudioFormData = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  image: "",
  amenities: [],
  overview: "",
};

export default function AddNewStudio({ studioId }: AddNewStudioProps) {
  const isEdit = Boolean(studioId)
  const router = useRouter();

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  // States
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<StudioFormData>(initialFormData);
  const [imageError, setImageError] = useState(false);

  const inputClass ="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-white dark:focus:ring-gray-800";
  const labelClass ="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  //Fetch studio
  useEffect(() => {
    if (!studioId || isPending || !session?.user) return;

    const getStudio = async () => {
      try {
        setLoading(true);

        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Authentication failed.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/studios/${studioId}`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch studio.");
        }

        const result = await response.json();

        // Adjust this depending on your API response structure.
        const studio = result.studio || result;

        setFormData({
          title: studio.data.title || "",
          category: studio.data.category || "",
          hourlyRate: String(studio.data.hourlyRate || ""),
          securityDeposit: String(studio.data.securityDeposit || ""),
          maxCapacity: String(studio.data.maxCapacity || ""),
          location: studio.data.location || "",
          image: studio.data.image || "",
          amenities: studio.data.amenities || [],
          overview: studio.data.overview || "",
        });

      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    getStudio();
  }, [studioId, isPending, session?.user]);

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/category`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("Category fetching error:", error);
        toast.error("Unable to load categories.");
      } finally {
        setCategoriesLoading(false);
      }
    };

    getCategories();
  }, []);

  // Handle input changes
  const handleChange = (
    field: keyof StudioFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Toggle amenities
  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Submit studio
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please sign in first.");
      router.push("/sign-in");
      return;
    }

    if (formData.amenities.length === 0) {
      toast.error("Please select at least one amenity.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Unable to generate authentication token.");
      }

      const studioData = {
        ...formData,
        ...(!isEdit && {
          owner: {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
          },
        }),
      };

      const response = await fetch(
        isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/studios/${studioId}`
          : `${process.env.NEXT_PUBLIC_API_URL}/add-studio`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify(studioData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Operation failed.");
      }

      toast.success(
        isEdit
          ? "Studio updated successfully!"
          : "Studio created successfully!"
      );

      router.push("/dashboard/my-listings");
      router.refresh();

    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // Session loading
  if (isPending) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <Loader2 className="animate-spin" size={28} />
      </div>
    );
  }

  // Authentication check
  if (!session?.user) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Sign in required
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please sign in to list your creative workspace.
        </p>

        <button
          onClick={() => router.push("/sign-in")}
          className="mt-5 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">

      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-white dark:bg-white dark:text-black">
            <Building2 size={21} />
          </div>

          <h1 className="text-2xl font-bold">
            {isEdit ? "Update Your Studio" : "List Your Creative Workspace"}
          </h1>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Share your creative space with the StudioSpace community.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="space-y-7 p-5 sm:p-8">

          {/* Owner Information */}
          <section>
            <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
              Owner Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Owner Name</label>
                <input
                  type="text"
                  value={session.user.name || ""}
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400`}
                />
              </div>

              <div>
                <label className={labelClass}>Owner Email</label>
                <input
                  type="email"
                  value={session.user.email || ""}
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400`}
                />
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Studio Information */}
          <section>
            <h2 className="mb-5 text-base font-bold text-gray-900 dark:text-white">
              Studio Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Studio Title *</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    handleChange("title", e.target.value)
                  }
                  placeholder="e.g. The Ivory Cyc Studio"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    handleChange("category", e.target.value)
                  }
                  className={inputClass}
                  disabled={categoriesLoading}
                >
                  <option value="">
                    {categoriesLoading
                      ? "Loading categories..."
                      : "Select studio category"}
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category._id}
                      value={category.slug}
                    >
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-2">
                      <DollarSign size={15} />
                      Hourly Rate ($) *
                    </span>
                  </label>

                  <input
                    required
                    type="number"
                    min="1"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      handleChange("hourlyRate", e.target.value)
                    }
                    placeholder="e.g. 50"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-2">
                      <DollarSign size={15} />
                      Security Deposit ($) *
                    </span>
                  </label>

                  <input
                    required
                    type="number"
                    min="0"
                    value={formData.securityDeposit}
                    onChange={(e) =>
                      handleChange("securityDeposit", e.target.value)
                    }
                    placeholder="e.g. 100"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Users size={15} />
                    Maximum Capacity *
                  </span>
                </label>

                <input
                  required
                  type="number"
                  min="1"
                  value={formData.maxCapacity}
                  onChange={(e) =>
                    handleChange("maxCapacity", e.target.value)
                  }
                  placeholder="Maximum number of people"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <MapPin size={15} />
                    Location / Address *
                  </span>
                </label>

                <input
                  required
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleChange("location", e.target.value)
                  }
                  placeholder="Street address, city, state"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Studio Image */}
          <section>
            <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
              Studio Image
            </h2>

            <label className={labelClass}>Image URL *</label>

            <input
              required
              type="url"
              value={formData.image}
              onChange={(e) => {
                handleChange("image", e.target.value);
                setImageError(false);
              }}
              placeholder="https://example.com/studio.jpg"
              className={inputClass}
            />

            {formData.image && (
              <div className="relative mt-4 h-52 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                {!imageError ? (
                  <Image
                    fill
                    src={formData.image}
                    alt="Studio preview"
                    className="object-cover"
                    unoptimized
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                    Unable to load image. Check the image URL.
                  </div>
                )}
              </div>
            )}
          </section>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Amenities */}
          <section>
            <h2 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
              Amenities & Facilities
            </h2>

            <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
              Select all facilities available in your studio.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {amenitiesList.map((amenity) => {
                const selected =
                  formData.amenities.includes(amenity);

                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-medium transition ${
                      selected
                        ? "border-black bg-gray-900 text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded border ${
                        selected
                          ? "border-white bg-white text-black"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {selected && <Check size={11} />}
                    </span>

                    {amenity}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Overview */}
          <section>
            <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
              Detailed Overview
            </h2>

            <textarea
              required
              rows={6}
              value={formData.overview}
              onChange={(e) =>
                handleChange("overview", e.target.value)
              }
              placeholder="Describe your studio, its atmosphere, facilities, equipment and what makes it special..."
              className={`${inputClass} resize-none`}
            />
          </section>

        </div>

        {/* Submit */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-gray-800 dark:bg-gray-800/30">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Fields marked * are required.
          </p>

          <button
            type="submit"
            disabled={loading || categoriesLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {isEdit ? "Updating Studio..." : "Creating Studio..."}
              </>
            ) : (
              <>
                {isEdit ? "Update Studio" : "Create Studio"}
                <Building2 size={16} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
