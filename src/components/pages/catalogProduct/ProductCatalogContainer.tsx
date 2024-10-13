import { Await, useLoaderData } from "react-router-dom";
import { ProductCatalog } from "./ProductCatalog";
import { SkinType, StickerType } from "@/lib/types";
import { Suspense } from "react";
import FallbackTest from "./FallbackProductCatalog";
import { chunkArray, filterWeapons, filterAndChunk } from "@/lib/utils";
import { matchSorter } from "match-sorter";
import NoResults from "../../NoResultsError";
interface LoaderData {
  // data:items
  data: SkinType[] | StickerType[];
  type: string;
  weapon: string;
  queryFilter: string;
  filters?: { name: string; value: string; key: string }[];
  q: string;
}

function ProductCatalogContainer() {
  const { data, type, weapon, filters, q } = useLoaderData() as LoaderData;
  return (
    <div className="flex flex-col gap-4 items-center max-w-dvw overflow-hidden">
      <Suspense fallback={<FallbackTest />}>
        <Await resolve={data} errorElement={<NoResults />}>
          {(resolvedData) => {
            const items = filterItems(resolvedData, type, weapon, filters, q);

            return (
              <ProductCatalog items={items} type={type} nameWeapon={weapon} />
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

function filterItems(
  arr: SkinType[] | StickerType[],
  type: string,
  nameWeapon: string,
  filters?: { name: string; value: string; key: string }[],
  q?: string,
) {
  if (type === "skins") {
    let arrTemp: SkinType[] | null = null;
    filters?.map((obj) => {
      if (obj.value) {
        const stoToArr = obj.value.split(",");
        stoToArr.map((str) => {
          const arrTemp2 = matchSorter(
            arrTemp
              ? arrTemp
              : nameWeapon
                ? filterWeapons(arr as SkinType[], nameWeapon)
                : (arr as SkinType[]),
            str === "stattrak" ? "true" : (str as string),
            {
              keys: [obj.key],
            },
          );
          return stoToArr.length >= 2
            ? arrTemp
              ? arrTemp.push(...arrTemp2)
              : (arrTemp = arrTemp2)
            : (arrTemp = arrTemp2);
        });
      }
    });

    if (arrTemp) {
      return chunkArray(arrTemp as SkinType[], 16);
    }

    if (nameWeapon) {
      return filterAndChunk(arr as SkinType[], nameWeapon);
    }
    return chunkArray(arr as SkinType[], 16);
  } else if (type === "search") {
    if (q) {
      const skinsFiltered = matchSorter(arr as SkinType[], q, {
        keys: ["name"],
      });
      return chunkArray(skinsFiltered as SkinType[], 16);
    } else {
      return chunkArray(arr as SkinType[], 16);
    }
  } else if (type !== "skins") {
    let arrTemp: StickerType[] | null = null;
    filters?.map((obj) => {
      if (obj.value) {
        const stoToArr = obj.value.split(",");
        stoToArr.map((str) => {
          const arrTemp2 = matchSorter(
            stoToArr.length >= 2
              ? (arr as StickerType[])
              : arrTemp
                ? arrTemp
                : (arr as StickerType[]),
            str as string,
            {
              keys: [obj.key],
            },
          );
          return stoToArr.length >= 2
            ? arrTemp
              ? arrTemp.push(...arrTemp2)
              : (arrTemp = arrTemp2)
            : (arrTemp = arrTemp2);
        });
      }
    });

    if (arrTemp === null) {
      arrTemp = arr as StickerType[];
    }

    return chunkArray(arrTemp, 16);
  } else {
    return chunkArray(arr as SkinType[], 16);
  }
}

export default ProductCatalogContainer;
