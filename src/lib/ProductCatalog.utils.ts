import { NavigateFunction, Location } from "react-router-dom";
import { AgentsType, filtersData, SkinType, StickerType } from "./types";
import { filterWeapons } from "./utils";
function createRadioOptionsItems<T extends { rarity: { name: string } }[]>(
  arr: T,
) {
  {
    return new Set(
      arr
        .map((obj) => obj.rarity?.name)
        .filter((name): name is string => !!name),
    );
  }
}
function createRadioOptionsAll<T extends { rarity: { name: string } }[][]>(
  arr: T,
) {
  return new Set(
    arr.flatMap((subArr) =>
      subArr
        .map((obj) => obj.rarity?.name)
        .filter((name): name is string => !!name),
    ),
  );
}
// test tt
function createRadioOptionsTournament(
  arr: StickerType[][] | StickerType[],
  type: string,
) {
  const tournament = new Set<string>();
  const tournamentTeam = new Set<string>();
  if (type === "item") {
    if (Array.isArray(arr)) {
      arr.map((array) => {
        if (Array.isArray(array)) {
          array.map((obj) => {
            if (obj.tournament_event) {
              tournament.add(obj.tournament_event);
            }
            if (obj.tournament_team) {
              tournamentTeam.add(obj.tournament_team);
            }
          });
        }
      });
    }
  } else {
    arr.map((obj) => {
      if ("tournament_event" in obj) {
        tournament.add(obj.tournament_event ? obj.tournament_event : "Sticker");
      }
      if ("tournament_team" in obj) {
        tournamentTeam.add(
          obj.tournament_team ? obj.tournament_team : "Sticker",
        );
      }
    });
  }

  return { tournament, tournamentTeam };
}
const DOTS = "...";
function generationPaginationRange(
  currentPage: number,
  // totalPages,
  pageRangeDisplayed: number,
  isMobile: boolean = false,
) {
  const pagRange = [DOTS];
  const firstIndex = currentPage - (isMobile ? 2 : 3);

  let pageCount = firstIndex;
  for (let i = 1; i <= pageRangeDisplayed; i++) {
    pageCount++;
    pagRange.push(pageCount.toString());
  }
  pagRange.push(DOTS);
  return pagRange;
}

function generaionPaginationFirstAndLastItems(
  currentPage: number,
  totalPages: number,
  pageRangeDisplayed: number,
) {
  const pagRange = [];

  let pageCount = 0;
  if (currentPage < pageRangeDisplayed && totalPages > pageRangeDisplayed) {

    for (let i = 1; i <= pageRangeDisplayed; i++) {
      pageCount++;
      pagRange.push(pageCount.toString());
    }
    pagRange.push(DOTS);
  } else if (totalPages <= pageRangeDisplayed) {

    for (let i = 1; i <= totalPages; i++) {
      pageCount++;
      pagRange.push(pageCount.toString());
    }
  } else if (currentPage >= totalPages - pageRangeDisplayed) {
    pageCount = totalPages - pageRangeDisplayed;
    pagRange.push(DOTS);

    for (let i = 1; i <= pageRangeDisplayed; i++) {
      pageCount++;
      pagRange.push(pageCount.toString());
    }
  }
  return pagRange;
}

const disableButtonIfLastItem = (
  e: React.MouseEvent<HTMLAnchorElement>,
  pageN: number,
  totalPages: number,
) => {
  if (pageN === totalPages) {
    e.preventDefault();
  }
};
const disableButtonIfFirstItem = (
  e: React.MouseEvent<HTMLAnchorElement>,
  pageN: number,
) => {
  if (pageN === 1) {
    e.preventDefault();
  }
};

