export interface Item {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  minQuantity?: number;
}
