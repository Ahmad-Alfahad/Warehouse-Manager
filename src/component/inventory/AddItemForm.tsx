"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { addItem } from "@/lib/service/api";

export default function AddItemForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const data = {
      name: form.name.value,
      category: form.category.value,
      quantity: Number(form.quantity.value),
      unit: form.unit.value,
      location: form.location.value,
      minQuantity: Number(form.minQuantity.value),
    };

    await addItem(data);
    router.push("/inventory");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} maxWidth={400}>
        <TextField name="name" label="Name" required />
        <TextField name="category" label="Category" required />
        <TextField name="quantity" label="Quantity" type="number" required />
        <TextField name="unit" label="Unit" required />
        <TextField name="location" label="Location" required />
        <TextField
          name="minQuantity"
          label="Minimum Quantity"
          type="number"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          Add Item
        </Button>
      </Stack>
    </form>
  );
}
