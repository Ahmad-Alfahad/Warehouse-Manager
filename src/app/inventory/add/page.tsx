import { Typography } from "@mui/material";
import AddItemForm from "@/component/inventory/AddItemForm";
export default function AddItemPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom  mt={5} ml={5}>
        Add Item
      </Typography>
      <AddItemForm/>
    </>
  );
}
