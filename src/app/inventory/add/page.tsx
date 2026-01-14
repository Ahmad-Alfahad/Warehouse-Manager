import { Typography } from "@mui/material";
import AddItemForm from "@/component/inventory/AddItemForm";
export default function AddItemPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Add Item
      </Typography>
      <AddItemForm/>
    </>
  );
}
