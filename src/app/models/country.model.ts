import { BaseModel, CountryData } from "./";

export interface Country {
    id: number;
    name: string;
}

export class CountryModel extends BaseModel<CountryData, CountryModel> {
    public id: number = NaN;
    public name = '';

    public override fromResponse({id, name}: CountryData): CountryModel {
        this.id = id,
        this.name = name;
        return this;
    }

    public override toResponse(): CountryData {
        return {
            id: this.id,
            name: this.name
        };
    }
}