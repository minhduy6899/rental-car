interface RentalItem {
    name: string;
    price: number;
    quantity: number;
    description?: string;
    _id: string;
    __v: number;
}

export type Rental = RentalItem[];