"use client";
import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";
const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    //Handle success
    toast.success(res.message, {
      action: {
        label: "View Cart",

        onClick: () => {
          router.push("/cart");
        },
      },
    });
  };
  return (
    <Button className=" w-full" type="button" onClick={handleAddToCart}>
      <Plus className="mr-1" />
      AddToCart
    </Button>
  );
};
export default AddToCart;
