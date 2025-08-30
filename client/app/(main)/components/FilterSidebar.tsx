// client/app/(main)/components/FilterSidebar.tsx

"use client";

import React from "react";

type FilterSidebarProps = {
  showPriceRange?: boolean;
  priceRange?: [number, number];
  onPriceChange?: (range: [number, number]) => void;
  productTypes?: string[];
  selectedType?: string;
  onTypeChange?: (type: string) => void;
};

export default function FilterSidebar({
  showPriceRange = false,
  priceRange,
  onPriceChange,
  productTypes = [],
  selectedType,
  onTypeChange,
}: FilterSidebarProps) {
  return (
    <aside className="w-64 p-4 border-r border-gray-200">
      {/* Product Type Filter */}
      {productTypes.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Product Type</h3>
          <ul className="space-y-2">
            {productTypes.map((type) => (
              <li key={type}>
                <button
                  className={`px-2 py-1 rounded ${
                    selectedType === type ? "bg-black text-white" : "bg-gray-100"
                  }`}
                  onClick={() => onTypeChange?.(type)}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Price Range Filter */}
      {showPriceRange && priceRange && onPriceChange && (
        <div>
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                onPriceChange([+e.target.value, priceRange[1]])
              }
              className="w-20 border p-1 rounded"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                onPriceChange([priceRange[0], +e.target.value])
              }
              className="w-20 border p-1 rounded"
              placeholder="Max"
            />
          </div>
        </div>
      )}
    </aside>
  );
}
