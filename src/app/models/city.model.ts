import { BaseModel } from "./base.model";
import { CityData } from "./rest.model";

export class CityModel extends BaseModel<CityData, CityModel> {
    public id: number = NaN;
    public countryId: number = NaN;
    public name = '';

    public override fromResponse({id, name}: CityData): CityModel {
        this.id = id;
        this.name = name;
        return this;
    }

    public override toResponse(): CityData {
        return {
            id: this.id,
            name: this.name
        };
    }
}