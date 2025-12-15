import { Label, TextInput } from "flowbite-react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Search() {
  return (
    <div className="max-w-md">
      <TextInput
        id="search"
        type="text"
        rightIcon={HiMagnifyingGlass}
        placeholder="Produto, categoria, etc..."
        required
      />
    </div>
  );
}
