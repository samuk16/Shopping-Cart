import { defer } from "react-router-dom";

export async function loader() {
  const proxyUrl = "https://corsproxy.io/?";
  const targetUrl = "https://bymykel.github.io/CSGO-API/api/en/skins.json";
  const data =  fetch(
    `${proxyUrl}${encodeURIComponent(targetUrl)}`,
  ).then((res) => res.json());

  return defer({
    data: data,
  });
}
