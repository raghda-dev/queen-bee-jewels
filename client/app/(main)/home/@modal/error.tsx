'use client';

import React from 'react';

export default function ModalError({ error, reset }: { error: Error; reset: () => void }) {
  console.error('Modal Error:', error);

  return (
    <div className="p-4 bg-red-100 text-red-800 rounded">
      <h2>Something went wrong in the modal.</h2>
      <button
        onClick={() => reset()}
        className="mt-2 p-2 bg-red-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
