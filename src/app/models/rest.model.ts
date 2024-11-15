export interface UserData {
    id?: number;
    name: string;
    birthdate?: string;
    addresses: {
        name: string;
        countryId?: number;
        cityId?: number,
        street: string
    }[];
}

export interface CountryData {
    id: number;
    name: string;
}

export interface CityData {
    id: number;
    name: string;
    countryId?: number;
}