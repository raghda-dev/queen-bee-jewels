// app/(main)/home/@modals/settings/layout.tsx

'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

import SettingsIcon from '../../../../../public/staticAssets/icons/SettingsIcon.png';
import CardsIcon from '../../../../../public/staticAssets/icons/CardsIcon.png';
import Notifications from '../../../../../public/staticAssets/icons/Notification.png';
import ChatIcon from '../../../../../public/staticAssets/icons/ChatIcon.png';

import usePreviousPath from '../../../utils/usePrevPath';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const previousPath = usePreviousPath('/home');

  // Prevent rendering modal if user is not on a settings sub-route
  if (!pathname.startsWith('/home/settings')) return null;

  const closeModal = () => {
    router.push(previousPath);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all" />

      {/* Modal container */}
      <div className="relative z-50 flex h-[98vh] sm:min-h-[79vh] md:min-h-[80vh] md:h-[87vh] lg:h-[93vh] w-[85vw] md:w-[80vw] lg:w-[76vw] flex-col rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 text-grayDark">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">Settings</h3>
          <button className="text-gray-500 text-xl font-light" onClick={closeModal}>
            <X className="h-5 w-5 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="border-r w-16 md:w-52 lg:w-64 xl:w-72 p-2 pt-14 md:p-6 md:pt-16 transition-all duration-300">
            <ul className="space-y-6">
              {[
                { href: '/home/settings', icon: SettingsIcon, label: 'account' },
                { href: '/home/settings/cards', icon: CardsIcon, label: 'cards' },
                { href: '/home/settings/notifications', icon: Notifications, label: 'notifications' },
                { href: '/home/settings/chat', icon: ChatIcon, label: 'chat' },
              ].map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    scroll={false}
                    className={`flex items-center rounded-lg px-4 py-2 ${
                      pathname === href ? 'bg-pinkLight' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-0 md:space-x-2">
                      <Image src={icon} alt={`${label} icon`} width={20} height={20} className="mr-2" />
                      <span className="hidden md:inline-block text-xl">{label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
