import axios from 'axios';
// import { TemplateResponse } from '../interface/common';

// import { Employee } from '../../core/interfaces/employee';
// import * as dotenv from 'dotenv';
// dotenv.config();

// const apiUrl = process.env.REACT_APP_API_URL || '';
// console.log(process.env);
// import UserData from '../../shared/data/userData';

const Url171 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://52.40.250.118:8888/webhooks/rest/" : "https://resume.accuick.com/";
const fileUploadUrl = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://52.40.250.118:8888/" : "https://resume.accuick.com/";

const jobSearchUrl = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://52.40.49.193/" : "https://www4.accuick.com/";
// const Url233 = (process.env.NODE_ENV === "development") ? "http://35.155.228.233:41088/Sequence/api/v1/" : "https://resume.accuick.com/Sequence/api/v1/";

// const Url233 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://35.155.228.233:41088/Sequence/" : "https://sequence.accuick.com/Sequence/";

// const Url233 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://34.208.108.171:41088/SequenceApi/" : "https://resume.accuick.com/SequenceApi";

// http://35.155.228.233:41088/Sequence/api/v1/getSequence
// NODE_ENV: "development"
// alert(apiUrl);

class ApiService {


    getSuggessions(data: any): any {
        // http://35.155.202.216:8080/people_search/peoplebyskillncompany
        const header: any = new Headers();
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
        const header: any = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json;charset=UTF-8');
        // axios.get(Url233 + 'getAuditLog');
        return axios.post(
            Url171 + 'people_search/personsearch',
            data,
            header
        );
    }
    sendMessage(data: any): any {
        // http://35.155.202.216:8080/people_search/peoplebyskillncompany
        const header: any = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Content-Type', 'application/json');
        // axios.get(Url233 + 'getAuditLog');
        return axios.post(
            Url171 + 'webhook',
            data,
            header
        );
    }

    uploadFile(data: any) {
        const header: any = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append("Content-Type", "multipart/form-data");
        return axios.post(
            fileUploadUrl + 'api/upload_resume',
            data,
            header
        );
    }

    searchJobTitle(data: any) {
        data = data ? data : "java"
        const header: any = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append("Content-Type", "multipart/form-data");
        let input = { "query": data }
        return axios.post(
            'https://sequence.accuick.com/CloudTalentApi/api/autocomplete',
            input,
            header
        );
        // return axios.get('https://www4.accuick.com/ChatBot/jobTitleSearch.jsp?search=' + data);
    }

    getIpAddress() {
        return axios.get('https://ipinfo.io/json?token=8f59664b32e94b');
    }

}

// [Yesterday 16:42] Anil Kunde https://www4.accuick.com/ChatBot/jobTitleSearch.jsp?search=Angular

export default new ApiService();