import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { StickerType } from "@/lib/types";
import Atropos from "atropos/react";
import { useMediaQuery } from "@mantine/hooks";
interface Props {
  sticker: StickerType;
  handleAddToCart: () => void;
}
function StickerCard({ sticker, handleAddToCart }: Props) {
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };

  const match = useMediaQuery("(min-width: 640px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Link
      to={`/view/${sticker.id}`}
      className="flex sm:flex-col justify-between  max-sm:border-x-0 max-sm:border-b-0 max-sm:rounded-none gap-4 items-center border border-input p-4 rounded-sm cursor-pointer group animate-in fade-in dark:hover:border-slate-400 hover:border-slate-800 transition-colors"
    >
      {isDesktop && (
        <>
          <div className="sm:order-2 relative w-full aspect-[4/3]">
            {loading && <Skeleton className=" absolute inset-0 rounded-sm" />}
            <Atropos
              activeOffset={40}
              highlight={false}
              shadow={false}
              className="  sm:max-w-[300px] max-w-[140px]"
              innerClassName="test3"
            >
              <div className="relative  ">
                <div
                  className="group-hover:visible invisible group-hover:scale-105 transition-transform absolute bg-cover w-full h-full custom-background"
                  style={{ backgroundImage: `url(${sticker.image})` }}
                  data-atropos-offset="-5"
                  data-atropos-opacity="0.1;0.8"
                ></div>
                <img
                  crossOrigin="anonymous"
                  src={sticker.image}
                  alt={sticker.name}
                  data-atropos-offset="5"
                  id="test"
                  onLoad={handleImageLoad}
                  className="group-hover:scale-105 transition-transform animate-in fade-in w-full"
                  style={{
                    display: !loading ? "block" : "none",
                  }}
                />
              </div>
            </Atropos>
          </div>
          <div className="flex flex-col  gap-2 items-center justify-center w-full">
            <div className="flex flex-col  gap-2 items-center">
              <p className="text-xs opacity-50">
                {sticker.tournament_event ?? "Sticker"}
              </p>
              <h1>{sticker.name.split("|")[1]}</h1>

              <Badge
                variant="secondary"
                className="dark:text-slate-200 text-slate-700"
                style={{ backgroundColor: `${sticker.rarity.color}4D` }}
              >
                {sticker.rarity.name}
              </Badge>
            </div>
            {!match && (
              <Button
                className=" max-sm:!p-2"
                variant={"secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleAddToCart();
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            )}
          </div>
        </>
      )}

      {!isDesktop && (
        <>
          <div className="relative flex flex-col items-center sm:order-2 w-full aspect-[4/3]">
            {loading && <Skeleton className="absolute inset-0" />}

            <div
              className="group-hover:visible invisible group-hover:scale-105 transition-transform absolute bg-cover w-full h-full custom-background"
              style={{ backgroundImage: `url(${sticker.image})` }}
              data-atropos-offset="-5"
              data-atropos-opacity="0.1;0.8"
            ></div>
            <img
              crossOrigin="anonymous"
              src={sticker.image}
              alt={sticker.name}
              data-atropos-offset="5"
              id="test"
              onLoad={handleImageLoad}
              className="group-hover:scale-105 transition-transform animate-in fade-in w-full"
              style={{
                display: !loading ? "block" : "none",
              }}
            />
          </div>

          <div className="flex flex-col  gap-2 items-center  ">
            <p className="text-xs opacity-50">
              {sticker.tournament_event ?? "Sticker"}
            </p>
            <h1>{sticker.name.split("|")[1]}</h1>

            <div className="flex flex-col  gap-2 items-center">
              <Badge
                variant="secondary"
                className="dark:text-slate-200 text-slate-700"
                style={{ backgroundColor: `${sticker.rarity.color}4D` }}
              >
                {sticker.rarity.name}
              </Badge>
            </div>
            {!match && (
              <Button
                className=" max-sm:!p-2"
                variant={"secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleAddToCart();
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            )}
          </div>
        </>
      )}

      {match && (
        <Button
          className="order-last"
          variant={"secondary"}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleAddToCart();
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      )}
    </Link>
  );
}

export default StickerCard;
