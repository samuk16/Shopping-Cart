import { Dispatch, SetStateAction } from "react";

export interface CartCardProps {
  id: string;
  // data: { title: string; subTitle: string; nameFull: string };
  data: { title: string; subTitle: string; hashName: string };
  imgUrl: string;
  price: string;
  quantity: number;
}

export interface SkinType {
  category: { id: string; name: string };
  collections?: { id: string; image: string; name: string }[];
  crates?: { id: string; image: string; name: string }[];
  description?: string;
  id: string;
  image: string;
  max_float?: number;
  min_float?: number;
  name: string;
  paint_index?: string;
  pattern: { id: string; name: string };
  phase?: string;
  rarity: { color: string; id: string; name: string };
  souvenir?: boolean;
  stattrak?: boolean;
  team?: { id: string; name: string };
  weapon: { id: string; name: string };
  wears?: { id: string; name: string }[];
}
export interface StickerType {
  crates: { id: string; image: string; name: string }[];
  description: string;
  effect: string;
  id: string;
  image: string;
  market_hash_name: string | null;
  name: string;
  rarity: { id: string; color: string; name: string };
  tournament_event?: string;
  tournament_team?: string;
  type: string;
}

export interface AgentsType {
  id: string;
  name: string;
  description: string;
  rarity: { id: string; name: string; color: string };
  collections: { id: string; name: string; image: string }[];
  team: {
    id: string;
    name: string;
  };
  market_hash_name: string;
  image: string;
}

export interface CollectionsType {
  id: string;
  name: string;
  crates: {
    id: string;
    name: string;
    image: string;
  }[];
  contains: {
    id: string;
    name: string;
    rarity: { id: string; color: string; name: string };
    paint_index: string;
    image: string;
  }[];
  image: string;
}

export interface PriceObj {
  success?: boolean;
  lowest_price: string;
  volume?: string;
  median_price: string;
}

export interface setCartProductsType2 {
  name: string;
  skinUrl: string;
}
export interface contextTypes {
  response: SkinType[];
  loading: boolean;
  setCartProducts: Dispatch<SetStateAction<Map<string, ObjCart>>>;
}

export interface inspectLinkCSType {
  asset: {
    amount: string;
    appid: number;
    contextid: string;
    currency: number;
    id: string;
    market_actions: { link: string; name: string }[];
  };
  converted_currencyid: number;
  converted_fee: number;
  converted_fee_per_unit: number;
  converted_price: number;
  converted_price_per_unit: number;
  converted_publisher_fee: number;
  converted_publisher_fee_per_unit: number;
  converted_steam_fee: number;
  converted_steam_fee_per_unit: number;
  currencyid: number;
  fee: number;
  listingid: string;
  price: number;
  publisher_fee: number;
  publisher_fee_app: number;
  publisher_fee_percent: string;
  steam_fee: number;
}

export type setCartProductsType = Dispatch<
  SetStateAction<Map<string, ObjCart>>
>;

export interface ObjCart {
  id: string;
  data: {
    title: string;
    subTitle: string;
    hashName: string;
  };
  imgUrl: string;
  price: string;
  quantity: number;
}

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type ImageWithColor = {
  url: string;
  needsProcessing: boolean;
  dominantColor?: RGB;
};

export interface filtersData {
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
  // [key: string]: any;
}
