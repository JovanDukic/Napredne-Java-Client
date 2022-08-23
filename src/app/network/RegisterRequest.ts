import { Country } from "../model/Country";

export class RegisterRequest {

    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    countryDto: Country;

}