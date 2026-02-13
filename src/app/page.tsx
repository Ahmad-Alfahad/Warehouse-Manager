import DashboardCard from "@/component/DashboardCard";
import {  Box } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LastProcesses from "@/component/LastProcesses";
export default function Dashboard() {
    
    //  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (

   <Box display={'flex'} mt={8} flexDirection={'column'}  justifyContent={'space-around'} maxWidth={'100vw'} gap={5}  >
  

    <Box  >
 
    <Box display={'flex'} flexDirection={'row'}  flexWrap={'wrap'} justifyContent={'space-around'} gap={2}  >

    <Box  >
    <DashboardCard
      title="Products"
      value="View & Manage"
      link="/inventory"
      icon={<InventoryIcon />}
      color="#2563eb"
    />
  </Box>

  <Box >
    <DashboardCard
      title="Add Product"
      value="New Item"
      link="/inventory/add"
      icon={<AddBoxIcon />}
      color="#16a34a"
    />
  </Box>

  <Box >
    <DashboardCard
      title="Orders"
      value="Show Orders"
      link="/orders"
      icon={<ReceiptLongIcon />}
      color="#7c3aed"
    />
  </Box>

  <Box >
    <DashboardCard
      title="New Order"
      value="Create Order"
      link="/orders/new"
      icon={<ShoppingCartCheckoutIcon />}
      color="#dc2626"
    />
  </Box>
</Box>
</Box>

 <Box >

 <Box sx={{ "&:hover": {
          transform: "translateY(-6px)",
          transition:'0.3s',
        },
        marginLeft:'15px' ,
        marginRight:'15px' ,
        textAlign:'center',
       height: '340px' ,
       alignContent:'center'
        }}><LastProcesses></LastProcesses> </Box>
 </Box>

   </Box>

   
  );
}



