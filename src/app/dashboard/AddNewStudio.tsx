
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";
import {
  Building2,
  MapPin,
  DollarSign,
  Users,
  ImagePlus,
  Loader2,
  Check,
} from "lucide-react";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Event Space",
  "Creative Workspace",
  "Other",
];

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

export default function AddNewStudio() {
  const router = useRouter();

  // const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    image: "",
    amenities: [] as string[],
    overview: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  // const handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement>
  // ) => {
  //   e.preventDefault();

  //   if (!session?.user) {
  //     toast.error("Please sign in to add a studio.");
  //     return;
  //   }

  //   if (Number(formData.hourlyRate) <= 0 ||
  //       Number(formData.maxCapacity) <= 0 ||
  //       Number(formData.securityDeposit) < 0) {
  //     toast.error("Please enter valid prices and capacity.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     // Get Better Auth JWT token
  //     // const { data, error } = await authClient.token();

  //     if (error || !data?.token) {
  //       toast.error("Authentication failed. Please sign in again.");
  //       return;
  //     }

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/studios`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${data.token}`,
  //         },
  //         body: JSON.stringify({
  //           ...formData,
  //           hourlyRate: Number(formData.hourlyRate),
  //           securityDeposit: Number(formData.securityDeposit),
  //           maxCapacity: Number(formData.maxCapacity),
  //         }),
  //       }
  //     );

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.message || "Failed to create studio.");
  //     }

  //     toast.success("Studio created successfully!");

  //     router.push("/my-listings");
  //     router.refresh();

  //   } catch (error) {
  //     console.error("Studio creation error:", error);

  //     toast.error(
  //       error instanceof Error
  //         ? error.message
  //         : "Something went wrong."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // if (isPending) {
  //   return (
  //     <div className="flex justify-center py-20">
  //       <Loader2 className="animate-spin text-gray-500" />
  //     </div>
  //   );
  // }

  return (
    <div className="mx-auto w-full max-w-4xl">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Building2 size={21} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Add New Studio
          </h1>
        </div>

        <p className="text-sm text-gray-500">
          Share your creative space with the StudioSpace community.
        </p>
      </div>

      <form
        // onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white shadow-sm"
      >

        <div className="space-y-7 p-5 sm:p-8">

          {/* Owner Information */}
          <section>
            <h2 className="mb-4 text-base font-bold text-gray-900">
              Owner Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <label className={labelClass}>Owner Name</label>
                <input
                  type="text"
                  // value={session?.user?.name || ""}
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-500`}
                />
              </div>

              <div>
                <label className={labelClass}>Owner Email</label>
                <input
                  type="email"
                  // value={session?.user?.email || ""}
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-500`}
                />
              </div>

            </div>
          </section>

          <div className="border-t border-gray-100" />

          {/* Basic Information */}
          <section>
            <h2 className="mb-5 text-base font-bold text-gray-900">
              Studio Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className={labelClass}>Studio Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. The Ivory Cyc Studio"
                  value={formData.title}
                  onChange={(e) =>
                    updateField("title", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    updateField("category", e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">Select studio category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
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
                    placeholder="e.g. 50"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      updateField("hourlyRate", e.target.value)
                    }
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
                    placeholder="e.g. 100"
                    value={formData.securityDeposit}
                    onChange={(e) =>
                      updateField("securityDeposit", e.target.value)
                    }
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
                  placeholder="Maximum number of people"
                  value={formData.maxCapacity}
                  onChange={(e) =>
                    updateField("maxCapacity", e.target.value)
                  }
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
                  placeholder="Street address, city, state"
                  value={formData.location}
                  onChange={(e) =>
                    updateField("location", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

            </div>
          </section>

          <div className="border-t border-gray-100" />

          {/* Image */}
          <section>
            <h2 className="mb-4 text-base font-bold text-gray-900">
              Studio Image
            </h2>

            <label className={labelClass}>Image URL *</label>

            <input
              required
              type="url"
              placeholder="https://example.com/studio.jpg"
              value={formData.image}
              onChange={(e) =>
                updateField("image", e.target.value)
              }
              className={inputClass}
            />

            {formData.image && (
              <div className="relative mt-4 h-52 w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                <Image
                  src={formData.image}
                  alt="Studio preview"
                  fill
                  unoptimized
                  className="object-cover"
                  onError={() => {
                    // Invalid URLs will not show a valid preview.
                  }}
                />
              </div>
            )}
          </section>

          <div className="border-t border-gray-100" />

          {/* Amenities */}
          <section>
            <h2 className="mb-2 text-base font-bold text-gray-900">
              Amenities & Facilities
            </h2>

            <p className="mb-4 text-xs text-gray-500">
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
                        ? "border-black bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <span className={`flex h-4 w-4 items-center justify-center rounded border ${
                      selected
                        ? "border-white bg-white text-black"
                        : "border-gray-300"
                    }`}>
                      {selected && <Check size={11} />}
                    </span>

                    {amenity}
                  </button>
                );
              })}

            </div>
          </section>

          <div className="border-t border-gray-100" />

          {/* Overview */}
          <section>
            <h2 className="mb-4 text-base font-bold text-gray-900">
              Detailed Overview
            </h2>

            <textarea
              required
              rows={6}
              placeholder="Describe your studio, its atmosphere, facilities, equipment and what makes it special..."
              value={formData.overview}
              onChange={(e) =>
                updateField("overview", e.target.value)
              }
              className={`${inputClass} resize-none`}
            />
          </section>

        </div>

        {/* Submit */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

          <p className="text-xs text-gray-400">
            Fields marked * are required.
          </p>

          <button
            type="submit"
            // disabled={loading || !session?.user}
            className="flex items-center justify-center gap-2 rounded-xl bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating Studio...
              </>
            ) : (
              <>
                Create Studio
                <Building2 size={16} />
              </>
            )}
          </button>

        </div>

      </form>
    </div>
  );
}
