'use client';

import React from 'react';
import { X } from 'lucide-react';
import Button from '../../Button';
import Image from 'next/image';

type AvatarModalProps = {
  type: 'edit' | 'add' | 'remove';
  imageUrl?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AvatarModal({ type, imageUrl, onCancel, onConfirm }: AvatarModalProps) {
  const primaryLabelMap = {
    edit: 'Edit',
    add: 'Add',
    remove: 'Delete',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-xl shadow-2xl w-[90vw] max-w-sm z-[999]">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={16} />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center space-y-4">
          {/* Image Placeholder */}
          <div className="w-28 h-28 rounded-full border-2 border-gray-200 overflow-hidden flex items-center justify-center">
            {imageUrl ? (
              <Image src={imageUrl} alt="Avatar" height={500} width={500} className="object-cover w-full h-full" />
            ) : (
              <span className="text-sm text-gray-400">Upload</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <Button
              onClick={onConfirm}
              size="small"
              shape="square"
              color='var(--navy-dark)'
            >
              {primaryLabelMap[type]}
            </Button>
            <Button
              onClick={onCancel}
              size="small"
              variant="secondary"
              color="var(--navy-dark)"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
