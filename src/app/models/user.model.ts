import { Address, AddressModel, BaseModel, UserData } from "./";

export interface UserFormData {
    name: string;
    birthdate?: Date;
    addresses: AddressModel[];
}

export class UserModel extends BaseModel<UserData, UserModel> {
    public id?: number;
    public name = '';
    public birthdate?: Date;
    public addresses: Address[] = []

    public override fromResponse(response: UserData): UserModel {
        const {id, name, birthdate, addresses} = response;
        this.id = id;
        this.name = name;
        this.birthdate = birthdate && birthdate !== 'NA' ? new Date(birthdate) : undefined;
        this.addresses = addresses;
        return this;
    }

    public override toResponse(): UserData {
        return {
            id: this.id || undefined,
            name: this.name,
            birthdate: this.birthdate?.toISOString() || undefined,
            addresses: this.addresses.map(address => ({
                name: address.name,
                countryId: address.countryId || undefined,
                cityId: address.cityId || undefined,
                street: address.street
            }))
        };
    }

    public fillFromFormData(userData : UserFormData): UserModel {
        const { name, birthdate = undefined, addresses } = userData;
        this.name = name;
        this.birthdate = birthdate;
        this.addresses = addresses;
        return this;
    }
}