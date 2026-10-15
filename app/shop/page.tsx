import Card from '../components/product_card'
import Nav from '../components/nav'

export default function Shop(){
    return (<div className="flex flex-col min-h-screen w-full bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat ">
        <div ><Nav /></div>
        <div className=" grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 w-full p-9"><Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card /></div>
        </div>)
}