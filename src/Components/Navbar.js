import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [cookie,_, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const hanldeLogout = () => {
    localStorage.removeItem("userId");
    removeCookie(["access_token"]);
    navigate("/Login");
  };

  const menuItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Billboard",
      href: "/Billboard",
    },
    {
      label: "Products",
      href: "/Product",
    },
    {
      label: "Orders",
      href: "/Order",
    },
  ];
// console.log(cookie)
  return (
    <Navbar
      className="my-3 bg-slate-100 py-auto"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to={"/"}>LOGO</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to="/Billboard">
            Billboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/Product" aria-current="page">
            Product
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/Orders">
            Orders
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {
            cookie.access_token ? <Button onClick={() => hanldeLogout()}>Logout</Button> : <Button onClick={() =>{navigate("/Login")}}>Loginn</Button>

          }
          
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link to={item.href} size="lg" onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
