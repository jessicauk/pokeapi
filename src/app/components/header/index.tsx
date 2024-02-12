interface HeaderProps {
  name: string;
  onClick: () => void;
}
export default function Header({ name, onClick }: HeaderProps) {
  return (
    <div className="col-span-6 flex flex-row justify-between items-center">
      <h1 className="text-white capitalize text-3xl">{name}</h1>
      <button
        className="bg-red-600	text-white shadow-lg shadow-red-600/30 p-1.5 font-bold hover:bg-red-800"
        onClick={onClick}
      >
        Go Back
      </button>
    </div>
  );
}
