"use client";

import Link from "next/link";
import { Box, Drawer, List, ListItemButton, ListItemText } from "@mui/material";

const drawerWidth = 220;

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItemButton component={Link} href="/inventory">
            <ListItemText primary="Inventory" />
          </ListItemButton>

          <ListItemButton component={Link} href="/inventory/add">
            <ListItemText primary="Add Item" />
          </ListItemButton>

          <ListItemButton component={Link} href="/about">
            <ListItemText primary="About" />
          </ListItemButton>
          
          {/* <ListItemButton component={Link} href="/inventory/edit">
            <ListItemText primary="edit" />
          </ListItemButton> */}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
