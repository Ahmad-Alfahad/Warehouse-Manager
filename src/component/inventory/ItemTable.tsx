"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { useState } from "react";
import ConfirmDialog from "@/component/ui/ConfirmDialog";
import { Item } from "@/lib/types";
import Link from "next/link";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteItem } from "@/lib/service/api";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
interface Props {
  items: Item[];
}

export default function ItemTable({ items }: Props) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {items.map((item) => {
          const lowStock =
            item.minQuantity !== undefined &&
            item.quantity < item.minQuantity;

          return (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                {item.quantity} {item.unit}
              </TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                {lowStock ? (
                  <Chip label="Low" color="error" size="small" />
                ) : (
                  <Chip label="OK" color="success" size="small" />
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  component={Link}
                  href={`/inventory/${item.id}/edit`}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => setSelectedId(item.id)}
                >
                  <DeleteIcon />

                </IconButton>
                <ConfirmDialog
                  open={Boolean(selectedId)}
                  title="Delete Item"
                  description="Are you sure you want to delete this item?"
                  onClose={() => setSelectedId(null)}
                  onConfirm={async () => {
                    if (selectedId) {
                      try {
                        await deleteItem(selectedId);
                        enqueueSnackbar("Item deleted", {
                          variant: "success",
                        });
                        setSelectedId(null);
                        router.refresh();
                      } catch {
                        enqueueSnackbar("Failed to delete item", {
                          variant: "error",
                        });
                      }
                    }
                  }}

                />

              </TableCell>

            </TableRow>
          );
        })}
      </TableBody>
    </Table>

  );

}
