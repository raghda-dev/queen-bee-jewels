import Card from '../../components/Card';


export default function Test() {

 return (
    <div className='flex flex-col'>
     <div className="small px-6 py-9 gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
      <Card size='small'></Card>
      <Card size='small'></Card>
      <Card size='small'></Card>
      <Card size='small'></Card>
     </div>
     {/* <div className="medium grid px-6 py-9 grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
     <Card size='medium'></Card>
      <Card size='medium'></Card>
      <Card size='medium'></Card>
      <Card size='medium'></Card>
     </div>
     <div className="large grid px-6 py-9 grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
     <Card size='large'></Card>
      <Card size='large'></Card>
      <Card size='large'></Card>
      <Card size='large'></Card>
     </div> */}
    </div>
 )
}