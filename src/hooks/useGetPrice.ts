import { toast } from "@/hooks/use-toast";
import { PriceObj } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useGetPrice(
  marketName: string,
  wear: string = "Factory New",
) {
  const [price, setPrice] = useState<PriceObj | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const url: string = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://steamcommunity.com/market/priceoverview/?country=DE&currency=1&appid=730&market_hash_name=${marketName}${wear === "" ? "" : "%20%28" + wear + "%29"}`)}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("The request could not be completed");
        const data = await response.json();
        const contents = JSON.parse(data.contents);

        setPrice(contents);
        contents.volume ? "" : setLoadingPrice(true);
        contents
          ? contents.lowest_price
            ? ""
            : contents.median_price
              ? ""
              : toast({
                  open: true,
                  title: "Error",
                  description: "Price not found on steam marketplace",
                  variant: "destructive",
                })
          : "";
      } catch (error) {
        setLoadingPrice(true);
        console.error(error);
        throw error;
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { price, loadingPrice };
}
