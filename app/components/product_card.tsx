import Link from "next/link";
import Image from "next/image";

export default function Card(){
    return(<div className="flex-col w-[220] bg-neutral-700 h-[250] p-4 hover:opacity-60" >
        <Image src={"/controller.jpg"} alt="product" width={200} height={175}></Image>
        <h4 className="">product</h4>
        <h5 className="">description</h5>
    </div>)
}