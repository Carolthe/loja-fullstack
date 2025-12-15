// @ts-check

import {
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  Sidebar as SidebarRoot,
} from "flowbite-react";
import { BiPieChart, BiShoppingBag, BiTag, BiUser } from "react-icons/bi";
import { LuAtSign } from "react-icons/lu";

export default function Sidebar(props) {
  const isPropsValid = (() => {
    if (!props || !props.activeRoute) {
      return false;
    }
    return true;
  })();
  if (!isPropsValid) {
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
            active={props.activeRoute === "dashboard"}
          >
            Dashboard
          </SidebarItem>
          <SidebarItem
            href="/categorias"
            icon={BiTag}
            // label="115"
            active={props.activeRoute === "categorias"}
          >
            Categorias
          </SidebarItem>
          <SidebarItem
            href="/produtos"
            icon={BiShoppingBag}
            // label="115"
            active={props.activeRoute === "produtos"}
          >
            Produtos
          </SidebarItem>
          <SidebarItem
            href="/newsletters"
            icon={LuAtSign}
            // label="115"
            active={props.activeRoute === "newsletters"}
          >
            Newsletter
          </SidebarItem>
          <SidebarItem
            href="/usuarios"
            icon={BiUser}
            // label="115"
            active={props.activeRoute === "usuarios"}
          >
            Usuários
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </SidebarRoot>
  );
}
