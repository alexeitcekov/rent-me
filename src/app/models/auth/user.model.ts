import { Injectable } from '@angular/core'

import { Role } from './role.model';
import { Property } from './../property/property.model';

@Injectable()
export class User{
    public id : string;
    public username : string;
    public password : string;
    public firstName : string;
    public lastName : string;
    public roleIds : string[];
    //public roles : Role[];
    public canComment : boolean;
    public isBanned : boolean;
    public favoritePropertyIds : string[];
    //public favoriteProperties : Property[]; 
}