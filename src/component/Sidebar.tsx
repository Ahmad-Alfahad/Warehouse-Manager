"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const navItems = [
  { label: "Dashboard", href: "/", icon: <DashboardIcon /> },
  { label: "Products", href: "/inventory", icon: <InventoryIcon /> },
  { label: "Add Product", href: "/inventory/add", icon: <AddBoxIcon /> },
  { label: "Orders", href: "/orders", icon: <ShoppingCartIcon /> },
  { label: "New Order", href: "/orders/new", icon: <AddShoppingCartIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: isSmall ? 80 : 250,
        transition: "width 0.3s ease",
        bgcolor: "background.paper",
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          mb: 3,
          textAlign: isSmall ? "center" : "left",
        }}
      >
        {isSmall ? "📦" : "📦 Inventory"}
      </Box>

      <List>
        {navItems.map((item) => (
          <Tooltip
            key={item.href}
            title={isSmall ? item.label : ""}
            placement="right"
          >
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{
                borderRadius: 2,
                mb: 1,
                justifyContent: isSmall ? "center" : "flex-start",
                px: isSmall ? 1 : 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSmall ? 0 : 2,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!isSmall && (
                <ListItemText primary={item.label} />
              )}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
}