function checkSearchParams(
  arr: SkinType[][] | StickerType[][] | AgentsType[][],
  filters: filtersData,
  nameWeapon: string,
  allItems: SkinType[] | StickerType[] | AgentsType[],
  location: Location,
  setCheckboxT: React.Dispatch<React.SetStateAction<filtersData>>,
) {
  const newFilters = { ...filters };
  const searchParams = new URLSearchParams(location.search);
  const filterStr = ["rarity", "tournament", "tournamentTeam", "stattrak"];
  const filterStrArr = filterStr
    .map((item) => searchParams.get(item))
    .filter((name): name is string => name !== null);
  const filterStates = filterStr.map((item) => searchParams.get(item));

  if (!filterStrArr.length) {
    const updatedFilters = updateFilters(newFilters, [
      "rarity",
      "tournament",
      "tournamentTeam",
      "stattrak",
    ]);
    setCheckboxT(updatedFilters);
  }

  if (filterStates[1] || filterStates[2] || filterStates[3]) {
    return createRadioOptionsAll(arr);
  } else if (filterStrArr.length > 1) {
    return createRadioOptionsAll(arr);
  } else if (nameWeapon) {
    return createRadioOptionsItems(
      filterWeapons(allItems as SkinType[], nameWeapon),
    );
  } else {
    return createRadioOptionsItems(allItems);
  }
}

function clearFiltersOfState(
  filters: filtersData,
  searchParams: URLSearchParams,
  setCheckboxT: React.Dispatch<React.SetStateAction<filtersData>>,
) {
  const newFilters = { ...filters };
  if (
    !(
      searchParams.get("rarity") &&
      searchParams.get("tournament") &&
      searchParams.get("tournamentTeam")
    )
  ) {
    const test45 = updateFilters(newFilters, [
      "rarity",
      "tournament",
      "tournamentTeam",
      "stattrak",
    ]);
    setCheckboxT(test45);
  } else if (
    searchParams.get("rarity") &&
    searchParams.get("tournament") &&
    searchParams.get("tournamentTeam")
  ) {
    const test45 = updateFilters(newFilters, [
      "rarity",
      "tournament",
      "tournamentTeam",
      "stattrak",
    ]);
    setCheckboxT(test45);
  }
}

function updateFilters(filters: filtersData, propertiesToUpdate: string[]) {
  let updatedFilters = { ...filters };

  for (const property of propertiesToUpdate) {
    if (Object.prototype.hasOwnProperty.call(updatedFilters, property)) {
      for (const [key] of Object.entries(
        updatedFilters[property as keyof filtersData],
      )) {
        updatedFilters = {
          ...updatedFilters,
          [property]: {
            ...updatedFilters[property as keyof filtersData],
            [key]: false,
          },
        };
      }
    }
  }

  return updatedFilters;
}

const handleCheckboxChange = (
  id: string,
  typeT: "rarity" | "stattrak" | "tournament" | "tournamentTeam",
  filters: filtersData,
  setCheckboxT: React.Dispatch<React.SetStateAction<filtersData>>,
  navigate: NavigateFunction,
  location: Location,
) => {
  const newFilters = {
    ...filters,
    [typeT]: { ...filters[typeT], [id]: !filters[typeT][id] },
  };

  setCheckboxT(newFilters);
  const searchParams = new URLSearchParams(location.search);
  Object.entries(newFilters).forEach(([key, val]) => {
    if (val && typeof val === "object") {
      const activeFilters = Object.entries(val)
        .filter(([, isActive]) => isActive)
        .map(([filterId]) => filterId)
        .join(",");

      if (activeFilters) {
        searchParams.set(key, activeFilters);
      } else {
        searchParams.delete(key);
      }
    } else if (val) {
      searchParams.set(key, val);
    } else {
      searchParams.delete(key);
    }
  });
  searchParams.get("page") ? searchParams.set("page", "1") : null;
  const newSearch = searchParams.toString();
  navigate(`${location.pathname}${newSearch ? `?${newSearch}` : ""}`);
};

const createPageLink = (
  pageNumber: number,
  searchParams: URLSearchParams,
  location: Location,
) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set("page", pageNumber.toString());
  return `${location.pathname}?${newSearchParams.toString()}`;
};

const clearDescription = (descripcion: string): string => {
  const descripcionLimpia = descripcion.replace(/<[^>]*>/g, "");
  return descripcionLimpia.replace(/\\n/g, " ").replace(/\r/g, "");
};

export {
  // createRadioOptions,
  createRadioOptionsTournament,
  generaionPaginationFirstAndLastItems,
  generationPaginationRange,
  disableButtonIfLastItem,
  disableButtonIfFirstItem,
  createRadioOptionsAll,
  createRadioOptionsItems,
  checkSearchParams,
  clearFiltersOfState,
  handleCheckboxChange,
  createPageLink,
  clearDescription,
};
