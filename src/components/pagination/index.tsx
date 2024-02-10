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
    <div className="flex justify-end gap-6 mt-4 items-center sm:order-2">
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
