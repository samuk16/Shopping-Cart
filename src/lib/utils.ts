import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { matchSorter } from "match-sorter";
import { AgentsType, ObjCart, PriceObj, SkinType, StickerType } from "./types";

import { Dispatch, SetStateAction } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

async function inspectLinkCS(nameSkin: string, wear: string = "Factory New") {
  const url: string = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://steamcommunity.com/market/listings/730/${nameSkin}%20%28${wear}%29/render?start=0&count=2&currency=1&language=english&format=json`)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("La solicitud no pudo completarse");
    const data = await response.json();
    const contents = JSON.parse(data.contents);
    return contents;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// %20%28Factory%20New%29
async function getSkinPrice(nameSkin: string, wear: string = "Factory New") {
  const url: string = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://steamcommunity.com/market/priceoverview/?country=DE&currency=1&appid=730&market_hash_name=${nameSkin}${wear === "" ? "" : "%20%28" + wear + "%29"}`)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("La solicitud no pudo completarse");
    const data = await response.json();
    const contents = JSON.parse(data.contents);
    return contents;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function shuffleArr(arr: SkinType[]) {
  if (!arr?.length) {
    return [];
  }
  const shuffled = arr.sort(function () {
    return 0.5 - Math.random();
  });
  return shuffled;
}

const getXElements = (
  arrShuffled: SkinType[],
  numItems: number,
): SkinType[] => {
  const selected = arrShuffled?.slice(0, numItems);
  return selected;
};

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  // const typeDef = array[0].id?.split("-")[0];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);

    chunks.push(chunk);
  }
  return chunks;
}

function filterWeapons(arr: SkinType[], weaponName: string) {
  const result = arr.filter((obj) => obj.weapon.name === weaponName);
  // const chunked = chunkArray(result, 16);
  return result;
}

function filterAndChunk(arr: SkinType[], weaponName: string) {
  const result = arr.filter((obj) => obj.weapon.name === weaponName);
  const chunked = chunkArray(result, 16);
  return chunked;
}
function filterWeaponId(
  arr: SkinType[] | StickerType[] | AgentsType[],
  weaponId: string,
) {
  const result = arr.filter((obj) => obj.id === weaponId);
  return result;
}

function createObjItem2<
  T extends {
    id: string;
    image: string;
    pattern?: { name: string };
    tournament_event?: string;
    name: string;
    weapon?: { name: string };
    market_hash_name?: string;
  },
>(item: T, price: PriceObj | null): ObjCart {
  return {
    id: item.id,
    data: getItemData(item),
    imgUrl: item.image,
    price:
      price === null
        ? "0"
        : price?.median_price
          ? price?.median_price
          : price?.lowest_price,
    quantity: 1,
  };
}

function getItemData<
  T extends {
    id: string;
    pattern?: { name: string };
    tournament_event?: string;
    name: string;
    weapon?: { name: string };
    market_hash_name?: string;
  },
>(
  item: T,
): {
  title: string;
  subTitle: string;
  hashName: string;
} {
  return {
    title: item.weapon?.name
      ? item.weapon.name
      : item.tournament_event
        ? item.tournament_event
        : item.id.split("-")[0] === "agent"
          ? item.name.split("|")[1]
          : "Sticker",
    subTitle: item.pattern?.name
      ? item.pattern?.name
      : item.id.split("-")[0] === "agent"
        ? item.name.split("|")[0]
        : item.name.split("|")[1] ?? "Vanilla",
    hashName: item.name ?? "Vanilla",
  };
}

function addToCart(
  setCartProducts: Dispatch<SetStateAction<Map<string, ObjCart>>>,
  weapon: SkinType | StickerType | AgentsType,
  price: PriceObj | null,
) {
  const quantity = 1;

  const product = createObjItem2(
    {
      ...weapon,
      market_hash_name:
        "market_hash_name" in weapon ? weapon.market_hash_name ?? "" : "",
    },
    price,
  );

  setCartProducts((prevCart) => {
    const newCart = new Map(prevCart);
    const existingProduct = newCart.get(product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
      newCart.set(product.id, existingProduct);
    } else {
      newCart.set(product.id, { ...product, quantity });
    }

    return newCart;
  });
}

function getSkins(query: string, array: SkinType[]) {
  let arrSkins = array;
  if (!arrSkins) arrSkins = [];
  if (query) {
    arrSkins = matchSorter(arrSkins, query, {
      keys: ["name"],
    });
  } else {
    arrSkins = [];
  }
  return arrSkins;
}

function isGray([r, g, b]: number[]): boolean {
  const threshold = 40;
  return (
    Math.abs(r - g) < threshold &&
    Math.abs(g - b) < threshold &&
    Math.abs(b - r) < threshold
  );
}

export {
  shuffleArr,
  getXElements,
  chunkArray,
  filterWeapons,
  filterWeaponId,
  inspectLinkCS,
  getSkinPrice,
  addToCart,
  getSkins,
  // getPalette,
  isGray,
  filterAndChunk,
};
