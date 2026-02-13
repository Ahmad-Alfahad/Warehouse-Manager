"use client";

import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Stack,
  Box
} from "@mui/material";
import { Item } from "@/lib/types";
import { updateItem } from "@/lib/service/api";
import { useSnackbar } from "notistack";  
import { useState } from "react";
import { addEvent } from "@/lib/service/storage";
interface Props {
  item: Item;
}
 
export default function EditItemForm({ item }: Props) {
  // console.log("Received item in EditItemForm:", item);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState<Omit<Item, "id">>({
    name: item.name ?? "",
    category: item.category ?? "",
    quantity: item.quantity ?? 0,
    location: item.location ?? "",
    minQuantity: item.minQuantity ?? 0,
    price: item.price ?? 0,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateItem(item.id, formData); 
      addEvent({ type: 'updateItem', message: `item updated ${formData.name} ` });
      enqueueSnackbar("Item updated successfully", { variant: "success" });
      router.push("/inventory");
      router.refresh();
    } catch {
      enqueueSnackbar("Failed to update item", { variant: "error" });
    }
  };



  return (
    <Box ml={5} mt={3}>
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} maxWidth={400}>
        <TextField name="name" label="Name" defaultValue={item.name} onChange={handleChange} />
        <TextField
          name="category"
          label="Category"
          defaultValue={item.category}
          onChange={handleChange}
        />
        <TextField
          name="quantity"
          label="Quantity"
          type="number"
          defaultValue={item.quantity}
          onChange={handleChange}
        />
        <TextField name="price" label="price" defaultValue={item.price} onChange={handleChange} />
        <TextField
          name="location"
          label="Location"
          defaultValue={item.location}
          onChange={handleChange}
        />
        <TextField
          name="minQuantity"
          label="Minimum Quantity"
          type="number"
          defaultValue={item.minQuantity}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained">
          Update Item
        </Button>
      </Stack>
    </form>
    </Box>
  );
}