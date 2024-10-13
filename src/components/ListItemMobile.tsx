import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { ComponentPropsWithoutRef, useState } from "react";
import React from "react";
interface Props extends ComponentPropsWithoutRef<"a"> {
  imgSrc: string;
  url: string;
}
const ListItemMobile = React.forwardRef<React.ElementRef<"a">, Props>(
  ({ className, title, children, imgSrc, url, ...props }, ref) => {
    const [test, setTest] = useState(false);
    const handleImageLoad = () => {
      setTest(true);
    };
    return (
      <Link
        to={url}
        ref={ref}
        className={cn(
          "flex gap-3 items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className,
        )}
        {...props}
      >
        <div>
          {!test && <Skeleton className="w-[50px] h-[38px]" />}
          <img
            src={imgSrc}
            alt={title}
            width={50}
            height={38}
            onLoad={handleImageLoad}
            style={{ display: test ? "block" : "none" }}
            className="animate-in fade-in"
          />
        </div>
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="">{children}</p>
      </Link>
    );
  },
);

export { ListItemMobile };
