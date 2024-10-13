import {
  createPageLink,
  disableButtonIfFirstItem,
  disableButtonIfLastItem,
  generaionPaginationFirstAndLastItems,
  generationPaginationRange,
} from "@/lib/ProductCatalog.utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { AgentsType, SkinType, StickerType } from "@/lib/types";
import { Location } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
interface PaginationProps {
  pageNum: number;
  items: SkinType[][] | StickerType[][] | AgentsType[][];
  searchParams: URLSearchParams;
  location: Location;
}

function PaginationCatalog({
  pageNum,
  items,
  searchParams,
  location,
}: PaginationProps) {
  const DOTS = "...";
  const page = searchParams.get("page");
  const match = useMediaQuery("(max-width: 640px)");

  const firstRangePagination = generaionPaginationFirstAndLastItems(
    pageNum,
    items.length,
    match ? 4 : 6,
  );

  const pageRange = generationPaginationRange(
    page ? parseInt(page) : 0,
    match ? 3 : 5,
    match,
  );
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={createPageLink(
              pageNum === 1 ? pageNum : pageNum - 1,
              searchParams,
              location,
            )}
            onClick={(e) => disableButtonIfFirstItem(e, pageNum)}
            isActive={pageNum == 1 ? false : true}
          ></PaginationPrevious>
        </PaginationItem>
        {pageNum >= (match ? 4 : 6) ? (
          <PaginationItem>
            <PaginationLink to={createPageLink(1, searchParams, location)}>
              1
            </PaginationLink>
          </PaginationItem>
        ) : null}
        {pageNum >= (match ? 4 : 6) &&
        pageNum <= items.length - (match ? 4 : 6) ? (
          <>
            {pageRange.map((pageNumber, idx) => (
              <PaginationItem key={idx}>
                {pageNumber === DOTS ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    to={createPageLink(
                      parseInt(pageNumber),
                      searchParams,
                      location,
                    )}
                    isActive={pageNum === parseInt(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
          </>
        ) : (
          firstRangePagination.map((pageNumber, idx) => (
            <PaginationItem key={idx}>
              {pageNumber === DOTS ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  to={createPageLink(
                    parseInt(pageNumber),
                    searchParams,
                    location,
                  )}
                  isActive={pageNum === parseInt(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))
        )}

        {pageNum <= items.length - (match ? 4 : 6) ? (
          <PaginationItem>
            <PaginationLink
              to={createPageLink(items.length, searchParams, location)}
            >{`${items.length}`}</PaginationLink>
          </PaginationItem>
        ) : null}

        <PaginationItem>
          <PaginationNext
            to={createPageLink(
              pageNum === 0 ? pageNum + 2 : pageNum + 1,
              searchParams,
              location,
            )}
            onClick={(e) => disableButtonIfLastItem(e, pageNum, items.length)}
            isActive={items && pageNum == items.length ? false : true}
          ></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { PaginationCatalog };
