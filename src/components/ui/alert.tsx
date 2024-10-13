import { TriangleAlert } from "lucide-react";

function Alert() {
  return (
    <>
      {/* <div className="flex px-4 py-2 absolute top-0 right-0 animate-in fade-in slide-in-from-top-0 items-center gap-2 border border-slate-800 rounded-sm bg-red-400/50">
        <TriangleAlert />
        <div>
          <h1>Error</h1>
          <p>Price not found on steam marketplace</p>
        </div>
      </div> */}
      <div className="flex text-red-500 px-4 py-2 absolute top-20 right-10 animate-in fade-in slide-in-from-top-0 items-center gap-2 border border-slate-800 rounded-sm bg-slate-900">
        <TriangleAlert />
        <div>
          <h1 className="font-bold">Error</h1>
          <p>Price not found on steam marketplace</p>
        </div>
      </div>
    </>
  );
}

export { Alert };
