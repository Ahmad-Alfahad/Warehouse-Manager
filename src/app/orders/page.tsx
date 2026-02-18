import LastOrders from "@/component/orders/LastOrders";
import { Box, Typography  , Card} from "@mui/material";

export default function OrdersPage() {
  return(
   <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} ml={2} maxWidth={'80vw'} >
      <Typography variant="h4" gutterBottom textAlign={'center'} mt={4}>
        Orders
      </Typography> 
     <Box>
    
     <Box sx={{ "&:hover": {
              transform: "translateY(-6px)",
              transition:'0.3s',
            },
            textAlign:'center',
           height: '500px' ,
           alignContent:'center'
            }}><LastOrders /></Box>
     </Box>
    </Box>
  )
 
  ;
}