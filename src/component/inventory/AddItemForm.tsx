"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { addItem } from "@/lib/service/api";
import { useSnackbar } from "notistack";
import { addEvent } from "@/lib/service/storage";
export default function AddItemForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      category: form.category.value,
      quantity: Number(form.quantity.value),
      price: Number(form.price.value),
      location: form.location.value,
      minQuantity: Number(form.minQuantity.value),
    };

    try {
      await addItem(data);
      addEvent({ type:`add`, message : `new item added ${data.name}` });
      enqueueSnackbar("Item added successfully", {
        variant: "success",
      });
      router.push("/inventory");
      router.refresh();
    }
    catch {
      enqueueSnackbar("Failed to add item", {
        variant: "error",
      });
    }
  }

  return (
    <Box ml={5}>
      <form onSubmit={handleSubmit} >
        <Stack spacing={2} maxWidth={400} >
          <TextField name="name" label="Name" required  />
          <TextField name="category" label="Category" required />
          <TextField name="quantity" label="Quantity" type="number" required />
          <TextField name="price" label="Price" type="number" required />
          <TextField name="location" label="Location"  />
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
    </Box>
  );
}
