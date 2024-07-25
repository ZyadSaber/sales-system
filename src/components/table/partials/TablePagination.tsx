import { memo } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


const TablePagination = ({
    onBackClick,
    onNextClick,
    totalRecords,
    noPagination,
    pagination,
    currentActivePage
}: any) => {

    const pageCount = Math.ceil(totalRecords / pagination)

    const previousDisabled = (currentActivePage - 1) <= 0
    const nextDisabled = (currentActivePage + 1) >= pageCount

    return (
        <Pagination>
            {!noPagination && <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={onBackClick} disabled={previousDisabled} />
                </PaginationItem>
                {!previousDisabled && <PaginationItem>
                    <PaginationLink>{currentActivePage - 1}</PaginationLink>
                </PaginationItem>}
                <PaginationItem>
                    <PaginationLink>{currentActivePage}</PaginationLink>
                </PaginationItem>
                {!nextDisabled && <PaginationItem>
                    <PaginationLink>{currentActivePage + 1}</PaginationLink>
                </PaginationItem>}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext onClick={onNextClick} disabled={nextDisabled} />
                </PaginationItem>
            </PaginationContent>}
            <div className="px-4 py-2 border rounded ml-5 flex gap-3">
                <p>Page {currentActivePage}/<span className="text-gray-400 font-medium">{pageCount}</span></p>
                <p>Total Records <span className="text-gray-400 font-medium">{totalRecords}</span></p>
            </div>
        </Pagination>
    )
}

export default memo(TablePagination)