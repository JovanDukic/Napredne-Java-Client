import { Checkup } from './Checkup';
import { Country } from './Country';

export class User {

    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public username: string;
    public password: string;
    public age: number;
    public gender: string;
    public phone: string;
    public countryDto: Country;

}