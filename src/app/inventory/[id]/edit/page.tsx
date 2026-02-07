import { getItem } from "@/lib/service/api";
import EditItemForm from "@/component/inventory/EditItemForm";
import { Typography } from "@mui/material";

interface Props {
  params: { id: string };
}

export default async function EditItemPage(props: Props) {
  const params = await props.params;
  const item = await getItem(params.id);

  console.log("Fetched item in EditItemPage:", item);
  if (!item || item === "Not found") {
    return <div>Item not found</div>;
  }

   return (
    <>
      <Typography variant="h4" gutterBottom ml={3}>
        Edit Item
      </Typography>

      <EditItemForm item={item} />
    </>
  );
}
