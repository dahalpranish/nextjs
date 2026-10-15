import Image from "next/image";

export type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

type CardProps = Omit<Product, "id">;

export default function Card({ name, price, image_url }: CardProps) {
  return (
    <div className="flex flex-col rounded-xl bg-white p-4 text-black transition-colors hover:bg-[#F2F0EF]">
      <Image
        src={image_url}
        alt={name}
        width={200}
        height={175}
        className="h-44 w-full object-contain"
      />
      <h4 className="mt-3 truncate font-medium">{name}</h4>
      <h5 className="text-neutral-600">${price.toFixed(2)}</h5>
    </div>
  );
}