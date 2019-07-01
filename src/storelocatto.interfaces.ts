export interface location {
    brand_pin_logo: string;
    latitude: string;
    loc_address: string;
    loc_name: string;
    loc_phone: string;
    longitude: string;
}

export interface BrandInt {
    brand_background_color: string;
    brand_logo: string;
    brand_name: string;
    countries: string[];
    locations: location[];
}

export interface BrandItemItr extends BrandInt{
    brand_id: string;
}

export interface CityInt {
    city_name: string;
}

export interface CountryInt {
    country_name: string;
    cities: CityInt[];
}

export interface CountryItemIrt extends CountryInt {
    country_id: string;
}
