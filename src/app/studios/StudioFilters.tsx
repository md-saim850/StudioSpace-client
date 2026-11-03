
"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { StudioType } from "@/type";
import StudiosCard from "@/components/home/StudiosCard";

interface StudioFiltersProps {
  studios: StudioType[];
}

export default function StudioFilters({ studios }: StudioFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const categories = useMemo(() => {
    return [...new Set(studios.map((studio) => studio.data.category))].filter(Boolean);
  }, [studios]);

  const filteredStudios = useMemo(() => {let result = [...studios];

    if (search.trim()) {
      result = result.filter((studio) => studio.data.title.toLowerCase().includes(search.toLowerCase().trim()));
    }

    if (category !== "all") { 
      result = result.filter((studio) => studio.data.category === category);
    }

    if (sort === "min-max") {
      result.sort((a, b) => Number(a.data.hourlyRate) - Number(b.data.hourlyRate));

    } else if (sort === "max-min") {
      result.sort(
        (a, b) => Number(b.data.hourlyRate) - Number(a.data.hourlyRate));
    }

    return result;
  }, [studios, search, category, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
  };

  return (
    <div className="mt-8">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Search */}
        <div className="relative">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search studio by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="all">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Price Sorting */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="default">Sort by price</option>
          <option value="min-max">Price: Low to High</option>
          <option value="max-min">Price: High to Low</option>
        </select>
      </div>

      {/* Results Information */}
      <div className="flex items-center justify-between mt-6 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <SlidersHorizontal size={16} />
          <span>
            Showing {filteredStudios.length} of {studios.length} studios
          </span>
        </div>

        {(search || category !== "all" || sort !== "default") && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <X size={16} />
            Clear filters
          </button>
        )}
      </div>

      {/* Studio Cards */}
      {filteredStudios.length === 0 ? (
        <div className="text-center py-20">
          <Search className="mx-auto mb-4 text-gray-400" size={35} />

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            No studios found!
          </h2>

          <p className="text-gray-500 mt-2">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredStudios.map((studio, index) => (
            <StudiosCardWrapper
              key={studio._id ?? index}
              studio={studio}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function StudiosCardWrapper({studio, index,}: {studio: StudioType;index: number;}) {
  return <StudiosCard studio={studio} index={index} />;
}
