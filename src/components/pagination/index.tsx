interface PaginationProps {
  previous: () => void;
  next: () => void;
  page: number;
  total: number;
}

export default function Pagination({
  previous,
  next,
  page,
  total,
}: PaginationProps) {
  return (
    <div className="row-span-1 flex justify-between sm:justify-end gap-6 items-center order-1 sm:order-2">
      <button className="bg-red-600	text-white p-3" onClick={previous}>
        Previous
      </button>
      <h1>
        Page {page} of {total}
      </h1>
      <button className="bg-red-600	text-white p-3" onClick={next}>
        Next
      </button>
    </div>
  );
}
