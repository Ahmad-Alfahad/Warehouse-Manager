import LastOrders from "@/component/orders/LastOrders";
import { Box, Typography  , Card} from "@mui/material";

export default function OrdersPage() {
  return(
   <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} maxWidth={'100vw'} m={5} >
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        Orders
      </Typography> 
     <Box>
    
     <Box sx={{ "&:hover": {
              transform: "translateY(-6px)",
              transition:'0.3s',
            },
            textAlign:'center',
           height: '400px' ,
           alignContent:'center'
            }}><LastOrders /></Box>
     </Box>
    </Box>
  )
 
  ;
}