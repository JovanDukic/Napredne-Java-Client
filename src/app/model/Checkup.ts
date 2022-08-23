import { Time } from "@angular/common";
import { Timestamp } from "rxjs";
import { Ambulance } from "./Ambulance";
import { CovidTest } from "./CovidTest";
import { Doctor } from "./Doctor";
import { User } from "./User";

export class Checkup {

    public id: number;
    public date: Date;
    public userDto: User;
    public doctorDto: Doctor;
    public ambulanceDto: Ambulance;

}