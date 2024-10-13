import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function SteamToolTip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/120px-Steam_icon_logo.svg.png?20220611141426"
            alt="logo steam"
            width={24}
            className="grayscale hover:grayscale-0 transition-all"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Price obtained from Steam</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { SteamToolTip };
