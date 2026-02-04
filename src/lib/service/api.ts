import { Item } from "../types";
const API_URL = "https://6962be22d9d64c7619089dfc.mockapi.io";
export async function getItems(): Promise<Item[]> {
  const res = await fetch(`${API_URL}/items`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Faild to fetch items");
  }
  return res.json();
}

export async function addItem(data: Omit<Item, "id">) {
  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to add item");
  }

  return res.json();
}

export async function getItem(id : string): Promise<Item> {
  const res = await fetch(`${API_URL}/items/${id}` ,
    {
      cache: "no-store",
    }
  );
  return res.json();
}


export async function updateItem(
  id: string,
  data: Omit<Item, "id">
) {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteItem(id:string) {
  await fetch(`${API_URL}/items/${id}`,
    {
      method:"DELETE"
    }
  );
  
}


