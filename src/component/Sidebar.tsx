"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const navItems = [
  { label: "Dashboard", href: "/", icon: <DashboardIcon /> },
  { label: "Products", href: "/inventory", icon: <InventoryIcon /> },
  { label: "Add Product", href: "/inventory/add", icon: <AddBoxIcon /> },
  { label: "Orders", href: "/orders", icon: <ShoppingCartIcon /> },
  { label: "Orders", href: "/orders/new", icon: <ShoppingCartIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div >
      <Box width={240} bgcolor="background.paper" 
      p={2} display={'flex'} flexDirection={'column'}
       height={'100vh'} position={'sticky'} top={0}
      >
        <Box fontSize={20} fontWeight="bold" mb={3} >
          📦 Inventory
        </Box>

        <List>
          {navItems.map(item => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{
                borderRadius: 2,
                mb: 1,
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </div>
  );
}
