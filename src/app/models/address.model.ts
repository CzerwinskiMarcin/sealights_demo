import { CityModel, CountryModel } from "./";

export interface Address {
    name: string;
    countryId?: number;
    cityId?: number;
    street: string;
}

export interface AddressModel {
    name: string;
    country: CountryModel;
    city: CityModel;
    street: string;
}