"use client";

import {
   
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    IconButton,
    CardActions,
    Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";
import { Item } from "@/lib/types";
import Link from "next/link";
import { deleteItem } from "@/lib/service/api";
import ConfirmDialog from "@/component/ui/ConfirmDialog";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { addEvent } from "@/lib/service/storage";

interface Props {
    items: Item[];
}

export default function ItemCard({ items }: Props) {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <>
            <Box display={"flex"} flexDirection={'row'} gap={3} mb={5} mr={2} flexWrap={'wrap'} justifyContent={"flex-start"} >
                {items.map((item) => {
                    const lowStock =
                        item.minQuantity !== undefined &&
                        item.quantity < item.minQuantity;

                    return (
                        <>
                            <Box sx={{
                                flex: {
                                    xs: "0 0 100%",
                                    sm: "0 0 calc(50% - 24px)",
                                    md: "0 0 calc(33.333% - 24px)",
                                    lg: "0 0 calc(25% - 24px)",
                                },
                            }}>
                                <Card
                                    sx={{


                                        transition: "0.3s",
                                        borderLeft: lowStock
                                            ? "5px solid #ef4444"
                                            : "5px solid #22c55e",
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            boxShadow: 6,
                                        },
                                    }}
                                >

                                    <CardContent  >
                                        {/* Name */}
                                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                            <InventoryIcon color="primary" />
                                            <Typography variant="h6" noWrap>
                                                {item.name}
                                            </Typography>
                                        </Stack>

                                        {/* Category */}
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <CategoryIcon fontSize="small" color="action" />
                                            <Typography variant="body2">
                                                {item.category || "—"}
                                            </Typography>
                                        </Stack>

                                        {/* Location */}
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <LocationOnIcon fontSize="small" color="action" />
                                            <Typography variant="body2">
                                                {item.location || "—"}
                                            </Typography>
                                        </Stack>

                                        {/* Quantity */}
                                        <Box mt={2}>
                                            <Typography variant="body2">
                                                Quantity:
                                                <strong style={{ marginLeft: 6 }}>
                                                    {item.quantity}
                                                </strong>
                                            </Typography>
                                        </Box>
                                        <Box mt={2}>
                                            <Typography variant="body2">
                                                Price:
                                                <strong style={{ marginLeft: 6 }}>
                                                    ${item.price}
                                                </strong>
                                            </Typography>
                                        </Box>
                                        <Box mt={2}>
                                            <Typography variant="body2">
                                                minQuantity:
                                                <strong style={{ marginLeft: 6 }}>
                                                    {item.minQuantity}
                                                </strong>
                                            </Typography>
                                        </Box>
                                             
                                       
                                        <Box mt={1}>
                                            {lowStock ? (
                                                <Chip label="Low stock" color="error" size="small" />
                                            ) : (
                                                <Chip label="Available" color="success" size="small" />
                                            )}
                                        </Box>
                                    </CardContent>

                                    <CardActions sx={{ justifyContent: "flex-end" }}>
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
                                    </CardActions>
                                </Card>
                            </Box>
                        </>
                    );



                })}
            </Box>

            {/* Confirm Delete */}
            <ConfirmDialog
                open={Boolean(selectedId)}
                title="Delete Item"
                description="Are you sure you want to delete this item?"
                onClose={() => setSelectedId(null)}
                onConfirm={async () => {
                    if (!selectedId) return;

                    try {
                        await deleteItem(selectedId);
                        addEvent({type : 'deleteItem' , message : `item ${items.find(item => item.id === selectedId)?.name || 'Unknown'} deleted with id ${selectedId}`})
                        enqueueSnackbar("Item deleted successfully", {
                            variant: "success",
                        });
                        setSelectedId(null);
                        router.refresh();
                    } catch {
                        enqueueSnackbar("Failed to delete item", {
                            variant: "error",
                        });
                    }
                }}
            />

        </>
    );
}
