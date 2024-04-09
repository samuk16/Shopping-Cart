import { ShoppingCart, Search, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { cn } from "@/lib/utils";

function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between p-5">
      <div className="flex gap-3">
        <Triangle size={32} />
        <h1 className="text-2xl font-bold">Vite UI</h1>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Pistols</NavigationMenuTrigger>
              <NavigationMenuContent className="right:0 absolute left-auto top-full w-auto">
                <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
                    <ListItem href="/pistols/usp" key={item}>
                      Usp
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Mid-tier</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
                  <div>
                    <p className="font-bold">SMG</p>
                    <Separator />
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                      <ListItem
                        href="/pistols/usp"
                        title="Usp"
                        key={item}
                      ></ListItem>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold">SHOTGUNS</p>
                    <Separator />
                    {[1, 2, 3, 4].map((item) => (
                      <ListItem href="/pistols/usp" title="Usp" key={item}>
                        Usp
                      </ListItem>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold">MACHINE GUNS</p>
                    <Separator />
                    {[1, 2].map((item) => (
                      <ListItem href="/pistols/usp" title="Usp" key={item}>
                        Usp
                      </ListItem>
                    ))}
                  </div>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Rifles</NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]"> */}
                <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                  <div>
                    <p className="font-bold">ASSAULT RIFLES</p>
                    <Separator />
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                      <ListItem href="/pistols/usp" title="Usp" key={item}>
                        Usp
                      </ListItem>
                    ))}
                  </div>
                  {/* <Separator orientation="vertical" decorative /> */}
                  <div>
                    <p className="font-bold">SNIPER RIFLES</p>
                    <Separator />
                    {[1, 2, 3, 4].map((item) => (
                      <ListItem href="/pistols/usp" title="Usp" key={item}>
                        Usp
                      </ListItem>
                    ))}
                  </div>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Knives</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20,
                  ].map((item) => (
                    <ListItem href="/pistols/usp" title="Usp" key={item}>
                      Usp
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Gloves</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-3 p-4 md:w-[200px] lg:w-[250px] ">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <ListItem href="/pistols/usp" title="Usp" key={item}>
                      Usp
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex gap-3">
        <div className="relative">
          <Search
            size={16}
            color="#64748b"
            className="absolute left-2 top-2.5 h-4 w-4"
          />
          <Input
            placeholder="Search"
            className="w-96 pl-8 h-9 text-sm"
            type="search"
          />
        </div>
        <Button variant="outline" size="icon">
          <ShoppingCart size={16} />
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}
const imgtest =
  "https://cdn.csgoskins.gg/public/uih/weapons/aHR0cHM6Ly9jZG4uY3Nnb3NraW5zLmdnL3B1YmxpYy9pbWFnZXMvYnVja2V0cy9lY29uL3dlYXBvbnMvYmFzZV93ZWFwb25zL3dlYXBvbl9jejc1YS5mY2NlZGI5OTJhODZjYzM0MTUwNDZjMzAzZDRlYTU2NjEwM2Q4ZDYyLnBuZw--/50/auto/85/notrim/181ec9fe16f282b3dc1ce3f7757656a9.webp";
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <img src={imgtest} alt="skinAk47" />
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
export default Header;
