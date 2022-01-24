import { Address } from "./address.model";

export interface Patient {
    name: string;
    surname: string;
    email: string;
    address: Address;
}
