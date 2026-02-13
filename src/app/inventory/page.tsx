import DashboardStats from "@/component/inventory/DashboardStats";
import EmptyState from "@/component/ui/EmptyState";
import { getItems } from "@/lib/service/api";
import { Typography , Box} from "@mui/material";
import ItemsTable from "@/component/inventory/ItemsTable";

export default async function InventoryPage() {
   const items = await getItems();
  if(items.length === 0){
   return <EmptyState/>;
  }
   return (
    <Box display={'flex'} flexDirection={'column'} maxWidth={'100vw'} ml={5} mt={5}>
      <Typography variant="h4" gutterBottom>
        Inventory
      </Typography>
      
        <DashboardStats items={items} />
        
        <ItemsTable items={items} />
        

    </Box>
  );
}
