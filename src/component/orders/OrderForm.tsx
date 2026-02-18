"use client";

import { useEffect, useState } from "react";
import { getItems, updateItem } from "@/lib/service/api";
import { Item } from "@/lib/types";
import { addEvent } from "@/lib/service/storage";

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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
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
  const [itemsState, setItemsState] = useState<Item[]>([]);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderType, setOrderType] = useState<"in" | "out">("in");

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
    getItems().then(setItemsState);
  }, []);

  function showSnackbar(
    message: string,
    severity: "success" | "error" | "info" = "success"
  ) {
    setSnackbar({ open: true, message, severity });
  }

  function removeFromOrder(id: string) {
    setOrder(prev => prev.filter(item => item.id !== id));
    showSnackbar("🗑️ Item deleted successfully", "info");
  }

  const selectedItem = itemsState.find(i => i.id === selectedId);

  function addToOrder() {
    if (!selectedItem) return;
    if (quantity <= 0) return;

    if (orderType === "out" && quantity > selectedItem.quantity) {
      setError(`Quantity not enough (${selectedItem.quantity})`);
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

    showSnackbar("✅ Item added to order successfully", "success");
    setQuantity(1);
    setSelectedId("");
  }

  async function confirmOrder(e: React.FormEvent) {
    e.preventDefault();
    if (order.length === 0) return;

    try {
      setLoading(true);

      for (const item of order) {
        const currentItem = itemsState.find(i => i.id === item.id);
        if (!currentItem) continue;

        const newQuantity =
          orderType === "in"
            ? currentItem.quantity + item.requestedQty
            : currentItem.quantity - item.requestedQty;

        if (newQuantity < 0) {
          showSnackbar("❌ Quantity cannot be negative", "error");
          setLoading(false);
          return;
        }

        await updateItem(item.id, {
          ...currentItem,
          quantity: newQuantity,
        });

        addEvent({
          type: "confirmOrder",
          message: `${orderType === "in" ? "Inbound" : "Outbound"} order confirmed for ${item.name} quantity  (${item.requestedQty})`,
        });
      }

      // تحديث الواجهة مباشرة
      setItemsState(prev =>
        prev.map(i => {
          const ordered = order.find(o => o.id === i.id);
          if (!ordered) return i;

          return {
            ...i,
            quantity:
              orderType === "in"
                ? i.quantity + ordered.requestedQty
                : i.quantity - ordered.requestedQty,
          };
        })
      );

      setOrder([]);
      showSnackbar("📦 Order confirmed successfully", "success");
    } catch {
      showSnackbar("❌ Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card sx={{ maxWidth: 520, mx: "auto", mt: 5, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" mb={3}>
          🛒 Order
        </Typography>

        <FormControl>
          <RadioGroup
            row
            value={orderType}
            onChange={(_, value) => setOrderType(value as "in" | "out")}
          >
            <FormControlLabel value="in" control={<Radio />} label="To Inventory" />
            <FormControlLabel value="out" control={<Radio />} label="From Inventory" />
          </RadioGroup>
        </FormControl>

        <TextField
          select
          fullWidth
          label="Select Item"
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          margin="normal"
        >
          {itemsState.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.name} (Available: {item.quantity})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="number"
          fullWidth
          label="Quantity"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          margin="normal"
        />

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

        <Card variant="outlined" sx={{ mt: 4, borderRadius: 2 }}>
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
