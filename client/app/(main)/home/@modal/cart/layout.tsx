// app/(main)/home/@modals/cart/layout.tsx
//🛒 

import React from "react";

export default function CartModalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-end items-start p-4">
      <div className="bg-white w-[400px] max-h-[80vh] overflow-auto rounded-lg shadow-2xl">
        {children}
      </div>
    </div>
  );
}

