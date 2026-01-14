"use client";

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Stack,
} from "@mui/material";

import { useState } from "react";
import ItemTable from "./ItemTable";
import { Item } from "@/lib/types";

export default function SearchableTable({
  items,
}: {
  items: Item[];
}) {

  const [query, setQuery] = useState("");
  const [category , setCategory]  = useState("all");
  const [lowStockOnly , setLowStockOnly] = useState(false)


 const filtered = items.filter((item) => {
  const matchesSearch = item.name
    .toLowerCase()
    .includes(query.toLowerCase());

  const matchesCategory =
    category === "all" || item.category === category;

  const matchesLowStock =
    !lowStockOnly ||
    (item.minQuantity !== undefined &&
      item.quantity < item.minQuantity);

  return matchesSearch && matchesCategory && matchesLowStock;
});


  const categories = Array.from(
  new Set(items.map((item) => item.category))
);

  return (
    <>
  <Stack direction="row" spacing={2} mb={2}>
    <TextField
      label="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />

    <FormControl sx={{ minWidth: 160 }}>
      <InputLabel>Category</InputLabel>
      <Select
        value={category}
        label="Category"
        onChange={(e) => setCategory(e.target.value)}
      >
        <MenuItem value="all">All</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <FormControlLabel
      control={
        <Switch
          checked={lowStockOnly}
          onChange={(e) =>
            setLowStockOnly(e.target.checked)
          }
        />
      }
      label="Low Stock"
    />
  </Stack>

  <ItemTable items={filtered} />
</>

  );
}
