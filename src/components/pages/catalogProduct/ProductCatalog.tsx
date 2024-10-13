import { addToCart } from "@/lib/utils";
import SkinCard from "@/components/pages/catalogProduct/SkinCard";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "../../ui/dropdown-menu";

import DataContext from "@/lib/dataContext";
import { contextTypes, SkinType, StickerType, AgentsType } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
  useAsyncValue,
  useSearchParams,
  NavigateFunction,
  Location,
} from "react-router-dom";
import { Button } from "../../ui/button";
import { Filter, FilterX } from "lucide-react";
import StickerCard from "@/components/pages/catalogProduct/StickerCard";
import AgentCard from "./AgentCard";
import NoResults from "../../NoResultsError";

import {
  createRadioOptionsTournament,
  createRadioOptionsItems,
  checkSearchParams,
  clearFiltersOfState,
  handleCheckboxChange,
  clearDescription,
} from "@/lib/ProductCatalog.utils";
import { PaginationCatalog } from "./PaginationCatalog";

interface AsyncData {
  items: SkinType[][] | StickerType[][] | AgentsType[][];
  type: string;
  nameWeapon: string;
}
interface filtersData {
  stattrak: { [key: string]: boolean };
  rarity: {
    [key: string]: boolean;
  };
  tournament: {
    [key: string]: boolean;
  };
  tournamentTeam: {
    [key: string]: boolean;
  };
}
// declare function useLocation(): Location;
function ProductCatalog({ items, type, nameWeapon }: AsyncData) {
  const allItems: SkinType[] | StickerType[] = useAsyncValue() as
    | SkinType[]
    | StickerType[];

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageStr = searchParams.get("page");
  const pageNum = pageStr ? parseInt(pageStr) : 1;
  const [checkboxT, setCheckboxT] = useState<filtersData>({
    stattrak: { stattrak: false },
    rarity: Object.fromEntries(
      Array.from(createRadioOptionsItems(allItems)).map((item) => [
        item,
        false,
      ]),
    ),
    tournament: Object.fromEntries(
      Array.from(
        createRadioOptionsTournament(allItems as StickerType[], "all")
          .tournament,
      ).map((item) => [item, false]),
    ),
    tournamentTeam: Object.fromEntries(
      Array.from(
        createRadioOptionsTournament(allItems as StickerType[], "all")
          .tournamentTeam,
      ).map((item) => [item, false]),
    ),
  });
  const { setCartProducts } = useContext(
    DataContext,
  ) as unknown as contextTypes;
  const [radioOptions, setRadioOptions] = useState<Set<string>>();
  const radioOptionsTournament = createRadioOptionsTournament(
    // allItems as StickerType[],
    items as StickerType[][],
    "item",
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const filtersStr = ["rarity", "tournament", "tournamentTeam", "stattrak"];

    let newFilters = { ...checkboxT };

    filtersStr.map((type) => {
      if (searchParams.get(type)) {
        for (const id of searchParams.get(type)?.split(",") || []) {
          newFilters = {
            ...newFilters,
            [type]: {
              ...newFilters[type as keyof filtersData],
              [id]: true,
            },
          };
        }
      }
    });
    setCheckboxT(newFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    clearFiltersOfState(checkboxT, searchParams, setCheckboxT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameWeapon, type]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const filtersStr = ["rarity", "tournament", "tournamentTeam", "stattrak"];

    let newFilters = { ...checkboxT };

    filtersStr.map((type) => {
      if (searchParams.get(type)) {
        for (const id of searchParams.get(type)?.split(",") || []) {
          newFilters = {
            ...newFilters,
            [type]: {
              ...newFilters[type as keyof filtersData],
              [id]: true,
            },
          };
        }
      }
    });

    setCheckboxT(newFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRadioOptions(
      checkSearchParams(
        items,
        checkboxT,
        nameWeapon,
        allItems,
        location,
        setCheckboxT,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const clearFilters = (
    filters: filtersData,
    searchParams: URLSearchParams,
  ) => {
    const filterStr = ["rarity", "tournament", "tournamentTeam", "stattrak"];
    const filterStates = filterStr.map((item) => searchParams.get(item));
    if (filterStates.every((item) => !item)) {
      return;
    } else {
      setSearchParams({});
      clearFiltersOfState(filters, searchParams, setCheckboxT);
    }
  };

  const cleanText = clearDescription(items[0][0].description || "");

  return items.length > 0 ? (
    <>
      <div className="p-3 grid grid-cols-[auto] items-end sm:grid-cols-[auto_auto] grid-rows-[1fr_auto_auto] sm:grid-rows-[1fr_1fr] gap-2 max-w-[800px]">
        <img
          src={items[0][0].image}
          className="sm:row-span-2 justify-self-center"
          style={{
            maskImage: "linear-gradient(black 90%, transparent)",
          }}
        />
        <h2 className="font-bold text-2xl">
          {"weapon" in items[0][0]
            ? items[0][0].weapon.name
            : type === "stickers"
              ? "Stickers"
              : "Agents"}
        </h2>
        <p className="opacity-50 max-sm:text-[13px] max-sm:row-start-3  sm:col-start-2">
          {cleanText}
        </p>
      </div>
      <div className="flex flex-col w-full gap-4 max-w-[1300px] items-center max-sm:pb-4  sm:p-4">
        <div className="flex gap-4 self-end  mb-0 max-sm:mr-4">
          {searchParams.get("rarity") ||
          searchParams.get("stattrak") ||
          searchParams.get("tournament") ||
          searchParams.get("tournamentTeam") ? (
            <Button
              variant={"outline"}
              onClick={() => clearFilters(checkboxT, searchParams)}
              className="animate-in fade-in slide-in-from-top-1"
            >
              <FilterX size={16} className="mr-2" />
              Clear Filters
            </Button>
          ) : null}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size={"icon"}
                disabled={
                  typeof items[0][0] === "object" && "category" in items[0][0]
                    ? items[0][0].category?.name === "Knives"
                    : false
                }
              >
                <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="sm:w-56 w-40">
              <DropdownMenuLabel>Filter</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                {type === "skins" ? (
                  <DropdownMenuCheckboxItem
                    checked={checkboxT.stattrak.stattrak}
                    onCheckedChange={() =>
                      handleCheckboxChange(
                        "stattrak",
                        "stattrak",
                        checkboxT,
                        setCheckboxT,
                        navigate,
                        location,
                      )
                    }
                  >
                    Stattrak
                  </DropdownMenuCheckboxItem>
                ) : null}

                {type === "stickers" && (
                  <div>
                    {Object.keys(radioOptionsTournament).map((key, idx) => (
                      <DropdownMenuSub key={idx}>
                        <DropdownMenuSubTrigger>
                          {key === "tournament"
                            ? "Tournament Events"
                            : "Tournament Teams"}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="max-h-[400px] overflow-y-auto scrollable">
                            {Array.from(
                              radioOptionsTournament[
                                key as keyof typeof radioOptionsTournament
                              ],
                            )
                              .sort()
                              .map((item, idx) => (
                                <DropdownMenuCheckboxItem
                                  key={idx}
                                  checked={
                                    checkboxT[key as keyof typeof checkboxT][
                                      item
                                    ]
                                  }
                                  onCheckedChange={() =>
                                    handleCheckboxChange(
                                      item,
                                      key as keyof typeof checkboxT,
                                      checkboxT,
                                      setCheckboxT,
                                      navigate,
                                      location,
                                    )
                                  }
                                >
                                  {item}
                                </DropdownMenuCheckboxItem>
                              ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    ))}
                  </div>
                )}

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Rarity</DropdownMenuSubTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {radioOptions &&
                        Array.from(radioOptions).map((item, idx) => (
                          <DropdownMenuCheckboxItem
                            key={idx}
                            checked={checkboxT.rarity[item] || false}
                            onCheckedChange={() =>
                              handleCheckboxChange(
                                item,
                                "rarity",
                                checkboxT,
                                setCheckboxT,
                                navigate,
                                location,
                              )
                            }
                          >
                            {item}
                          </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:gap-4">
          {items[pageNum - 1]?.map((item) =>
            type === "skins" ||
            type === "search" ||
            type === "filterQ" ||
            type === "allSkins" ? (
              <SkinCard
                key={item.id}
                item={item as SkinType}
                handleAddToCart={() => addToCart(setCartProducts, item, null)}
              ></SkinCard>
            ) : type === "stickers" ? (
              <StickerCard
                key={item.id}
                handleAddToCart={() => addToCart(setCartProducts, item, null)}
                sticker={item as StickerType}
              />
            ) : type === "agents" ? (
              <AgentCard
                key={item.id}
                handleAddToCart={() => addToCart(setCartProducts, item, null)}
                agent={item as AgentsType}
              />
            ) : null,
          )}
        </div>

        <PaginationCatalog
          pageNum={pageNum}
          items={items}
          location={location}
          searchParams={searchParams}
        />
      </div>
    </>
  ) : (
    <NoResults />
  );
}

export { ProductCatalog };
