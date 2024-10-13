import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart } from "lucide-react";
import { CartCard } from "./cartCard";
import { CartCardProps, ObjCart } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
interface CartProps {
  cartProducts: Map<string, CartCardProps>;
  setCartProducts: Dispatch<SetStateAction<Map<string, ObjCart>>>;
  variantMobile?: boolean;
}
export function DrawerCart({
  cartProducts,
  setCartProducts,
  variantMobile,
}: CartProps) {
  const itemsArray = Array.from(cartProducts.values());
  const [totalPrice, setTotalPrice] = useState(0);

  function cleanPrice(price: string) {
    const cleanedPrice = price.replace(/[$\sUSD,]/g, "");
    return parseFloat(cleanedPrice);
  }

  function calculateTotalPrice(arrCart: CartCardProps[]): number {
    const totalInCents = arrCart.reduce((total, item) => {
      const itemPrice = cleanPrice(item.price);
      const priceInCents = Math.round(itemPrice * 100);
      return total + priceInCents * item.quantity;
    }, 0);
    return Number((totalInCents / 100).toFixed(2));
  }

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(itemsArray));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsArray]);

  const match = useMediaQuery("(min-width: 1024px)");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={variantMobile ? "ghost" : "outline"}
          size="icon"
          className="relative"
        >
          <ShoppingCart size={16} />
          {itemsArray.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 animate-in zoom-in">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-700"></span>
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle>Cart</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>

        <div className="flex gap-4 flex-col max-h-90vh  overflow-y-auto lg:flex-row lg:justify-between lg:p-4">
          <div className="flex gap-4 flex-col overflow-y-auto lg:flex-row">
            {itemsArray.map((obj, idx: number) => {
              return (
                <CartCard
                  id={obj.id}
                  data={obj.data}
                  imgUrl={obj.imgUrl}
                  price={`${obj.price}`}
                  quantity={obj.quantity}
                  setCartProducts={setCartProducts}
                  key={idx}
                />
              );
            })}
          </div>
          {match && (
            <div className="flex flex-col gap-5 justify-between lg:justify-center items-center ">
              <h1 className="font-bold text-xl">{`Total: ${totalPrice.toFixed(2)}`}</h1>
              <div className="flex gap-2">
                <DrawerClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DrawerClose>
                <Button variant="secondary">Checkout</Button>
              </div>
            </div>
          )}
        </div>
        {!match && (
          <DrawerFooter>
            <div className="flex flex-col gap-5 justify-between items-center mt-auto">
              <h1 className="font-bold text-xl">{`Total: ${totalPrice.toFixed(2)}`}</h1>
              <div className="flex gap-2">
                <DrawerClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DrawerClose>
                <Button variant="secondary">Checkout</Button>
              </div>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
