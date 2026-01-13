import { Item } from "@/lib/types";

interface Props {
  items: Item[];
}

export default function ItemTable({ items }: Props) {
  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2 text-left">Name</th>
          <th className="border p-2 text-left">Category</th>
          <th className="border p-2 text-left">Quantity</th>
          <th className="border p-2 text-left">Location</th>
          <th className="border p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
       
          return (
            <tr key={item.id} className={ "bg-red-50" }>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2">
                {item.quantity} {item.quantity}
              </td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">
                <span className="text-gray-400">Edit | Delete</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
