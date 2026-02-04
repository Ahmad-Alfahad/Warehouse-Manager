"use client";

import { Container, Typography, Paper } from "@mui/material";
import OrderForm from "@/component/orders/OrderForm";

export default function NewOrderPage() {
  return (
    
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create Order
      </Typography>

      <Paper sx={{ p: 3 }}>
        <OrderForm />
      </Paper>
    </Container>
  );
  
}
