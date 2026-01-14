import { getItem } from "@/lib/service/api";
import EditItemForm from "@/component/inventory/EditItemForm";
import { Typography } from "@mui/material";

interface Props {
  params: { id: string };
}

export default async function EditItemPage({ params }: Props) {
  const item = await getItem(params.id);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit Item
      </Typography>

      <EditItemForm item={item} />
    </>
  );
}
