import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, unstable_useViewTransitionState } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

import { useMediaQuery } from "@mantine/hooks";

import { useImageColor } from "@/hooks/useImageColor";
import { SkinType } from "@/lib/types";

type SkinCardProps = {
  item: SkinType;
  handleAddToCart: () => void;
};

function SkinCard({ item, handleAddToCart }: SkinCardProps) {
  const [loading, setLoading] = useState(true);

  const { dominantColor } = useImageColor(item.image);
  const handleImageLoad = () => {
    setLoading(false);
  };
  const isTransitioning = unstable_useViewTransitionState(`/view/${item.id}`);

  const match = useMediaQuery("(min-width: 640px)");
  return (
    <Link
      to={`/view/${item.id}`}
      unstable_viewTransition
      className="sm:flex-col flex gap-4 items-center sm:justify-between max-sm:border-x-0 max-sm:border-b-0 max-sm:rounded-none border  p-4 rounded-sm cursor-pointer group animate-in fade-in dark:hover:border-slate-400 hover:border-slate-800 transition-colors"
    >
      <div className="relative sm:order-2 sm:max-w-[300px] max-w-[140px] w-full aspect-[4/3]">
        {loading && <Skeleton className="absolute inset-0" />}

        <div
          className="group-hover:visible invisible group-hover:scale-105 transition-transform absolute bg-cover w-full h-full custom-background"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <img
          crossOrigin="anonymous"
          src={item.image}
          alt={item.name}
          id="test"
          onLoad={handleImageLoad}
          className="group-hover:scale-105 transition-transform animate-in fade-in w-full "
          style={{
            display: !loading ? "block" : "none",
            viewTransitionName: isTransitioning ? "image-expand" : "",
          }}
        />
      </div>
      <div className="flex w-full gap-2 flex-wrap sm:flex-col">
        <div className="flex-1 min-w-[150px] grid grid-cols-2 gap-2 grid-rows-[auto_auto_1fr] sm:flex sm:flex-col sm:gap-1 sm:items-center">
          <p className="text-xs opacity-50">{item.weapon.name}</p>
          <div className="flex gap-2 col-span-2">
            <h1 className="line-height-[100%]">
              {item.pattern ? item.pattern.name : "Vanilla"}
            </h1>

            {item.phase && (
              <Badge
                variant="secondary"
                style={{
                  backgroundColor: dominantColor
                    ? `rgba(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b},0.6)`
                    : "transparent",
                }}
              >
                {item.phase}
              </Badge>
            )}
          </div>

          <Badge
            variant="secondary"
            className="dark:text-slate-200 text-slate-700"
            style={{ backgroundColor: `${item.rarity.color}4D` }}
          >
            {item.rarity.name}
          </Badge>
          {item.stattrak ? (
            <Badge variant="secondary" className="bg-[#f8940680]">
              Stattrak Available
            </Badge>
          ) : (
            ""
          )}
        </div>
        {!match && (
          <Button
            className="max-sm:self-end max-sm:ml-auto max-sm:!p-2"
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
    // </div>
  );
}

export default SkinCard;
