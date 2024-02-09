interface PaginationProps {
  previous: () => void;
  next: () => void;
}

export default function Pagination({ previous, next }: PaginationProps) {
  return (
    <div className="flex justify-end gap-6 mt-4 items-center">
      <button className="bg-red-600	text-white p-3" onClick={previous}>Previous</button>
      <h1>Page 1 of 9</h1>
      <button className="bg-red-600	text-white p-3" onClick={next}>Next</button>
    </div>
  );
}
