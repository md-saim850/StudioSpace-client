"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Star,
  Users,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type{ StudioType } from "@/type";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface StudioProps {
  studio: StudioType;
}

export default function StudioDetails({studio}:StudioProps) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [booking, setBooking] = useState(false);

  const validateBookingTime = () => {
    if (!date || !startTime || !endTime) {
      toast.error("Please select date, start time and end time.");
      return false;
    }

    if (startTime >= endTime) {
      toast.error("End time must be after start time.");
      return false;
    }

    const now = new Date();
    const selectedStartDateTime = new Date(`${date}T${startTime}:00`);

    if (selectedStartDateTime <= now) {
      toast.error("Please select a future date and time.");
      return false;
    }

    return true;
  };

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");


  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (booking) return;

    if (!validateBookingTime()) return;

    setBooking(true);

    try {
      const { data: session, error } = await authClient.token();

      if (error || !session?.token) {
        toast.error("Authentication failed. Please sign in again.");
        return;
      }

      const bookingData = {
        studio: {
          _id: studio._id,
          title: studio.data.title,
          image: studio.data.image,
          location: studio.data.location,
          hourlyRate: studio.data.hourlyRate,
          securityDeposit: studio.data.securityDeposit,
          category: studio.data.category,
        },
        date,
        startTime,
        endTime,
        status: "Pending",
      };

      const res = await fetch(`${process.env.API_URL}/add-booking/`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to add booking.");
        return;
      }

      toast.success("Studio booked successfully!");

      setDate("");
      setStartTime("");
      setEndTime("");

    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong while booking.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link href="/studios" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-gray-600 transition hover:text-black dark:text-gray-400 dark:hover:text-white">
          <ArrowLeft size={15} />
          Back to results
        </Link>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.65fr_0.9fr]">

          {/* LEFT: Studio Information */}
          <section className="min-w-0 space-y-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900">

            {/* Main Studio Image */}
            <div className="relative h-[260px] overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 sm:h-[400px] dark:border-gray-800 dark:bg-gray-800">
              <Image
                fill
                src={studio.data.image}
                alt={studio.data.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Title and Price */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                  {studio.data.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">

                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {studio.data.location}
                  </span>

                </div>
              </div>

              <div className="shrink-0">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${studio.data.hourlyRate}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}/ hr
                  </span>
                </p>
              </div>

            </div>

            {/* Category */}
            <div>
              <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {studio.data.category}
              </span>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                About this studio
              </h2>

              <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                {studio.data.overview}
              </p>
            </div>

            {/* Studio Information */}
            <div>
              <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
                Studio Information
              </h2>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                  <Users size={18} className="mb-3 text-gray-500 dark:text-gray-400" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Max Capacity</p>
                  <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                    {studio.data.maxCapacity} People
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                  <Clock size={18} className="mb-3 text-gray-500 dark:text-gray-400" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Hourly Rate</p>
                  <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                    ${studio.data.hourlyRate}/hr
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 col-span-2 sm:col-span-1 dark:border-gray-800 dark:bg-gray-800/50">
                  <ShieldCheck size={18} className="mb-3 text-gray-500 dark:text-gray-400" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Security Deposit</p>
                  <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                    ${studio.data.securityDeposit}
                  </p>
                </div>

              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
                Amenities
              </h2>

              {studio.data.amenities?.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

                  {studio.data.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <CheckCircle2
                        size={15}
                        className="shrink-0 text-gray-400 dark:text-gray-500"
                      />
                      {amenity}
                    </div>
                  ))}

                </div>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  No amenities listed.
                </p>
              )}
            </div>

            {/* Owner */}
            {studio.ownerName && (
              <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
                <h2 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
                  Hosted by
                </h2>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {studio.ownerName}
                </p>
              </div>
            )}

          </section>

          {/* RIGHT: Booking Card */}
          <aside className="lg:sticky lg:top-6">

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900">

              <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Book This Studio
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Choose your preferred booking date and time.
                </p>
              </div>

              <form onSubmit={handleBooking} className="space-y-5">

                {/* Date Input */}
                <div>
                  <label
                    htmlFor="booking-date"
                    className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200"
                  >
                    <CalendarDays size={15} />
                    Select Date
                  </label>

                  <input
                    id="booking-date"
                    name="date"
                    type="date"
                    required
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={booking}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-white dark:focus:ring-gray-800"
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label
                    htmlFor="start-time"
                    className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200"
                  >
                    <Clock size={15} />
                    Start Time
                  </label>

                  <input
                    id="start-time"
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    disabled={booking}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-white dark:focus:ring-gray-800"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label
                    htmlFor="end-time"
                    className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200"
                  >
                    <Clock size={15} />
                    End Time
                  </label>

                  <input
                    id="end-time"
                    type="time"
                    required
                    min={startTime || undefined}
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    disabled={booking}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-white dark:focus:ring-gray-800"
                  />
                </div>

                {/* Book Button */}
                <button
                  type="submit"
                  disabled={!date || !startTime || !endTime || booking}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                >
                  {booking ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Processing...
                    </>
                  ) : (
                    <>
                      Book Now
                      <ArrowLeft className="rotate-180" size={16} />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-gray-400 dark:text-gray-500">
                  Your booking will be subject to availability and owner confirmation.
                </p>

              </form>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
