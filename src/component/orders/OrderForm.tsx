"use client";

import { useEffect, useState } from "react";
import { getItems, updateItem } from "@/lib/service/api";
import { Item } from "@/lib/types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";


type OrderItem = {
  id: string;
  name: string;
  requestedQty: number;
  availableQty: number;
};

export default function OrderForm() {
  const [items, setItems] = useState<Item[]>([]);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
  open: boolean;
  message: string;
  severity: "success" | "error" | "info";
}>({
  open: false,
  message: "",
  severity: "success",
});

  useEffect(() => {
    getItems().then(setItems);
  }, []);

 function removeFromOrder(id: string) {
  setOrder(prev => prev.filter(item => item.id !== id));
  showSnackbar("🗑️ تم حذف العنصر من الطلب", "info");
}

function showSnackbar(
  message: string,
  severity: "success" | "error" | "info" = "success"
) {
  setSnackbar({ open: true, message, severity });
}



  const selectedItem = items.find(i => i.id === selectedId);

  function addToOrder() {
    if (!selectedItem) return;

    if (quantity > selectedItem.quantity) {
      setError(`❌ الكمية غير كافية (${selectedItem.quantity})`);
      return;
    }

    setError("");

    setOrder(prev => {
      const exists = prev.find(i => i.id === selectedItem.id);
      if (exists) {
        return prev.map(i =>
          i.id === selectedItem.id
            ? { ...i, requestedQty: i.requestedQty + quantity }
            : i
        );
      }

      return [
        ...prev,
        {
          id: selectedItem.id,
          name: selectedItem.name,
          requestedQty: quantity,
          availableQty: selectedItem.quantity,
        },
      ];
    });
    showSnackbar("✅ تم إضافة العنصر إلى الطلب", "success");

    setQuantity(1);
    setSelectedId("");
  }

  async function confirmOrder() {
    setLoading(true);

    for (const item of order) {
      if (item.requestedQty > item.availableQty) {
        setError("❌ أحد العناصر لم يعد متوفرًا");
        setLoading(false);
        return;
      }
      showSnackbar("📦 تم تأكيد الطلب وخصم الكميات", "success");

    }

    for (const item of order) {
      await updateItem(item.id, {
        name: item.name,
        quantity: item.availableQty - item.requestedQty,
        price: items.find(i => i.id === item.id)?.price ?? 0,
      });
    }

    // تحديث الواجهة
    setItems(prev =>
      prev.map(i => {
        const ordered = order.find(o => o.id === i.id);
        return ordered
          ? { ...i, quantity: i.quantity - ordered.requestedQty }
          : i;
      })
    );

    setOrder([]);
    setLoading(false);
  }
return (
  <Card sx={{ maxWidth: 520, mx: "auto", mt: 5 }}>
    <CardContent>
      <Typography variant="h5" mb={3}>
        🛒 Create Order
      </Typography>

      {/* Select Item */}
      <TextField
        select
        fullWidth
        label="Select Item"
        value={selectedId}
        onChange={e => setSelectedId(e.target.value)}
        margin="normal"
      >
        {items.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.name} (Available: {item.quantity})
          </MenuItem>
        ))}
      </TextField>

      {/* Quantity */}
      <TextField
        type="number"
        fullWidth
        label="Quantity"
        value={quantity}
        inputProps={{ min: 1 }}
        onChange={e => setQuantity(+e.target.value)}
        margin="normal"
      />

      {/* Add Button */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<AddShoppingCartIcon />}
        sx={{ mt: 2 }}
        onClick={addToOrder}
        disabled={!selectedId}
      >
        Add to Order
      </Button>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      {/* Order Items */}
      <Card
        variant="outlined"
        sx={{ mt: 4, borderRadius: 2 }}
      >
        <CardContent>
          <Typography variant="h6" mb={1}>
            📦 Order Items
          </Typography>

          {order.length === 0 ? (
            <Typography color="text.secondary">
              No items added
            </Typography>
          ) : (
            <List>
              {order.map(item => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => removeFromOrder(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.requestedQty}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </CardContent>

    <Divider />

    <CardActions sx={{ p: 2 }}>
      <Button
        fullWidth
        variant="contained"
        color="success"
        disabled={order.length === 0 || loading}
        onClick={confirmOrder}
      >
        {loading ? "Processing..." : "Confirm Order"}
      </Button>
    </CardActions>

    {/* Snackbar */}
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() =>
        setSnackbar(prev => ({ ...prev, open: false }))
      }
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() =>
          setSnackbar(prev => ({ ...prev, open: false }))
        }
        severity={snackbar.severity}
        variant="filled"
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  </Card>
);

  
}
