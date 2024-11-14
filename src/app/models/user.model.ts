import { Address, BaseModel, Country } from "./";

export interface User {
    id?: number;
    name: string;
    birthdate?: Date;
    addresses: Address[];
}

export class UserModel extends BaseModel<User, UserModel> implements User {
    public id?: number;
    public name = '';
    public birthdate?: Date;
    public addresses: Address[] = []

    public override fromResponse(response: User): UserModel {
        return new UserModel();
    }

    public override toResponse(): User {
        return {
            id: 0,
            name: '',
            addresses: []
        }
    }
}