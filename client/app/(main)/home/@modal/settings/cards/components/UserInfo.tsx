import Image, { StaticImageData } from 'next/image'

type Props = {
  name: string
  username: string
  avatar: StaticImageData
}

const UserInfo = ({ name, username, avatar }: Props) => (
  <div className="flex flex-col items-center gap-0 mb-6 w-full mt-[-1rem] pb-5 border-b border-gray-300">
    <div className="relative h-28 w-28 lg:h-36 lg:w-36 overflow-hidden rounded-full">
      <Image src={avatar} alt="User Avatar" fill className="object-cover" />
    </div>
    <div className="mt-4 text-center">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-500">{username}</p>
    </div>
  </div>
)

export default UserInfo
