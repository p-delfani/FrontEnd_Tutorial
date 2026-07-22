import React from "react";
import { HiSearch } from "react-icons/hi";

const Search = () => {
  return (
    <div className="flex items-center w-[256px] relative">
      <HiSearch className="absolute" />
      <input
        type="text"
        placeholder="جستجو کنید"
        className="absolute size-full outline-none px-8 text-sm left-0 right-0"
      />
    </div>
  );
};

export default Search;
