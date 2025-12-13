import { Button, MegaMenu, NavbarBrand, NavbarToggle } from "flowbite-react";

export default function Header() {
  return (
    <MegaMenu>
      <NavbarBrand href="/">
        <img alt="" src="logotipo.png" className="mr-3 h-6 sm:h-9" />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Home Haven
        </span>
      </NavbarBrand>
    </MegaMenu>
  );
}
