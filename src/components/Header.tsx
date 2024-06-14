import { ShoppingCart, Search, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import defaultWeapons from "@/data/DefaultWeapons.json";
import { ListItem } from "./ListItem";

function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between p-5">
      <div className="flex gap-3">
        <Triangle size={32} />
        <h1 className="text-2xl font-bold">Vite UI</h1>

        <NavigationMenu>
          <NavigationMenuList>
            {(defaultWeapons as DefaultWeapons).categories.map((obj, idx) => {
              return (
                <>
                  {obj?.subCategory && (
                    <NavigationMenuItem className="order-2">
                      <NavigationMenuTrigger>
                        {obj.subCategory}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="w-auto">
                        <div
                          className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] p-4 gap-4 w-[500px] min-w-[200px]"
                          key={idx}
                        >
                          {obj?.categories?.map((obj2) => {
                            return (
                              <div className="flex flex-col gap-2">
                                <p className="font-bold">{obj2.name}</p>
                                <Separator />
                                {obj2?.items &&
                                  obj2.items.map((item, idx) => (
                                    <ListItem
                                      url={`/skins/${obj.subCategory}/${obj2.name}/${item.name}`}
                                      title={item.name}
                                      key={`${obj.category}-${idx}`}
                                      imgSrc={item.skinUrl}
                                    ></ListItem>
                                  ))}
                              </div>
                            );
                          })}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )}
                </>
              );
            })}
            {(defaultWeapons as DefaultWeapons).categories.map((obj) => {
              return (
                <>
                  {obj?.category && (
                    <NavigationMenuItem
                      className={
                        obj.category === "Pistols" ? "order-1" : "order-3"
                      }
                    >
                      <NavigationMenuTrigger>
                        {obj.category}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="right:0 absolute left-auto top-full w-auto">
                        <div className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                          {obj.items?.map((item, idx) => {
                            return (
                              <ListItem
                                imgSrc={item.skinUrl}
                                url={`/skins/${obj.category}/${item.name}`}
                                key={`${obj.category}-${idx}`}
                              >
                                {item.name}
                              </ListItem>
                            );
                          })}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )}
                </>
              );
            })}
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

export default Header;
