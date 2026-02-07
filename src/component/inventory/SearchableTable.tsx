"use client";

import {
  TextField,
  Switch,
  FormControlLabel,
  Stack,
} from "@mui/material";

import { useState } from "react";
import ItemCard from "./ItemCard";
import { Item } from "@/lib/types";

export default function SearchableTable({
  items,
}: {
  items: Item[];
}) {

  const [query, setQuery] = useState("");
  // const [category , setCategory]  = useState("all");
  const [lowStockOnly , setLowStockOnly] = useState(false)


 const filtered = items.filter((item) => {
  const matchesSearch = item.name
    .toLowerCase()
    .includes(query.toLowerCase());

  // const matchesCategory =
  //   category === "all" || item.category === category;

  const matchesLowStock =
    !lowStockOnly ||
    (item.minQuantity !== undefined &&
      item.quantity < item.minQuantity);

  return matchesSearch && matchesLowStock;
});


//   const categories = Array.from(
//   new Set(items.map((item) => item.category))
// );

  return (
    <>
  <Stack direction="row" spacing={2} mb={2}>
    <TextField
      label="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />

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
    
   { <ItemCard items={filtered} />}
</>

  );
}
