import { Item } from "../types";
const API_URL = "https://6962be22d9d64c7619089dfc.mockapi.io" ;
export async function getItems(): Promise<Item[]> {
    const res = await fetch(`${API_URL}/items` 
        ,{ cache:"no-store"});
      if(!res.ok) {
        throw new Error ("Faild to fetch items"); 
      }  
      return res.json() ;
}