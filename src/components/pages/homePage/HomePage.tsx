import { Suspense, useState } from "react";
import { shuffleArr, getXElements } from "@/lib/utils";
import { Separator } from "../../ui/separator";
import { Await, Link, useLoaderData } from "react-router-dom";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import { SkinType } from "@/lib/types";
import Atropos from "atropos/react";
import { LoadingFallback } from "./loadingFallback";
import { useMediaQuery } from "@mantine/hooks";

function HomePage() {
  const [loadingImg, setLoadingImg] = useState<boolean>(true);
  const { data } = useLoaderData() as { data: Promise<SkinType[]> };

  const handleImageLoad = () => {
    setLoadingImg(false);
  };

  const match = useMediaQuery("(min-width: 640px)");
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Await resolve={data}>
        {(resolveData) => {
          const items = getXElements(shuffleArr(resolveData as SkinType[]), 20);
          return (
            <div className="flex flex-col sm:px-5 md:px-40 gap-5 md:gap-20">
              <div className="flex flex-col px-5 h-svh justify-around relative">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-5  justify-center">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold animate-in fade-in">
                      A better way to buy CS2 skins
                    </h1>
                    <p className="animate-in text-sm md:text-base fade-in text-black dark:text-slate-400">
                      Buy skins easier and faster. All buyers are secured with
                      the highest level protection methods.
                    </p>
                  </div>
                  {match && (
                    <Atropos
                      activeOffset={40}
                      shadow={false}
                      className="w-[300px] lg:h-[400px]  md:h-[300px] h-[250px] relative"
                    >
                      <img
                        src="https://imgs.search.brave.com/i46t8BNA0rtCKJCa9yrXApCDlWmB8mI1J7XcXn668mo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuZ2FtZWFyZW5h/LmdnL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzA4LzI5MjIx/NDQwL2luZmVybm8t/Y3MyLmpwZw"
                        data-atropos-offset="-5"
                        data-atropos-opacity="0.1;0.8"
                        alt=""
                        className="bg-cover h-full blur-sm brightness-50"
                      />
                      <div
                        data-atropos-offset="0"
                        className="absolute grid grid-rows-[auto_auto_auto_auto_1fr_auto] gap-1 md:gap-2 place-items-center p-2 md:p-4 top-0 border border-input h-full rounded-sm"
                      >
                        <p className="text-xs opacity-50">M4A1-S</p>
                        <h1>Hyper Beast</h1>
                        <img
                          src="/images/badge-1.png"
                          className="w-[47px]"
                          data-atropos-offset="5"
                          alt=""
                        />
                        <img
                          src="/images/badge-2.png"
                          className="w-[106px]"
                          data-atropos-offset="5"
                          alt=""
                        />
                        <img
                          src="/images/weapon.png"
                          className=""
                          data-atropos-offset="0"
                          alt=""
                        />
                        <img
                          src="/images/btnCart.png"
                          className="w-[110px]"
                          data-atropos-offset="5"
                          alt=""
                        />
                      </div>
                    </Atropos>
                  )}
                </div>
                <div className="flex max-sm:flex-col justify-around max-sm:items-center max-sm:text-center max-sm:gap-4">
                  <div className="flex flex-col gap-1 sm:gap-3 ">
                    <h2 className="font-bold text-lg sm:text-2xl text-center animate-in fade-in">
                      1K
                    </h2>
                    <Separator className="!bg-violet-400 dark:!bg-slate-600" />
                    <p className="text-xs sm:text-sm text-black dark:text-slate-400 animate-in fade-in ">
                      CS2 items on our website
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-3">
                    <h2 className="font-bold text-lg sm:text-2xl text-center animate-in fade-in ">
                      24/7
                    </h2>
                    <Separator className="!bg-violet-400 dark:!bg-slate-600" />
                    <p className="text-xs sm:text-sm text-black dark:text-slate-400 animate-in fade-in ">
                      online support, response time less than 5 minutes
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                  <div className="flex items-center pl-5">
                    <img src="src/assets/cs_logo.svg" alt="logo" />
                    <h3 className="font-bold text-lg md:text-3xl">
                      Popular CS2 items
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-slate-400 mr-5"
                    asChild
                  >
                    <Link to={"/skins"}>Show all items</Link>
                  </Button>
                </div>
                <div className="flex w-full overflow-x-scroll gap-[1px] scrollable shadow-inner-[0_40px_0_40px_rgba(2,8,23,1)]">
                  {items?.map((item) => (
                    <Link to={`/view/${item.id}`} key={item.id}>
                      <div
                        className="flex flex-col p-4 w-40  sm:min-w-52 items-center transition-colors bg-slate-200 dark:bg-slate-900  dark:hover:bg-slate-800 hover:bg-slate-300"
                        key={item.id}
                      >
                        <p className="text-slate-500">{item.weapon.name}</p>
                        <div>
                          {loadingImg && (
                            <Skeleton className="w-[150px] h-[113px]" />
                          )}
                          <img
                            src={item.image}
                            alt=""
                            width={150}
                            onLoad={handleImageLoad}
                            className="animate-in fade-in "
                            style={{
                              display: loadingImg ? "none" : "block",
                            }}
                          />
                        </div>
                        <p className="font-bold">
                          {item.pattern ? item.pattern.name : "Vanilla"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="py-40 relative flex flex-col gap-10 items-center justify-center">
                <div className=" -z-10 mix-blend-darken dark:mix-blend-lighten absolute w-full h-[700px] -top-48 bg-[radial-gradient(36.18%_43.79%_at_50%_50%,rgba(102,66,165,0.40)_0%,rgba(33,33,38,0.00)_100%)]"></div>

                <h4 className=" font-bold text-2xl md:text-5xl lg:text-6xl">
                  Upgrade your skins with CSkins
                </h4>
                <div className="h-[2px] w-40 bg-slate-500"></div>
              </div>

              <footer>
                <p className="text-sm text-slate-500 text-center py-1">
                  Copyright © 2024 CSkins. All rights reserved.
                </p>
              </footer>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}

export default HomePage;
