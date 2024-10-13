import { Link, useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DataContext from "@/lib/dataContext";
import { Button } from "../../ui/button";
import {
  LoaderCircle,
  ShoppingCart,
  SquareArrowOutUpRight,
} from "lucide-react";
import { inspectLinkCS, addToCart } from "@/lib/utils";
import { SkinType, contextTypes, inspectLinkCSType } from "@/lib/types";
import { useToast } from "../../../hooks/use-toast";
import { Skeleton } from "../../ui/skeleton";
import { SteamToolTip } from "../../ui/SteamToolTip";
import useGetPrice from "@/hooks/useGetPrice";

interface loaderData {
  data: SkinType[];
}
function SkinDetails() {
  const { data } = useLoaderData() as loaderData;

  const { setCartProducts } = useContext(
    DataContext,
  ) as unknown as contextTypes;

  const weapon = data;

  const [assetId, setAssetId] = useState<string | null>(null);
  const [listingId, setListingId] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [loadingInspectLink, setLoadingInspectLink] = useState<boolean>(false);

  const { price, loadingPrice } = useGetPrice(
    weapon[0].name,
    weapon[0].wears ? weapon[0].wears[0].name : "",
  );

  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await inspectLinkCS(
          weapon[0].name,
          weapon[0].wears ? weapon[0].wears[0].name : "",
        );
        const listinginfo: inspectLinkCSType[] = Object.values(
          result.listinginfo,
        );

        setAssetId(listinginfo[0].asset.id);
        setListingId(listinginfo[0].listingid);
        setUrl(listinginfo[0].asset.market_actions[0].link || "");
      } catch (error) {
        toast({
          title: "Error",
          description: "Inspect link not found in steam marketplace",
          variant: "destructive",
        });
        setLoadingInspectLink(true);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const testReplace = url
    ? url.replace("%listingid%", listingId as string)
    : "";
  const testReplace2 = testReplace.replace("%assetid%", assetId as string);

  const nameSkin = weapon[0].name.toLowerCase();

  const lettersOnly = nameSkin.replace(/[^a-zA-Z0-9\s-]/g, "");
  const hyphenated = lettersOnly.trim().replace(/\s+/g, "-");
  const cleanedNameSkin = hyphenated.replace(/-+/g, "-");
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!testReplace2) {
      event.preventDefault();
    }
  };

  function handleAddCart() {
    addToCart(setCartProducts, weapon[0], price);
  }

  const [loading, setLoading] = useState(false);
  const handleImageLoad = () => {
    setLoading(true);
  };
  return (
    <div className="sm:p-4 sm:flex sm:justify-center">
      <div className="p-4 border w-full border-slate-400 dark:border-slate-800 rounded-sm md:w-[1000px] lg:w-[1280px] flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl text-center">{weapon[0].name}</h1>
          {weapon && weapon[0].name ? (
            <div className="flex max-sm:flex-col gap-4">
              <div className="w-full border border-slate-400 dark:border-slate-800 rounded-sm flex flex-col items-center justify-between p-4 gap-4 sm:min-h-[470px]">
                <div className="relative">
                  {!loading && <Skeleton className="w-full h-full" />}

                  <img
                    crossOrigin="anonymous"
                    src={weapon[0].image}
                    alt={weapon[0].name}
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
                    to={`https://steamcommunity.com/market/listings/730/${weapon[0].name}%20%28Factory%20New%29`}
                  >
                    <Button variant={"outline"} className="w-full">
                      On Steam
                      <SquareArrowOutUpRight
                        className="ml-2 h-4 w-4"
                        size={16}
                      />
                    </Button>
                  </Link>
                  <Link
                    target="_blank"
                    to={`https://3d.cs.money/${cleanedNameSkin}-fn`}
                  >
                    <Button variant={"outline"} className="w-full">
                      3d view
                      <SquareArrowOutUpRight
                        className="ml-2 h-4 w-4"
                        size={16}
                      />
                    </Button>
                  </Link>
                  <Link target="_blank" to={testReplace2} onClick={handleClick}>
                    <Button
                      variant={"outline"}
                      className="w-full"
                      disabled={!testReplace2}
                    >
                      {testReplace2 ? (
                        <>
                          <p>In Game</p>
                          <SquareArrowOutUpRight
                            className="ml-2 h-4 w-4"
                            size={16}
                          />
                        </>
                      ) : loadingInspectLink ? (
                        "Not Found"
                      ) : (
                        <>
                          <p>In Game</p>
                          <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className=" flex flex-col items-center justify-between gap-5 border border-slate-400 dark:border-slate-800 rounded-sm p-4 w-full">
                <div className="flex w-full justify-end">
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
                Category
                <p className="text-black dark:text-white">Skin</p>
              </div>
              <div className="flex justify-between p-2 border border-slate-400 dark:border-slate-800 rounded-sm text-black dark:text-slate-400">
                Type
                <p className="text-black dark:text-white">
                  {weapon[0].category.name}
                </p>
              </div>
              <div className="flex justify-between p-2 border border-slate-400 dark:border-slate-800 rounded-sm text-black dark:text-slate-400">
                Weapon
                <p className="text-black dark:text-white">
                  {weapon[0].weapon.name}
                </p>
              </div>
              <div className="flex justify-between p-2 border border-slate-400 dark:border-slate-800 rounded-sm text-black dark:text-slate-400 ">
                Finish
                <p className="text-black dark:text-white">
                  {weapon[0].pattern ? weapon[0].pattern.name : "Vanilla"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl">Item Class</h1>
          <div className="flex justify-center">
            <div className="flex min-w-96">
              <div className="p-2 w-full text-center">
                {weapon[0].rarity?.name || ""}
                <div
                  className={`rounded w-auto h-2`}
                  style={{ backgroundColor: weapon[0].rarity?.color }}
                ></div>
              </div>
              {weapon[0].stattrak ? (
                <div className="p-2 w-full text-center">
                  Stattrak
                  <div className="bg-[#f89406] rounded w-auto h-2"></div>
                </div>
              ) : (
                <div className="p-2 w-full text-center">
                  Normal
                  <div className="bg-[#9ca3af] rounded w-auto h-2"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        {weapon[0].crates && weapon[0].crates[0] ? (
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl">Containers</h1>
            <div className="flex flex-col items-center">
              <img
                src={weapon[0].crates[0].image}
                alt={weapon[0].crates[0].name}
                className="max-w-[300px]"
              />
              <p>{weapon[0].crates[0].name}</p>
            </div>
          </div>
        ) : (
          ""
        )}

        {weapon[0].collections && weapon[0].collections[0] ? (
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl">Collections</h1>
            <div className="flex flex-col items-center">
              <img
                src={weapon[0].collections[0].image}
                alt={weapon[0].collections[0].name}
                className="max-w-[300px]"
              />
              <p>{weapon[0].collections[0].name}</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SkinDetails;
