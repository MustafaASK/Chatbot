import axios from 'axios';
// import { TemplateResponse } from '../interface/common';

// import { Employee } from '../../core/interfaces/employee';
// import * as dotenv from 'dotenv';
// dotenv.config();

// const apiUrl = process.env.REACT_APP_API_URL || '';
// console.log(process.env);
// import UserData from '../../shared/data/userData';

const Url171 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://35.155.202.216:8080/" : "https://resume.accuick.com/";

// const Url233 = (process.env.NODE_ENV === "development") ? "http://35.155.228.233:41088/Sequence/api/v1/" : "https://resume.accuick.com/Sequence/api/v1/";

// const Url233 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://35.155.228.233:41088/Sequence/" : "https://sequence.accuick.com/Sequence/";

// const Url233 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://34.208.108.171:41088/SequenceApi/" : "https://resume.accuick.com/SequenceApi";

// http://35.155.228.233:41088/Sequence/api/v1/getSequence
// NODE_ENV: "development"
// alert(apiUrl);

class ApiService {

    
    getSuggessions(data: any): any {
        // http://35.155.202.216:8080/people_search/peoplebyskillncompany
        const header:any = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=UTF-8');
        // axios.get(Url233 + 'getAuditLog');
        return axios.post(
            Url171 + 'peopledata_automation/suggestions',
            data,
            header
        );
    }
    getTableData(data: any): any {
        // http://35.155.202.216:8080/people_search/peoplebyskillncompany
        const header:any = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=UTF-8');
        // axios.get(Url233 + 'getAuditLog');
        return axios.post(
            Url171 + 'people_search/personsearch',
            data,
            header
        );
    }
    getProfileData(data: any): any {
        // http://35.155.202.216:8080/people_search/peoplebyskillncompany
        const header:any = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=UTF-8');
        // axios.get(Url233 + 'getAuditLog');
        return axios.post(
            Url171 + 'people_search/searchbypid',
            data,
            header
        );
    }

}

export default new ApiService();