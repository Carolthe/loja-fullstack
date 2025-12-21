// @ts-check

import { TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Search({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // @ts-ignore
    debounceRef.current = setTimeout(() => {
      handleSearch({ search: value });
    }, 500);
  };

  return (
    <form className="max-w-md">
      <TextInput
        id="search"
        type="text"
        rightIcon={HiMagnifyingGlass}
        placeholder="Produto, categoria, etc..."
        required
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
}
