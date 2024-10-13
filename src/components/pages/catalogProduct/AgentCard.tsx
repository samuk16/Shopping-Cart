import { ShoppingCart } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import { useState } from "react";
import { AgentsType } from "@/lib/types";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  agent: AgentsType;
  handleAddToCart: () => void;
}
function AgentCard({ agent, handleAddToCart }: Props) {
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };

  const match = useMediaQuery("(min-width: 640px)");

  return (
    <Link
      to={`/view/${agent.id}`}
      className="flex sm:flex-col justify-between max-sm:border-x-0 max-sm:border-b-0 max-sm:rounded-none gap-4 items-center border border-input p-4 rounded-sm cursor-pointer group animate-in fade-in dark:hover:border-slate-400 hover:border-slate-800 transition-colors"
    >
      <div className="relative flex flex-col items-center sm:order-2 w-full aspect-[4/3]">
        {loading && <Skeleton className="absolute inset-0 rounded-sm" />}

        <div
          className="group-hover:visible invisible group-hover:scale-105 transition-transform absolute bg-cover w-full h-full custom-background"
          style={{ backgroundImage: `url(${agent.image})` }}
        ></div>
        <img
          crossOrigin="anonymous"
          src={agent.image}
          alt={agent.name}
          id="test"
          onLoad={handleImageLoad}
          className="group-hover:scale-105 transition-transform animate-in fade-in w-full"
          style={{
            display: !loading ? "block" : "none",
            maskImage: "linear-gradient(black 90%, transparent)",
          }}
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs opacity-50">{agent.name.split("|")[1]}</p>
        <h1>{agent.name.split("|")[0]}</h1>

        <div className="flex gap-2 items-center justify-center">
          <Badge
            variant="secondary"
            className="dark:text-slate-200 text-slate-700"
            style={{ backgroundColor: `${agent.rarity.color}4D` }}
          >
            {agent.rarity.name}
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

export default AgentCard;
