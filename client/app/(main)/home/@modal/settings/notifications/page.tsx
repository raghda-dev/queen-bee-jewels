import NotificationList from './components/NotificationList'
import UserHeader from '../components/UserHeader';


export default function NotificationsPage() {
  return (
    <div>
       <div className='w-full border-b border-gray-300 pb-6'>
        <UserHeader/>
      </div>
    <div className="p-4">
      <NotificationList />
    </div>
    </div>
  )
}
