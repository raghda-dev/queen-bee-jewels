import NotificationCard from './NotificationCard'

const notifications = [
  { message: "Your order has shipped!", sender: "Queen Bee Store Manager" },
  { message: "New collection is live!", sender: "Queen Bee Jewels Team" },
  { message: "Your order has shipped!", sender: "Queen Bee Store Manager" },
  { message: "New collection is live!", sender: "Queen Bee Jewels Team" },
]

export default function NotificationList() {
  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
      {notifications.map((n, i) => (
        <NotificationCard key={i} message={n.message} sender={n.sender} />
      ))}
    </div>
  )
}
