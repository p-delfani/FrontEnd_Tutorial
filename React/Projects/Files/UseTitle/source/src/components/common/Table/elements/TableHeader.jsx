import Filter from "./Filter";
import Search from "./Search";

const TableHeader = ({ header }) => {
  const { Buttons } = header;

  return (
    <div className="flex items-center justify-between px-5 h-[64px]">
      <p className="text-xl">
        <strong>{header.title}</strong>
      </p>

      {typeof Buttons === "function" ? (
        <div className="flex items-center gap-2">{<Buttons />}</div>
      ) : (
        <div className="flex text-gray-500 *:h-10 *:bg-gradient-to-t *:from-zinc-50 *:cursor-pointer *:select-none *:hover:to-zinc-50 *:hover:from-transparent *:hover:shadow-sm *:focus-within:ring-4 *:duration-150 *:focus-within:ring-gray-500/20 *:border *:primary-border-color *:rounded-md *:px-3 items-center gap-3">
          <Filter />
          <Search />
        </div>
      )}
    </div>
  );
};

export default TableHeader;
