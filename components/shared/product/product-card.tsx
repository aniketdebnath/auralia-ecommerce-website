import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";
import Rating from "./product-rating";
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <div className="relative w-full aspect-[1/1] overflow-hidden">
          <Link
            href={`/product/${product.slug}`}
            className="block w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              height={300}
              width={300}
              className="object-cover rounded-t-lg"
              priority
            />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-sm">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
