import { Menu, Search, Triangle, X } from "lucide-react";
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
import { DrawerCart } from "./cart";

import { ListItem } from "./ListItem";
import {
  Form,
  Link,
  useNavigate,
  unstable_useViewTransitionState,
  useSearchParams,
} from "react-router-dom";
import { CartCardProps, ObjCart } from "@/lib/types";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer2";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ListItemMobile } from "./ListItemMobile";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Dispatch, SetStateAction } from "react";
interface HeaderProps {
  cartProducts: Map<string, CartCardProps>;
  setCartProducts: Dispatch<SetStateAction<Map<string, ObjCart>>>;
}
function Header({ cartProducts, setCartProducts }: HeaderProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isTransitioning = unstable_useViewTransitionState("/");

  const [drawerOpen, { open, close }] = useDisclosure(false);
  const match = useMediaQuery("(min-width: 768px)");

  return (
    <header className="flex h-16 w-full items-center justify-between p-4">
      <div className="flex gap-3">
        <Link to={"/"} unstable_viewTransition>
          <div className="flex gap-3 cursor-pointer">
            <Triangle size={32} />
            <h1
              className="text-2xl font-bold"
              style={{
                viewTransitionName: isTransitioning ? "image-title" : "",
              }}
            >
              CSkins
            </h1>
          </div>
        </Link>
        {match && (
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList>
              {(defaultWeapons as DefaultWeapons).categories.map((obj, idx) => {
                return (
                  <div key={`${obj.subCategory}-${idx}`}>
                    {obj?.subCategory && (
                      <NavigationMenuItem className="order-2">
                        <NavigationMenuTrigger>
                          {obj.subCategory}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="w-auto">
                          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] p-4 gap-4 w-[500px] min-w-[200px]">
                            {obj?.categories?.map((obj2, idx) => {
                              return (
                                <div
                                  className="flex flex-col gap-2"
                                  key={`${obj.category}-${idx}`}
                                >
                                  <p className="font-bold">{obj2.name}</p>
                                  <Separator />
                                  {obj2?.items &&
                                    obj2.items.map((item, idx) => (
                                      <ListItem
                                        url={`/weapon/${obj.subCategory}/${obj2.name}/${item.name}`}
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
                  </div>
                );
              })}
              {(defaultWeapons as DefaultWeapons).categories.map((obj, idx) => {
                return (
                  <div key={`${obj.category}-${idx}`}>
                    {obj?.category && (
                      <NavigationMenuItem
                        className={
                          obj.category === "Pistols" ? "order-1" : "order-3"
                        }
                      >
                        <NavigationMenuTrigger>
                          {obj.category}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="absolute left-auto top-full w-auto">
                          <div className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                            {obj.items?.map((item, idx) => {
                              return (
                                <ListItem
                                  imgSrc={item.skinUrl}
                                  url={
                                    obj.category === "Other"
                                      ? `/${obj.category}/${item.name}`
                                      : `/weapon/${obj.category}/${item.name}`
                                  }
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
                  </div>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
      {!match && (
        <div className="flex gap-2">
          <DrawerCart
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            variantMobile={true}
          />

          <Drawer
            open={drawerOpen}
            onOpenChange={(isOpen) => {
              !isOpen ? close() : open();
            }}
          >
            <Button onClick={open} variant="ghost" size="icon">
              <Menu />
            </Button>

            <DrawerContent className="h-full">
              <DrawerHeader className="grid  grid-cols-[1fr_auto]">
                <DrawerTitle>Menu</DrawerTitle>
                <DrawerDescription className="row-start-2">
                  CSkins
                </DrawerDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={close}
                  className="row-span-2 place-self-end"
                >
                  <X />
                </Button>
              </DrawerHeader>
              <Accordion type="multiple" className="w-full">
                {(defaultWeapons as DefaultWeapons).categories.map(
                  (obj, idx) => {
                    if (obj.subCategory) {
                      return (
                        <AccordionItem
                          value={`${obj.subCategory}-${idx}`}
                          key={idx}
                          itemType="multiple"
                        >
                          <AccordionTrigger>{obj.subCategory}</AccordionTrigger>
                          <AccordionContent>
                            {obj?.categories?.map((obj2, idx) => {
                              return (
                                <AccordionItem
                                  value={`${obj2.name}-${idx}`}
                                  key={`${obj.subCategory}-${idx}`}
                                >
                                  <AccordionTrigger className="capitalize">
                                    {obj2.name.toLowerCase()}
                                  </AccordionTrigger>
                                  <AccordionContent className="max-h-[450px] overflow-y-auto">
                                    {obj2?.items &&
                                      obj2.items.map((item, idx) => {
                                        return (
                                          <ListItemMobile
                                            onClick={close}
                                            url={`/weapon/${obj.subCategory}/${obj2.name}/${item.name}`}
                                            title={item.name}
                                            key={`${obj.subCategory}-${idx}`}
                                            imgSrc={item.skinUrl}
                                          />
                                        );
                                      })}
                                  </AccordionContent>
                                </AccordionItem>
                              );
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    }
                  },
                )}

                {(defaultWeapons as DefaultWeapons).categories.map(
                  (obj, idx) => {
                    if (obj.category) {
                      return (
                        <AccordionItem
                          value={`${obj.category}-${idx}`}
                          key={idx}
                        >
                          <AccordionTrigger>{obj.category}</AccordionTrigger>
                          <AccordionContent className="max-h-[450px] overflow-y-auto">
                            {obj.items?.map((item, idx) => {
                              return (
                                <ListItemMobile
                                  onClick={close}
                                  url={
                                    obj.category === "Other"
                                      ? `/${obj.category}/${item.name}`
                                      : `/weapon/${obj.category}/${item.name}`
                                  }
                                  title={item.name}
                                  key={`${obj.subCategory}-${idx}`}
                                  imgSrc={item.skinUrl}
                                />
                              );
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    }
                  },
                )}
              </Accordion>
            </DrawerContent>
          </Drawer>
        </div>
      )}
      {match && (
        <div className="flex gap-3 max-md:hidden">
          <div className="relative max-lg:hidden">
            <Search
              size={16}
              color="#64748b"
              className="absolute left-2 top-2.5 h-4 w-4"
            />
            <Form method="get" action="/search">
              <Input
                placeholder="Search"
                className="w-96 max-xl:w-32 pl-8 h-9 text-sm"
                type="search"
                name="q"
                defaultValue={searchParams.get("q") ?? ""}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    navigate(`/search?q=${event.currentTarget.value}`);
                  }
                }}
              />
            </Form>
          </div>

          <DrawerCart
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
          <ModeToggle />
        </div>
      )}
    </header>
  );
}

export default Header;
