"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
        priority
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              "border-2 mr-2 cursor-pointer hover:border-yellow-500 border-opacity-5",
              current === index && "border-yellow-400"
            )}>
            <Image src={image} alt="image" height={100} width={100} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductImages;
