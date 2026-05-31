export default function SearchInput({ onChange, inputValue }) {
  return (
    <div className="w-full h-12 relative overflow-hidden shadow-none! border-zinc-100 mt-10 cursor-pointer border-2 duration-150 focus-within:border-zinc-300 rounded-lg">
      <input
        value={inputValue}
        type="text"
        className="absolute size-full px-6 placeholder:text-sm focus-within:outline-none!"
        placeholder="جستجو کنید ..."
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
