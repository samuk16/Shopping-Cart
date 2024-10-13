import { contextTypes, StickerType } from "@/lib/types";
import { Skeleton } from "../../ui/skeleton";
import {
  SquareArrowOutUpRight,
  LoaderCircle,
  ShoppingCart,
} from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { addToCart } from "@/lib/utils";
// import { useToast } from "./ui/use-toast";
import DataContext from "@/lib/dataContext";
import { SteamToolTip } from "../../ui/SteamToolTip";
import useGetPrice from "@/hooks/useGetPrice";

interface StickerProps {
  item: StickerType;
}
function StickerView({ item }: StickerProps) {
  const [loading, setLoading] = useState(true);

  const { setCartProducts } = useContext(
    DataContext,
  ) as unknown as contextTypes;

  const { price, loadingPrice } = useGetPrice(
    item.market_hash_name ? item.market_hash_name : "",
    "",
  );

  const handleImageLoad = () => {
    setLoading(true);
  };

  function handleAddCart() {
    addToCart(setCartProducts, item, price);
  }
  return (
    <div className="sm:p-4 sm:flex sm:justify-center">
      <div className="p-4 border border-slate-400 dark:border-slate-800 rounded-sm md:w-[1000px] lg:w-[1280px] flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl text-center">{item.name}</h1>
          {item && item.name ? (
            <div className="flex gap-4 max-sm:flex-col">
              <div className="w-full border border-slate-400 dark:border-slate-800 rounded-sm flex flex-col items-center  p-4 gap-4 sm:min-h-[470px]">
                <div className="relative grow flex items-center">
                  {!loading && <Skeleton className="w-full h-full" />}

                  <img
                    crossOrigin="anonymous"
                    src={item.image}
                    alt={item.name}
                    id="test"
                    onLoad={handleImageLoad}
                    className="group-hover:scale-105 transition-transform animate-in fade-in zoom-in"
                    style={{
                      display: loading ? "block" : "none",
                    }}
                  />
                </div>

                <div className="flex gap-1">
                  <Link
                    target="_blank"
                    to={`https://steamcommunity.com/market/listings/730/${item.market_hash_name}%20`}
                  >
                    <Button variant={"outline"} className="w-full">
                      On Steam
                      <SquareArrowOutUpRight
                        className="ml-2 h-4 w-4"
                        size={16}
                      />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className=" flex flex-col items-center justify-between gap-5 border border-slate-400 dark:border-slate-800 rounded-sm p-4 w-full">
                <div className="flex justify-end w-full">
                  <SteamToolTip />
                </div>

                <div className="flex flex-1 flex-col items-center justify-center">
                  <h2 className="text-4xl">
                    {price?.median_price ? (
                      price.median_price
                    ) : price?.lowest_price ? (
                      price.lowest_price
                    ) : loadingPrice ? (
                      "Not Found"
                    ) : (
                      <LoaderCircle className="h-8 w-8 animate-spin" />
                    )}
                  </h2>
                </div>

                <Button
                  variant={"secondary"}
                  className="w-full"
                  onClick={handleAddCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>
              </div>
            </div>
          ) : (
            "Not Found"
          )}
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl">Summary</h1>
          <div className="flex justify-center">
            <div className="flex flex-col gap-2 w-[500px]">
              <div className="flex justify-between p-2 border border-slate-400 dark:border-slate-800 rounded-sm text-black dark:text-slate-400">
                Type
                <p className="text-black dark:text-white">{item.type}</p>
              </div>
              {item.tournament_event ? (
                <div className="flex justify-between p-2 border border-slate-400 dark:border-slate-800 rounded-sm text-black dark:text-slate-400">
                  Tournament Event
                  <p className="text-black dark:text-white">
                    {item.tournament_event}
                  </p>
                </div>
              ) : null}
              {item.tournament_team ? (
                <div className="flex justify-between p-2 border border-slate-400 dark:border-slate-800 rounded-sm text-black dark:text-slate-400">
                  Tournament Team
                  <p className="text-black dark:text-white">
                    {item.tournament_team}
                  </p>
                </div>
              ) : null}
              {item.effect ? (
                <div className="flex justify-between p-2 border border-slate-400 dark:border-slate-800 rounded-sm text-black dark:text-slate-400">
                  Effect
                  <p className="text-black dark:text-white">{item.effect}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl">Item Class</h1>
          <div className="flex justify-center">
            <div className="flex min-w-96">
              <div className="p-2 w-full text-center">
                {item.rarity?.name || ""}
                <div
                  className={`rounded w-auto h-2`}
                  style={{ backgroundColor: item.rarity?.color }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { StickerView };
