"use client";

import { useState } from "react";
import { TextField } from "@mui/material";
import ItemTable from "./ItemTable";
import { Item } from "@/lib/types";

export default function SearchableTable({
  items,
}: {
  items: Item[];
}) {
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <TextField
        label="Search items"
        fullWidth
        sx={{ mb: 2 }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ItemTable items={filtered} />
    </>
  );
}
