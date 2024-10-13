import { LoaderCircle, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { getSkinPrice } from "@/lib/utils";
import {
  CartCardProps,
  ObjCart,
  PriceObj,
  setCartProductsType,
} from "@/lib/types";
import { useMediaQuery } from "@mantine/hooks";

interface Props extends ObjCart {
  setCartProducts: setCartProductsType;
}
export function CartCard({
  id,
  data,
  imgUrl,
  price,
  quantity,
  setCartProducts,
}: Props) {
  const [priceFetched, setPrice] = useState<PriceObj | null>(null);
  const [loadingprice, setLoadingPrice] = useState<boolean>(false);

  function handleAddQuantity() {
    if (!id) {
      console.log("Error Id");
      return;
    }

    setCartProducts((prevCart) => {
      const newCart = new Map<string, CartCardProps>(prevCart);
      const existingProduct = newCart.get(id);
      if (existingProduct && (loadingprice === false || priceFetched)) {
        const updatedProduct: CartCardProps = {
          ...existingProduct,
          quantity: (existingProduct.quantity || 0) + 1,
        };
        newCart.set(id, updatedProduct);
      }

      return newCart;
    });
  }
  function handleRemoveQuantity() {
    if (!id) {
      console.log("Error Id");
      return;
    }
    setCartProducts((prevCart) => {
      const newCart = new Map<string, CartCardProps>(prevCart);
      const existingProduct = newCart.get(id);

      if (
        existingProduct &&
        existingProduct.quantity > 1 &&
        loadingprice === false
      ) {
        const updatedProduct: CartCardProps = {
          ...existingProduct,
          quantity: (existingProduct.quantity || 0) - 1,
        };
        newCart.set(id, updatedProduct);
      }

      return newCart;
    });
  }

  function updatePrice(newPrice: string) {
    if (!id) {
      return;
    }
    setCartProducts((prevCart) => {
      const newCart = new Map<string, ObjCart>(prevCart);
      const existingProduct = newCart.get(id);

      if (existingProduct && loadingprice === false) {
        const updatedProduct: ObjCart = {
          ...existingProduct,
          price: newPrice,
        };
        newCart.set(id, updatedProduct);
      }

      return newCart;
    });
  }

  function cleanPrice(price: string) {
    const cleanedPrice = price.replace(/[$\sUSD,]/g, "");
    return parseFloat(cleanedPrice);
  }
  useEffect(() => {
    if (price === "0") {
      const fetchPrice = async () => {
        try {
          const result = await getSkinPrice(
            data.hashName,
            id?.split("-")[0] === "skin" ? "Factory New" : "",
          );
          setPrice(result);
          result.volume ? "" : setLoadingPrice(true);
          updatePrice(result.median_price || result.lowest_price || "0");
        } catch (error) {
          setLoadingPrice(true);
        }
      };
      fetchPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function getTotalPrice(price: string): string | undefined {
    const priceNumber = cleanPrice(price);
    if (quantity) {
      const priceInCents = Math.round(priceNumber * 100);
      const totalInCents = priceInCents * quantity;
      const totalPrice = (totalInCents / 100).toFixed(2);
      return `$${totalPrice} USD`;
    }
  }
  const match = useMediaQuery("(min-width: 1024px)");
  return (
    <div className="flex gap-2 p-1 w-full justify-between lg:p-2 lg:flex-col items-center border border-slate-800 dark:hover:border-slate-400 hover:border-slate-800 transition-colors rounded-sm animate-in fade-in zoom-in">
      <div className="flex flex-col items-center">
        <p className="text-xs opacity-50 text-center ">{data.title}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h2 className="truncate max-sm:max-w-[100px]  text-center">
                {data.subTitle}
              </h2>
            </TooltipTrigger>
            <TooltipContent>
              <p>{data.subTitle}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {!match && (
          <p className="animate-in fade-in text-center font-bold">
            {priceFetched?.median_price ? (
              getTotalPrice(priceFetched.median_price)
            ) : priceFetched?.lowest_price ? (
              getTotalPrice(priceFetched.lowest_price)
            ) : price !== "0" ? (
              getTotalPrice(price)
            ) : loadingprice ? (
              "Not Found"
            ) : (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            )}
          </p>
        )}
      </div>

      <div className="bg-slate-800 rounded-sm flex justify-center max-lg:order-first">
        <img
          src={imgUrl}
          alt={data.subTitle}
          className="w-[100px] lg:w-[100px]"
        />
      </div>
      {match && (
        <h2 className="animate-in fade-in text-center">
          {priceFetched?.median_price ? (
            getTotalPrice(priceFetched.median_price)
          ) : priceFetched?.lowest_price ? (
            getTotalPrice(priceFetched.lowest_price)
          ) : price !== "0" ? (
            getTotalPrice(price)
          ) : loadingprice ? (
            "Not Found"
          ) : (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          )}
        </h2>
      )}

      <div className="flex gap-1 items-center">
        <Button size={"icon"} variant={"ghost"} onClick={handleRemoveQuantity}>
          <Minus size={match ? 16 : 12} />
        </Button>
        <div className="bg-slate-700 p-3 rounded-sm">
          <p className="lg:text-base text-xs">{quantity}</p>
        </div>
        <Button size={"icon"} variant={"ghost"} onClick={handleAddQuantity}>
          <Plus size={match ? 16 : 12} />
        </Button>
      </div>
    </div>
  );
}
