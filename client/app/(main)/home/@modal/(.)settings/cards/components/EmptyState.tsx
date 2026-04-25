import Image from 'next/image'
import Button from '../../../../../components/Button'
import Card1 from '../../../../../../../public/staticAssets/images/visa.png';
import Card2 from '../../../../../../../public/staticAssets/images/CreditCard.png';


const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 lg:space-y-12 mt-7">
    <div className="flex gap-4">
      <Image src={Card1} alt="Card 1" width={80} height={30} className='w-[5rem] h-[3.2rem] sm:w-[5.3rem] sm:h-[3.6rem] md:w-[5.4rem] md:h-[4rem] transition-all' />
      <Image src={Card2} alt="Card 2" width={100} height={60} className='w-[5rem] h-[3.2rem] sm:w-[5.3rem] sm:h-[3.6rem] md:w-[5.4rem] md:h-[4rem] transition-all'/>
    </div>
    <h2 className="text-2xl xs:text-2xl lg:text-3xl font-josefin font-medium">Add your first card for secure payment.</h2>
    <p className="text-sm xs:text-lg md:text-xl xl:text-2xl text-gray-500">
      This card will be used as your default card for payment unless you change it.
    </p>
    <Button onClick={onAdd} size='medium' shape='square'  color='var(--purple-dark)'>Add My Card</Button>
  </div>
)

export default EmptyState
