import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import Button from '../../../../../components/Button'
// import Card1 from '../../../../../../../public/staticAssets/images/visa.png';
import Card2 from '../../../../../../../public/staticAssets/images/CreditCard.png';


type Props = {
  card: {
    last4: string
    expiry: string
    isDefault: boolean
  }
  onDelete: () => void
  onSetDefault: () => void
}

const CardItem = ({ card, onDelete, onSetDefault }: Props) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded shadow">
    <div>
    <Image src={Card2} alt="Card" width={50} height={30} className='w-[4rem] h-[2.8rem] sm:w-[4.8rem] sm:h-[3.3rem] md:w-[4.9rem] md:h-[3.5rem] transition-all' />
    </div>
    <div className="mx-4">
      <p className="text-sm md:text-md lg:text-lg font-semibold">••••••••1233 {card.last4}</p>
      <p className="text-sm font-medium md:text-md lg:text-lg lg:font-light text-gray-500">Exp. date {card.expiry}</p>
    </div>
    <div className="flex items-center gap-2">
      <Button
        size="small"
        variant={card.isDefault ? 'primary' : 'textButton'}
        onClick={onSetDefault}
        shape='rounded'
      >
        default
      </Button>
      <button onClick={onDelete}>
        <Trash2 className="text-orangeDark w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>
  </div>
)

export default CardItem
