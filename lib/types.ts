export interface Products {
    id: string;
    type: 'sapin' | 'chene';
    details: {
        name: string;
        price: number;
        currency: 'USD' | 'CAD'
        thumbnail: string; // URL
        image: string; // URL
    },
}