import ItemTable from "@/component/inventory/ItemTable";
import SearchableTable from "@/component/inventory/SearchableTable";
import { getItems } from "@/lib/service/api";
import { Typography } from "@mui/material";

export default async function InventoryPage() {
   const items = await getItems();
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Inventory
      </Typography>
        <SearchableTable items={items} />
        <ItemTable items={items} /> 
    </>
  );
}
