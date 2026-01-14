"use client";

import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { Item } from "@/lib/types";
import { updateItem } from "@/lib/service/api";

interface Props {
  item: Item;
}

export default function EditItemForm({ item }: Props) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const data = {
      name: form.name.value,
      category: form.category.value,
      quantity: Number(form.quantity.value),
      unit: form.unit.value,
      location: form.location.value,
      minQuantity: Number(form.minQuantity.value),
    };

    await updateItem(item.id, data);
    router.push("/inventory");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} maxWidth={400}>
        <TextField name="name" label="Name" defaultValue={item.name} />
        <TextField
          name="category"
          label="Category"
          defaultValue={item.category}
        />
        <TextField
          name="quantity"
          label="Quantity"
          type="number"
          defaultValue={item.quantity}
        />
        <TextField name="unit" label="Unit" defaultValue={item.unit} />
        <TextField
          name="location"
          label="Location"
          defaultValue={item.location}
        />
        <TextField
          name="minQuantity"
          label="Minimum Quantity"
          type="number"
          defaultValue={item.minQuantity}
        />

        <Button type="submit" variant="contained">
          Update Item
        </Button>
      </Stack>
    </form>
  );
}
