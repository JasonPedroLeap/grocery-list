export interface GroceryItem {
    id: number;
    name: string;
    quantity: number;
    purchased: boolean;
    price?:number;
}

export interface GroceryList {
    id: number;
    title: string;
    items: GroceryItem[];
}