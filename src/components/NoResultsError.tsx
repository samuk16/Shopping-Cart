import { AlertCircle, Undo2, FilterX } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";

function NoResults() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const clearFilters = () => {
    setSearchParams({});
  };
  return (
    <div className="flex flex-col gap-8 items-center justify-center pt-16 ">
      <div className="flex gap-4 bg-gray-950 text-gray-300 border rounded-sm p-4 items-start max-w-md">
        <AlertCircle size={24} className="mt-2" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">No Results</h1>
          <p className="text-gray-400 text-sm">
            No products found matching the applied filters.
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <Undo2 />
        </Button>

        <Button variant={"outline"} onClick={clearFilters}>
          <FilterX size={16} className="mr-2" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
}

export default NoResults;
