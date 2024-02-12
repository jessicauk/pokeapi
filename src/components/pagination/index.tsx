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
      <button
        className="bg-red-600	shadow-lg shadow-red-600/30 text-white p-1.5 font-bold hover:bg-red-800"
        onClick={previous}
      >
        Previous
      </button>
      <h1 className="text-white">
        Page <span className="text-xl">{page}</span> of{" "}
        <span className="text-xl">{total}</span>
      </h1>
      <button
        className="bg-red-600	text-white shadow-lg shadow-red-600/30 p-1.5 font-bold hover:bg-red-800"
        onClick={next}
      >
        Next
      </button>
    </div>
  );
}
