import { defer } from "react-router-dom";

export async function loader() {
  const data = fetch(
    "https://bymykel.github.io/CSGO-API/api/en/skins.json",
  ).then((res) => res.json());

  return defer({
    data: data,
  });
}
