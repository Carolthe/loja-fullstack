import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiChartPie, HiViewBoards } from "react-icons/hi";

export default function SidebarComponent(props) {
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
    <Sidebar aria-label="Default sidebar example">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            href="/"
            icon={HiChartPie}
            active={props.activeRoute === "dashboard"}
          >
            Dashboard
          </SidebarItem>
          <SidebarItem
            href="/produtos"
            icon={HiViewBoards}
            label="115"
            active={props.activeRoute === "produtos"}
          >
            Produtos
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
