import React from 'react'
import { Bell } from 'lucide-react' // or use your own icon/image

interface NotificationCardProps {
  message: string
  sender: string
}

const NotificationCard: React.FC<NotificationCardProps> = ({ message, sender }) => {
  return (
    <div className="flex items-start gap-4 bg-white border border-gray-200 shadow-sm rounded-lg p-4 hover:shadow-md transition w-[89%] md:w-[90%]">
      {/* Icon or image */}
      <div className="flex-shrink-0 mt-1 text-queenGold">
        <Bell className="w-6 h-6" />
        {/* Replace Bell with an image if needed */}
      </div>

      {/* Message and sender */}
      <div>
        <p className="text-sm sm:text-base lg:text-lg font-medium text-black">{message}</p>
        <p className="text-xs sm:text-sm lg:text-md text-grayDark mt-1">{sender}</p>
      </div>
    </div>
  )
}

export default NotificationCard
