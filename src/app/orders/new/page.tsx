
import { Container } from "@mui/material";
import OrderForm from "@/component/orders/OrderForm";
import {getItems} from "@/lib/service/api";
export default async  function NewOrderPage() {
  //  const items = await getItems();
  return (
    
    <Container maxWidth="md">
      
        
        <OrderForm />
      
    </Container>
  );
  
}
