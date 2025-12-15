// @ts-check

import {
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  Sidebar as SidebarRoot,
} from "flowbite-react";
import { BiPieChart, BiShoppingBag, BiTag, BiUser } from "react-icons/bi";
import { LuAtSign } from "react-icons/lu";
import useSidebar from "../../Hooks/useSidebar";

export default function Sidebar() {
  const { sidebar } = useSidebar();
  const isSidebarValid = (() => {
    if (!sidebar) {
      return false;
    }
    return true;
  })();
  if (!isSidebarValid) {
    return null;
  }
  return (
    <SidebarRoot
      aria-label="Default sidebar example"
      className="max-h-170 [&>div]:bg-gray-900"
    >
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            href="/"
            icon={BiPieChart}
            active={sidebar === "dashboard"}
          >
            Dashboard
          </SidebarItem>
          <SidebarItem
            href="/categorias"
            icon={BiTag}
            // label="115"
            active={sidebar === "categorias"}
          >
            Categorias
          </SidebarItem>
          <SidebarItem
            href="/produtos"
            icon={BiShoppingBag}
            // label="115"
            active={sidebar === "produtos"}
          >
            Produtos
          </SidebarItem>
          <SidebarItem
            href="/newsletters"
            icon={LuAtSign}
            // label="115"
            active={sidebar === "newsletters"}
          >
            Newsletter
          </SidebarItem>
          <SidebarItem
            href="/usuarios"
            icon={BiUser}
            // label="115"
            active={sidebar === "usuarios"}
          >
            Usuários
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </SidebarRoot>
  );
}
