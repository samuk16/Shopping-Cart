import { useLoaderData } from "react-router-dom";
import { StickerView } from "./StickerView";
import SkinDetails from "./SkinDetails";
import { AgentsType, SkinType, StickerType } from "@/lib/types";
import { AgentView } from "./AgentView";
interface loaderData {
  data: SkinType[] | StickerType[] | AgentsType[];
  type: string;
}
function ItemDeatils() {
  const { data, type } = useLoaderData() as loaderData;

  const renderItemDetails = () => {
    switch (type) {
      case "stickers":
        return <StickerView item={data[0] as StickerType} />;
      case "skins":
        return <SkinDetails />;
      case "agents":
        return <AgentView item={data[0] as AgentsType} />;
    }
  };

  return <>{renderItemDetails()}</>;
}

export { ItemDeatils };
