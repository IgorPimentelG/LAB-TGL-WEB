import { NewBetCart } from '@shared/model/types/bet';

export interface ICart {
    items: NewBetCart[];
    total: number;
}

export interface IItemCart {
    type: string;
    price: number;
    color: string;
    numbers: number[];
    onRemove: (id: number) => void;
    showIcon: boolean;
}