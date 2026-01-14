import ItemTable from "@/component/inventory/ItemTable";
import SearchableTable from "@/component/inventory/SearchableTable";
import DashboardStats from "@/component/inventory/DashboardStats";
import EmptyState from "@/component/ui/EmptyState";
import { getItems } from "@/lib/service/api";
import { Typography } from "@mui/material";

export default async function InventoryPage() {
   const items = await getItems();
  if(items.length === 0){
   return <EmptyState/>;
  }
   return (
    <>
      <Typography variant="h4" gutterBottom>
        Inventory
      </Typography>
      
        <DashboardStats items={items} />
        <SearchableTable items={items} />
        <ItemTable items={items} /> 
    </>
  );
}
