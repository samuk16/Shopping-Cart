import { Triangle } from "lucide-react";

function LoadingFallback() {
  return (
    <div className="flex gap-4 justify-center items-center h-screen animate-out fade-out ">
      <Triangle className=" w-12 h-12 lg:h-20 lg:w-20 animate-pulse" />
      <h1 className="text-5xl lg:text-7xl font-bold ">CSkins</h1>
    </div>
  );
}

export { LoadingFallback };
