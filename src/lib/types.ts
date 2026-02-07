export interface Item {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
  minQuantity?: number;
  price : number ;
}
