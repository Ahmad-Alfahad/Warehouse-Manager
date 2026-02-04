"use client";

import { Item } from "@/lib/types";
import {
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

export default function DashboardStats({
  items,
}: {
  items: Item[];
}) {
  const totalItems = items.length;

  const lowStock = items.filter(
    (item) =>
      item.minQuantity !== undefined &&
      item.quantity < item.minQuantity
  ).length;

  const categories = new Set(
    items.map((item) => item.category)
  ).size;

  return (
    <Grid container spacing={2} mb={3}>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Total Items
            </Typography>
            <Typography variant="h4">
              {totalItems}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Low Stock
            </Typography>
            <Typography variant="h4" color="error">
              {lowStock}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    
    </Grid>
  );
}
