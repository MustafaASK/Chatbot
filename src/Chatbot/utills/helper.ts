import moment from 'moment'
export const States = [

    { "name": "Alabama", "key": "AL" },

    { "name": "Alaska", "key": "AK" },

    { "name": "American Samoa", "key": "AS" },

    { "name": "Arizona", "key": "AZ" },

    { "name": "Arkansas", "key": "AR" },

    { "name": "California", "key": "CA" },

    { "name": "Colorado", "key": "CO" },

    { "name": "Connecticut", "key": "CT" },

    { "name": "Delaware", "key": "DE" },

    { "name": "Dist of Columbia", "key": "DC" },

    { "name": "Florida", "key": "FL" },

    { "name": "Georgia", "key": "GA" },

    { "name": "Guam", "key": "GU" },

    { "name": "Hawaii", "key": "HI" },

    { "name": "Idaho", "key": "ID" },

    { "name": "Illinois", "key": "IL" },

    { "name": "Indiana", "key": "IN" },

    { "name": "Iowa", "key": "IA" },

    { "name": "Kansas", "key": "KS" },

    { "name": "Kentucky", "key": "KY" },

    { "name": "Louisiana", "key": "LA" },

    { "name": "Maine", "key": "ME" },

    { "name": "Marshall Islands", "key": "MH" },

    { "name": "Maryland", "key": "MD" },

    { "name": "Massachusetts", "key": "MA" },

    { "name": "Michigan", "key": "MI" },

    { "name": "Micronesia", "key": "FM" },

    { "name": "Minnesota", "key": "MN" },

    { "name": "Mississippi", "key": "MS" },

    { "name": "Missouri", "key": "MO" },

    { "name": "Montana", "key": "MT" },

    { "name": "Nebraska", "key": "NE" },

    { "name": "Nevada", "key": "NV" },

    { "name": "New Hampshire", "key": "NH" },

    { "name": "New Jersey", "key": "NJ" },

    { "name": "New Mexico", "key": "NM" },

    { "name": "New York", "key": "NY" },

    { "name": "North Carolina", "key": "NC" },

    { "name": "North Dakota", "key": "ND" },

    { "name": "Northern Mariana Islands", "key": "MP" },

    { "name": "Ohio", "key": "OH" },

    { "name": "Oklahoma", "key": "OK" },

    { "name": "Oregon", "key": "OR" },

    { "name": "Palau", "key": "PW" },

    { "name": "Pennsylvania", "key": "PA" },

    { "name": "Puerto Rico", "key": "PR" },

    { "name": "Rhode Island", "key": "RI" },

    { "name": "South Carolina", "key": "SC" },

    { "name": "South Dakota", "key": "SD" },

    { "name": "Tennessee", "key": "TN" },

    { "name": "Texas", "key": "TX" },

    { "name": "U.S. Armed Forces America", "key": "AA" },

    { "name": "U.S. Armed Forces Europe", "key": "AE" },

    { "name": "U.S. Armed Forces Pacific", "key": "AP" },

    { "name": "Utah", "key": "UT" },

    { "name": "Vermont", "key": "VT" },

    { "name": "Virgin Islands (US)", "key": "VI" },

    { "name": "Virginia", "key": "VA" },

    { "name": "Washington", "key": "WA" },

    { "name": "West Virginia", "key": "WV" },

    { "name": "Wisconsin", "key": "WI" },

    { "name": "Wyoming", "key": "WY" }]


export const formatDate = (value: any) => {
    let curDate = new Date(value * 1000);
    return moment(curDate.toDateString()).format("MM-DD-YYYY")
}
export const REACT_APP_AMAZON_S3_PATH = "https://ova-qatest.s3.us-west-2.amazonaws.com/curately/"