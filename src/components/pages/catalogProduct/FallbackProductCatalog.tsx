import { Skeleton } from "@/components/ui/skeleton";

function SkinCardSkeleton() {
  return (
    <div className="sm:flex-col flex gap-4 items-center sm:justify-between max-sm:border-x-0 max-sm:border-b-0 max-sm:rounded-none border  p-4 rounded-sm">
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="w-[60px] h-[24px] rounded-sm" />
        <Skeleton className="w-[50px] h-[24px] rounded-sm" />
        <Skeleton className="w-[100px] h-[24px] rounded-sm" />
      </div>

      <Skeleton className="w-[200px] h-[100px] rounded-sm sm:order-2 order-first" />
      <Skeleton className="w-[50px] h-[24px] rounded-sm" />
    </div>
  );
}
function FallbackTest() {
  return (
    <div className="flex flex-col gap-4 items-center max-w-dvw overflow-hidden pt-24">
      <div className="flex flex-col  w-full border-slate-800 px-4 ">
        <div className="flex gap-2 justify-center items-center max-sm:flex-col">
          <Skeleton className="w-[150px] h-[150px] rounded-sm" />
          <div className=" flex flex-col w-full gap-4">
            <Skeleton className="w-[90px] h-[20px] rounded-sm" />

            <Skeleton className="w-full h-[10px] rounded-sm" />
            <Skeleton className="w-full h-[10px] rounded-sm" />
            <Skeleton className="w-full h-[10px] rounded-sm" />
            <Skeleton className="w-[100px] h-[10px] rounded-sm" />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1300px] grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:gap-4">
        {Array.from({ length: 16 }).map((_, idx) => (
          <SkinCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export default FallbackTest;
