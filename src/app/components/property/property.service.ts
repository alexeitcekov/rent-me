import { Injectable } from '@angular/core';

import config from './../../config/config';
import { RequesterService } from './../../core/requester.service';

import { PropertyType } from './../../models/property/property-type.model';
import { AuthManager } from '../../utils/auth.manager';


const baseCollectionUrl = `/appdata/${config.appKey}`;
const propertyTypeUrl = `${baseCollectionUrl}/propertyType`;
const roomTypeUrl = `${baseCollectionUrl}/rooms`;
const addPropertyUrl = `${baseCollectionUrl}/property`;
const propertiesUrl = addPropertyUrl;
const propertyUrl = addPropertyUrl;
const updatePropertyUrl = addPropertyUrl;

@Injectable()
export class PropertyService{
    constructor(
        public requestService : RequesterService,
        public authManager : AuthManager
    ){

    }

    async getPropertyTypes ()  { // : PropertyType[]
        
        try{

            let isAuth = this.authManager.isAuthenticated();

            let res = await this.requestService.getReq(propertyTypeUrl, isAuth)
            .toPromise();

            //console.log('res');
            //console.log(res);
            if(res['status'] && res['status'] === 401){
                return [];
            }

            return res;
        } catch(e) {
            //console.log(e);
            return [];
        }
    }

    async getRoomTypes()  { // : PropertyType[]
        
        try{

            let isAuth = this.authManager.isAuthenticated();

            let res = await this.requestService.getReq(roomTypeUrl, isAuth)
            .toPromise();

            //console.log(res);
            if(res['status'] && res['status'] === 401){
                return [];
            }

            return res;
        } catch(e) {
            //console.log(e);
            return [];
        }
    }

    async getAllPropertiesByUser() {
        try {

            let result = await this.requestService.getReq(propertiesUrl + `?query={"publisherId": "${this.authManager.getAuth().id}"}`, true).toPromise();

            if(result['status'] && result['status'] === 401){
                return [];
            }
            
            return result;
        } catch (e) {
            console.log(e);
            return [];
        } 
    }

    async getAllProperties(){
        try {

            let isAuth = this.authManager.isAuthenticated();
            
            let result = await this.requestService.getReq(propertiesUrl, isAuth).toPromise();
            
            //console.log(result);
            if(result['status'] && result['status'] === 401){
                
                return [];
            }
            
            return result;

        } catch(e) {
            console.log(e);
            return [];
        } 
    }

    getPropertyById(propertyId, callback){

        let url = addPropertyUrl + '/' + propertyId;

        this.requestService.getReq(url, true)
            .subscribe(res => {
                
                callback(res);

            },
            err => {
                callback(null, err);
            });
    }

    addProperty(property, callback) {

        this.requestService.postReq(addPropertyUrl, property)
            .subscribe(res => {
                console.log(res);
                callback(res);
            },
            err => {
                callback(null, err);
            });
    }

    updateProperty(property, callback) {

        let url = updatePropertyUrl + '/' + property._id;

        this.requestService.put(url, property)
            .subscribe(res => {
                callback(res);
            },
            err => {
                callback(null, err);
            });
    }
}