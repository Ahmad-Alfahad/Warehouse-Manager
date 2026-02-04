import { Item } from "@/lib/types";
import DashboardCard from "@/component/DashboardCard";
import {Typography , Box , Grid} from "@mui/material"
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function Dashboard(  {items,
}: {
  items: Item[];
}
) {
  return (

   <Box maxWidth={'100vw'}  ml={10} mt={5}>
     <Typography variant="h5" mb={3} >
         Dashboard
      </Typography>
      {/* <SearchableTable items={[] as Item[]}/> */}
    <Grid container spacing={3}>
  <Grid item xs={12} md={3}>
    <DashboardCard
      title="Products"
      value="View & Manage"
      link="/inventory"
      icon={<InventoryIcon />}
      color="#2563eb"
    />
  </Grid>

  <Grid item xs={12} md={3}>
    <DashboardCard
      title="Add Product"
      value="New Item"
      link="/inventory/add"
      icon={<AddBoxIcon />}
      color="#16a34a"
    />
  </Grid>

  <Grid item xs={12} md={3}>
    <DashboardCard
      title="Orders"
      value="Show Orders"
      link="/orders"
      icon={<ReceiptLongIcon />}
      color="#7c3aed"
    />
  </Grid>

  <Grid item xs={12} md={3}>
    <DashboardCard
      title="New Order"
      value="Create Order"
      link="/orders/new"
      icon={<ShoppingCartCheckoutIcon />}
      color="#dc2626"
    />
  </Grid>
</Grid>
  
   </Box>

   
  );
}
