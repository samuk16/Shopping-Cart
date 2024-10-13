import { LoaderFunctionArgs } from "react-router-dom";
import { filterWeaponId } from "../utils";
export async function loader({ params }: LoaderFunctionArgs) {
  const weaponId = params.weaponId;
  const type = `${params.weaponId?.split("-")[0]}s`;
  const data = fetch(
    `https://bymykel.github.io/CSGO-API/api/en/${type}.json`,
  ).then((res) => res.json());

  const item = filterWeaponId(await data, weaponId as string);

  return { weaponId: weaponId, data: item, type: type };
}
