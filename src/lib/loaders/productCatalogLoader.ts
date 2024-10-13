import { defer, json, LoaderFunctionArgs } from "react-router-dom";

export async function loader3({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchFilter = url.searchParams.get("rarity");
  const searchFilter1 = url.searchParams.get("stattrak");
  const weapon = params.weaponName;

  if (!weapon) {
    return json({ error: "Weapon name is required" }, { status: 400 });
  }

  const data = fetch(
    "https://bymykel.github.io/CSGO-API/api/en/skins.json",
  ).then((res) => res.json());

  return defer({
    data: data,
    type: "skins",
    weapon: weapon,
    queryFilter: searchFilter,
    filters: [
      { name: "rarity", value: searchFilter, key: "rarity.name" },
      { name: "stattrak", value: searchFilter1, key: "stattrak" },
    ],
  });
}

export async function loaderSearch({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const data = fetch(
    "https://bymykel.github.io/CSGO-API/api/en/skins.json",
  ).then((res) => res.json());

  return defer({ data, q, type: "search" });
}

export async function allSkinsLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchFilter = url.searchParams.get("rarity");
  const searchFilter1 = url.searchParams.get("stattrak");
  const data = fetch(
    "https://bymykel.github.io/CSGO-API/api/en/skins.json",
  ).then((res) => res.json());

  // return weapon;
  return defer({
    data: data,
    type: "skins",
    filters: [
      { name: "rarity", value: searchFilter, key: "rarity.name" },
      { name: "stattrak", value: searchFilter1, key: "stattrak" },
    ],
  });
}

export async function otherLoader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const test455 = params.itemName?.toLocaleLowerCase();

  const searchFilter = url.searchParams.get("rarity");
  const searchFilter1 = url.searchParams.get("tournament");
  const searchFilter2 = url.searchParams.get("tournamentTeam");
  const searchFilter3 = url.searchParams.get("stattrak");

  const data = fetch(
    `https://bymykel.github.io/CSGO-API/api/en/${test455}.json`,
  ).then((res) => res.json());

  return defer({
    data: data,
    type: test455,
    queryFilter: searchFilter,
    url: url,
    filters: [
      { name: "rarity", value: searchFilter, key: "rarity.name" },
      {
        name: "tournament_event",
        value: searchFilter1,
        key: "tournament_event",
      },
      { name: "tournament_team", value: searchFilter2, key: "tournament_team" },
      { name: "stattrak", value: searchFilter3, key: "stattrak" },
    ],
  });
}
