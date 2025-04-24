// app/home/settings/layout.tsx

import React from "react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-xl rounded-xl p-6 shadow-lg">
        <nav className="mb-4 flex gap-4">
          <a href="/home/settings/account">Account</a>
          <a href="/home/settings/chat">Chat</a>
          <a href="/home/settings/notifications">Notifications</a>
          <a href="/home/settings/cards">Cards</a>
        </nav>
        {children}
      </div>
    </div>
  );
}

  