import Link from "next/link";
import Image from "next/image";

export default function Card(){
    return(<div className="flex-col w-[220]  text-black bg-white h-[250] p-4 hover:bg-[#F2F0EF] hover:bg-opacity-60 rounded-xl " >
        <Image src={"/controller.jpg"}  alt="product" width={200} height={175}></Image>
        <h4 className="whitespace-nowrap overflow-hidden">Zenith Pro: Fantech </h4>
        <h5 className="">$35</h5>
    </div>)
}