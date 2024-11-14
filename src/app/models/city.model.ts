import { BaseModel } from "./base.model";
import { CityData } from "./rest.model";

export interface City {
    id: number,
    countryId: number,
    name: string
}

export class CityModel extends BaseModel<CityData, CityModel> {
    public id: number = NaN;
    public countryId: number = NaN;
    public name = '';

    public override fromResponse({id, countryId, name}: CityData): CityModel {
        this.id = id;
        this.countryId = countryId;
        this.name = name;
        return this;
    }

    public override toResponse(): CityData {
        return {
            id: this.id,
            countryId: this.countryId,
            name: this.name
        };
    }
}