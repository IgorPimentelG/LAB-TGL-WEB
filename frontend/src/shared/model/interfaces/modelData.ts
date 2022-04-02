import { NewBetCart } from '@shared/model/types/bet';

export interface IDataModal {
    title: string;
    text?: string;
    bet?: NewBetCart
    onCancel: () => void;
    onConfirm: () => void;
}