import React, { useState, useRef, useEffect } from "react";
import { Stack, Card, Typography, Box, TextField, Button, Slide, } from "@mui/material";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import TelegramIcon from '@mui/icons-material/Telegram';
import InputAdornment from '@mui/material/InputAdornment';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import ReactScrolableFeed from 'react-scrollable-feed';
import { useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import MobileStepper from '@mui/material/MobileStepper';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel'
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import CancelIcon from '@mui/icons-material/Cancel';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HeightIcon from '@mui/icons-material/Height';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import Link from '@mui/material/Link'
import moment from 'moment';
// import openchat from '../mp/openchatbot.mp3'
// import closechat from '../mp/closechatbot.mp3'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import cxNinjaLogo from '../cxninja-logo.png'
import clientLogo from '../bms_logo_rgb_pos-with-border.png';
import cxNinjaLogo1 from '../image_2023_08_15T08_37_10_603Z.png'
import c from '../Rectangle 99@2x.svg';
import c1 from '../Rectangle 99@2x-1.png'
import profileIcon from '../profile.jpg';
import customerFace from '../chatbot_face.png';
import Chatbotlogo from '../Rectangle 98@2x.svg';
import apiService from "../shared/api/apiService";
import { States } from "./utills/helper";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { formatDate } from "./utills/helper";
import bmslogo from '../bms-logo/bms-logo-svg.svg'
import bmsMainLogo from '../bms-logo/bmslatest.png'
import bmsChildLogo from '../bms-logo/bmslatestchild.png'
import { REACT_APP_AMAZON_S3_PATH } from "./utills/helper";
import './Chatbot.css'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface State extends SnackbarOrigin {
    open: boolean;
}

// const suggesations = [
//     { label: "Searched job title" },
//     { label: "Java" },
//     { label: "React Native" },
//     { label: "Javascript" },
//     { label: "Angular" },
//     { label: "VueJs" },
// ].map(suggestion => ({
//     value: suggestion.label,
//     label: suggestion.label
// }));

interface LoaderProps {
    isBms: boolean;
    // other props...
}

const Loader: React.FC<LoaderProps> = ({ isBms }) => {
    return (<>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3em',
                overflow: 'hidden',

            }}
        >

            <Box
                sx={{
                    animation: 'pulse 1s infinite',
                    color: isBms ? '#BC2BB8' : '#2731DD',
                    '@keyframes pulse': {
                        '0%': {
                            opacity: 0.2,
                            transform: 'translateY(0)',
                        },
                        '50%': {
                            opacity: 0.5,
                            transform: 'translateY(-2px)',
                        },
                        '100%': {
                            opacity: 1,
                            transform: 'translateY(0)',
                        },
                    },
                }}
            >
                <FiberManualRecordIcon sx={{ fontSize: '14px' }} />
            </Box>

            <Box
                sx={{
                    animation: 'typing 1s infinite',
                    color: isBms ? '#BC2BB8' : '#2731DD',
                    '@keyframes typing': {
                        '0%': {
                            opacity: 0.2,
                            transform: 'translateY(0)',
                        },
                        '50%': {
                            opacity: 0.5,
                            transform: 'translateY(-2px)',
                        },
                        '100%': {
                            opacity: 1,
                            transform: 'translateY(0)',
                        },
                    },
                }}
            >
                <FiberManualRecordIcon sx={{ fontSize: '14px' }} />
            </Box>

            <Box
                sx={{
                    animation: 'typing 1s infinite',
                    color: isBms ? '#BC2BB8' : '#2731DD',
                    '@keyframes typing': {
                        '0%': {
                            opacity: 0.2,
                            transform: 'translateY(0)',
                        },
                        '50%': {
                            opacity: 0.5,
                            transform: 'translateY(-2px)',
                        },
                        '100%': {
                            opacity: 1,
                            transform: 'translateY(0)',
                        },
                    },
                }}
            >
                <FiberManualRecordIcon sx={{ fontSize: '14px' }} />
            </Box>

        </Box>
    </>
    );
}

const delay = (ms: any) => new Promise(
    resolve => setTimeout(resolve, ms)
);

type CustomObj = {
    titles: any[],
    type: string
}
type PayloadObj = {
    sender: string,
    message: string,
    metadata: {
        chatbot_type: string,
        job_location: string,
        ip_address: string,
        client_id: string,
        user_id: null | string
    }
};

const test = ['Available Now', 'Available Soon', 'Passively Looking', 'Not Looking']

const Chatbot = () => {

    const location = useLocation();
    let checkUseEffectLoad = false;
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('job_id');
    let tempchatbotType = null;
    const chatbotType = localStorage.getItem("chatbotType");//params.get('type');
    //   alert(chatbotType);
    const valueRef = useRef()
    const [isLoadedData, setIsLoadedData] = useState(false)
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messagesList, setMessagesList] = React.useState<any[] | never[]>([]);
    const [initialButtons, setInitialButtons] = React.useState<any[] | never[]>([]);
    const [intialData, setIntialData] = React.useState<any[] | never[]>([])
    const [initialText, setInitialText] = useState('');
    const [updated, setUpdated] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [intentType, setIntentType] = useState('');
    const [entityType, setEntityType] = useState('');
    const [placeHolderText, setPlaceHolderText] = useState('Type your message');
    const [enableAuto, setEnableAuto] = useState(false);
    const [isSSN, setIsSSN] = useState(false);
    const [newSteps, setNewSteps] = React.useState<any[] | never[]>([]);
    const [isReadmore, setIsReadMore] = useState(false)
    const [selectedJobData, setSelectedJobData] = React.useState<any[] | never[]>([]);
    const [isShowLocation, setIsShowLocation] = useState(false)
    const [isButtonHover, setIsButtonHover] = useState(false)
    const [suggesationObj, setSuggesations] = React.useState<CustomObj>({ titles: [], type: "" });
    const [locationData, setLocationData] = React.useState<any[] | never[]>([]);
    const scrollRef = useRef(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [titleSearchValue, setTitleValue] = React.useState("")
    const dropContainer = useRef<HTMLDivElement>(null)
    const [isDrag, setDrag] = useState(false)
    const open = Boolean(anchorEl);
    const [openAutoComplete, setOpenAutoComplete] = useState(false);
    const closePopper = () => setOpenAutoComplete(false);
    const openPopper = () => setOpenAutoComplete(true);
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const [toaster, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("");
    const [toastrMessage, setToastrMessage] = React.useState("");
    const [fileInputData, setFileData] = React.useState<any | never>(null)
    const [isShowNoResults, setIsShowResults] = useState(false)
    const [defaultTitle, setDefaultTitle] = useState("");
    const [ipLocation, setIpLocation] = useState("");
    const [customerLogo, setCustomerLogo] = useState("");
    const [isReload, setIsReload] = useState(false);
    const [onlyImage, setOnlyImage] = useState(false);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [maskedData, setMaskedData] = useState("");
    // const [clientDetailsLoaded, setClientDetailsLoaded] = useState(false);
    const [clientIdfromParent, setClientId] = useState<any>(null);
    const [jobHours, setJobHours] = useState<any>({
        "1": "Full Time",
        "2": "Part Time",
    });
    const [jobTypesList, setJobTypesList] = useState<any>({
        "1": "Permanent",
        "2": "Contract/Temp",
        "3": "Contract to Perm",
        "4": "Freelance",
    });


    const [workTypesList, setWorkTypesList] = useState<any>({
        "1": "Remote",
        "2": "Hybrid",
        "3": "On-site",

    });
    const [isBms, setIsBms] = useState(false);
    const [clientDetailsLoaded, setClientDetailsLoaded] = useState(false);

    // const isBms = clientIdfromParent === '2' ? true : false

    // console.log('sssssssss', clientIdfromParent)
    // console.log('isBms', isBms)

    const [seek, setSeek] = useState<any>([
    ]);


    //   workTypesList: any =
    //     {
    //       "1": "Remote",
    //       "2": "Hybrid",
    //       "3": "On-site",

    //     };

    const handleCloseMenu = (msg: any, msgObj: any) => {
        setAnchorEl(null);
        if (typeof msg !== 'object') {
            let obj = {
                "text": msgObj.title,
                "payload": msgObj.payload,
                "sent": true,
                "metadata": {
                    "job_id": (queryParam ? queryParam : "1")
                }
            }

            setMessagesList(prevArray => [...prevArray, obj]);
            dataToPass.message = msg;
            dataToPass.metadata.job_location = ipLocation;
            getTableData();
        }

    };
    const stateList: any = {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'American Samoa': 'AS',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'Armed Forces Americas': 'AA',
        'Armed Forces Europe': 'AE',
        'Armed Forces Pacific': 'AP',
        'California': 'CA',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Delaware': 'DE',
        'District Of Columbia': 'DC',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Guam': 'GU',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Marshall Islands': 'MH',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        'Northern Mariana Islands': 'NP',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Pennsylvania': 'PA',
        'Puerto Rico': 'PR',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'US Virgin Islands': 'VI',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virginia': 'VA',
        'Washington': 'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY',
    };
    const convertAbbreviationToFullName = (abbreviation: any) => {
        return stateList[abbreviation] || abbreviation;
    };

    React.useEffect(() => {
        if (!checkUseEffectLoad) {
            // getTableData();
        }
        sessionStorage.setItem("isChatBotIntialized", "false")
        checkUseEffectLoad = true;
        // setLoaded(true);
    }, []);

    React.useEffect(() => {
        // let href = "https://careers.curately.ai/careers/jobs/QADemo/find-jobs"


        // console.log(href.split("careers/")[1].split("/"))
    }, [])

    useEffect(() => {


        const getLocation = async () => {
            try {
                let response = await apiService.getIpAddress();
                let data = response.data;
                restartDataToPass.metadata.ip_address = data.ip
                restartDataToPass.metadata.job_location = (data.city) + "," + convertAbbreviationToFullName(data.region);
                dataToPass.metadata.job_location = (data.city) + "," + convertAbbreviationToFullName(data.region);
                setIpLocation(dataToPass.metadata.job_location);
                dataToPass.metadata.ip_address = data.ip
                console.log('aaassssssssss', response.data)
                setIpAddress(dataToPass.metadata.ip_address)
                getTableData();
                // console.log(ip_address, 'ip_address', ip_address.headers["X-Rl"])
                // let formatted_string = `${data.city},${data.region},${data.country},${data.postal}`;
                // let filter_str = formatted_string.split(",");
                // let final_loc = ""
                // for (let i = 0; i < filter_str.length; i++) {
                //     if (filter_str[i] !== "undefined") {
                //         if (i !== filter_str.length - 1) {
                //             final_loc += filter_str[i] + ","
                //         }
                //         else {
                //             final_loc += filter_str[i];
                //         }
                //     }
                // }
                // console.log(filter_str)
            }
            catch (e) {

            }
        }


        let locationHref = window.parent.location.href;
        // console.log(locationHref, 'locationHref')
        const getClientDetails = async (shortName: any) => {
            // shortName = "qademo";
            try {
                const resp = await apiService.getClientIdByShortName(shortName)
                setApiLoaded(true)
                if (resp.data) {
                    let clientIdtoString = resp.data.clientId.toString()
                    setClientId(clientIdtoString);
                    let isbmspage = locationHref.indexOf("bms");
                    let checkbms = (isbmspage !== -1) ? true : false;
                    // console.log("checkbms");
                    // console.log(checkbms);
                    setIsBms(checkbms)
                    // setIsBms(clientIdtoString === '2' ? true : false)

                    if (!dataToPass.metadata.client_id) {
                        dataToPass.metadata.client_id = clientIdtoString;
                    }
                    if (!restartDataToPass.metadata.client_id) {
                        restartDataToPass.metadata.client_id = clientIdtoString;
                    }
                    if (resp.data.chatLogo) {
                        setCustomerLogo(`${REACT_APP_AMAZON_S3_PATH}${resp.data.chatLogo}`);
                    }
                    getLocation();
                    setClientDetailsLoaded(true);
                }
            }
            catch (e) {
                setApiLoaded(true)
                console.log(e, "errr")
            }
        }
        if (locationHref) {
            let shortName = locationHref.split('/').slice(-2)[1]
            getClientDetails(shortName)
        }

        let paramType: any = params.get('type') ? params.get('type') : "1";
        // debugger
        // if (localStorage.getItem("chatbotType") !== params.get('type') && paramType) {
        //     localStorage.setItem("chatbotType", paramType);
        //     generateNum = generateRandomNumber();
        // } else {
        //     generateNum = localStorage.getItem("uuid");
        // }
        if (localStorage.getItem("uuid") === '' || localStorage.getItem("uuid") === null) {
            localStorage.setItem("chatbotType", paramType);
            generateNum = generateRandomNumber();
        } else {
            generateNum = localStorage.getItem("uuid");
        }

        if (generateNum) {
            generateNum = generateNum.toString();
            restartDataToPass.sender = generateNum ? generateNum.toString() : "";
            dataToPass.sender = generateNum ? generateNum.toString() : "";
            setRandStr(generateNum);
        }
        dataToPass.metadata.chatbot_type = "1"
        if (paramType) {
            dataToPass.metadata.chatbot_type = paramType
        }




        // alert(params.get('type'));
        // tempchatbotType = 

    }, [])


    const handleFileUpload = (id: any) => {
        // const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        // fileInput.click();
        if (id === "file-upload") {
            // console.log('Button Triggered')
            return true;
        } else {
            // console.log("Button not Triggered");
            return false;
        }


    };

    const readFile = async (event: React.ChangeEvent<HTMLInputElement> | any) => {
        console.log(event, "event")
        let fileData = event.target.files ? event.target.files[0] : event.dataTransfer.files[0]
        setFileData(fileData)


    }


    // const ratingStars = () => {
    //     return (
    //         <Stack className="rating">
    //             <Box className="rating-star">
    //                 <input type="radio" value="1" id="star1" />
    //                 <label htmlFor="start1">
    //                     <MoodBadOutlinedIcon className="icon-emoji" sx={{ fill: "#dede11", opacity: "0.8" }} />
    //                     {/* <h4>Not saticfied</h4> */}
    //                 </label>
    //             </Box>
    //             <Box className="rating-star">
    //                 <input type="radio" value="2" id="star2" />
    //                 <label htmlFor="start2">
    //                     <SentimentSatisfiedAltOutlinedIcon className="icon-emoji" sx={{ fill: "#dede11", opacity: "0.8" }} />
    //                     {/* <h4>Saticified</h4> */}
    //                 </label>
    //             </Box>
    //             <Box className="rating-star">
    //                 <input type="radio" value="3" id="star3" />
    //                 <label htmlFor="start3">
    //                     <TagFacesOutlinedIcon className="icon-emoji" sx={{ fill: "#dede11", opacity: "0.8" }} />
    //                     {/* <h4>Good</h4> */}
    //                 </label>
    //             </Box>
    //             <Box className="rating-star">
    //                 <input type="radio" value="4" id="star4" />
    //                 <label htmlFor="start4">
    //                     <EmojiEmotionsOutlinedIcon className="icon-emoji" sx={{ fill: "#dede11", opacity: "0.8" }} />
    //                     {/* <h4>Very Good</h4> */}
    //                 </label>
    //             </Box>
    //             <Box className="rating-star">
    //                 <input type="radio" value="5" id="star5" />
    //                 <label htmlFor="start5">
    //                     <SentimentVerySatisfiedOutlinedIcon className="icon-emoji" sx={{ fill: "#dede11", opacity: "0.8" }} />
    //                     {/* <h4>Excellent</h4> */}
    //                 </label>
    //             </Box>
    //         </Stack>
    //     )
    // }
    const submitFile = async () => {
        dataToPass.metadata.user_id = localStorage.getItem("userId") ? localStorage.getItem("userId") : null;
        let formData = new FormData()
        formData.append("resume", fileInputData)
        formData.set("sender", `${randStr}`);
        formData.set("metadata", JSON.stringify(dataToPass.metadata));
        setLoaded(true);
        try {
            let response = await apiService.uploadFile(formData)
            if (response.data.Success || response.data.success) {
                setLoaded(false);
                let filter_messages = messagesList.filter((message) => {
                    return message.custom?.ui_component !== "resume_upload"
                })
                setMessagesList([...filter_messages]);
                dataToPass.metadata.user_id = response?.data?.userId.toString();
                sendValue(null, `candid ${response.data.userId}`)
                localStorage.setItem("userId", response.data.userId)
                localStorage.setItem("userData", JSON.stringify(response.data))
                sendLoggedDataToParent(response.data)
            } else {
                setLoaded(false);
                setSeverity("error");
                setToastrMessage(response.data.message);
                setOpen(true);
            }
        }
        catch (e) {
            setLoaded(false);
            console.log(e, "err")
        }
    }

    // useEffect(() => {
    //     console.log(fileInputData, 'jjj')
    // }, [fileInputData])

    // handle drag and drop file
    const handleDrag = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDrag(true)
    }
    const handleDragIn = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDrag(true)
    }

    const handleDragOut = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDrag(false)
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            readFile(e)
            e.dataTransfer.clearData()
            setDrag(false)
        }
    }

    useEffect(() => {
        let div = dropContainer?.current
        if (div) {
            div.addEventListener('dragenter', handleDragIn)
            div.addEventListener('dragleave', handleDragOut)
            div.addEventListener('dragover', handleDrag)
            div.addEventListener('drop', handleDrop)
        }
        return () => {
            if (div) {
                div.removeEventListener('dragenter', handleDragIn)
                div.removeEventListener('dragleave', handleDragOut)
                div.removeEventListener('dragover', handleDrag)
                div.removeEventListener('drop', handleDrop)
            }
        }
    }, [messagesList])

    const handleReadMore = (obj: any, flag: any) => {
        let newObj = { ...obj, isDisabled: flag }
        if (obj) {
            setSelectedJobData([newObj]);
        }
        setIsReadMore(!isReadmore)
    }

    const sendValue = (event: any, value: any) => {
        setIsReload((prevState) => !prevState)
        let newArr = [...activeStep];
        // newArr[sliderCount] = { "stepNumber": newArr[sliderCount].stepNumber + 1 }
        setActiveStep(newArr);
        // setActiveStep([{ "stepNumber": 0 }])
        if (value) {
            let obj = {
                "text": (value.search("candid") !== -1) ? "Resume uploaded successfully" : value,
                "payload": '',
                "sent": true,
                "metadata": {
                    "job_id": (queryParam ? queryParam : "1")
                }
            }

            setMessagesList(prevArray => [...prevArray, obj]);
            value = (value.search("candid") !== -1) ? value.split(" ")[1] : value;
            dataToPass.message = `/${intentType}{"${entityType}": "${value}"}`
            dataToPass.metadata.job_location = ipLocation;
            dataToPass.metadata.user_id = localStorage.getItem("userId") ? localStorage.getItem("userId") : null
            setFileData(null)
            // dataToPass.message = type === "input_job_title" ? `/${type}{"job_title": "${value}"}` : `/${type}{"job_location": "${value}"}`;
            getTableData();

        }

        // sendLocValue(null, "california", "input_job_location")

    }

    const sendToParent = (message: any) => {
        // let sendVar = message ? message : false;
        // window.parent.postMessage(message, "*");
        let obj = {
            "bool": message,
            "data": null
        }
        manageDatatoParant(obj)
    }

    const sendToParentNewTab = (message: any) => {
        // let sendVar = message ? message : false;
        // window.parent.postMessage(message, "*");
        let obj = {
            "bool": false,
            "data": null,
            "iframeLoad": message
        }
        manageDatatoParant(obj)
    }

    const manageDatatoParant = (message: any) => {
        // let sendVar = message ? message : false;
        window.parent.postMessage(message, "*");
    }



    const sendLoggedDataToParent = (message: any) => {
        // let sendVar = message ? message : false;
        // window.parent.postMessage(message, "*");
        let obj = {
            "bool": true,
            "data": localStorage.getItem("userData")
        }
        manageDatatoParant(obj)
    }


    // const audioElementOpen = new Audio(openchat);
    // const audioElementClose = new Audio(closechat);

    useEffect(() => {

        setOnlyImage(false)
        let isIntialized = sessionStorage.getItem("isChatBotIntialized");
        if (isIntialized === "false" || isIntialized == null || Object.is(isIntialized, null)) {
            // console.log("is comin her", intialData)
            if (intialData.length) {
                setMessagesList(prevState => [...prevState, ...intialData])
                sessionStorage.setItem("isChatBotIntialized", "true")
            }
            // else {
            //     sessionStorage.setItem("isChatBotIntialized", "false")
            //     getTableData()
            // }

        }
        setLoaded(false);
    }, [isLoadedData, isChatbotOpen])

    const intializeChatBot = () => {
        setIsChatbotOpen(true)
        sendToParent(true)
        // audioElementOpen.play();

    }


    const sendLocationData = () => {
        let locations = locationData.map((val) => val.key);
        let formattedValue = locationData.map((val) => val.name).join();
        let formattedeKyValue = locations.join();
        let obj = {
            "text": formattedValue,
            "payload": '',
            "sent": true,
            "metadata": {
                "job_id": (queryParam ? queryParam : "1")
            }
        }

        setMessagesList(prevArray => [...prevArray, obj]);
        dataToPass.message = `/${intentType}{"${entityType}": "${formattedeKyValue}"}`
        dataToPass.metadata.job_location = ipLocation;
        getTableData();
    }
    const sendLocation = (e: any, value: any) => {
        let filteredValues;
        filteredValues = suggesationObj.titles.filter((suggesation) => !value.includes(suggesation))
        setSuggesations({ ...suggesationObj, titles: filteredValues })
        setLocationData(value)
    }


    const handleTitleChange = async (e: any) => {
        setTitleValue(e.target.value)
        setDefaultTitle(e.target.value)
    }
    const [titleData, setTitleData] = React.useState([])
    useEffect(() => {
        const getJobTitles = async () => {
            try {
                let searchResp = await apiService.searchJobTitle(titleSearchValue);
                let filteredValues = searchResp.data?.list.filter((data: any) => data.title !== "").map((data: any) => data.title)
                setTitleData(filteredValues)
                setSuggesations({ ...suggesationObj, titles: [...filteredValues] })
            }
            catch (e) {
                console.log(e)
            }
        }
        getJobTitles()

    }, [titleSearchValue])

    const sendJobValue = (jobData: any) => {
        let obj = {
            "text": jobData.jobTitle,
            "payload": '',
            "sent": true,
            "metadata": {
                "job_id": (queryParam ? queryParam : "1")
            }
        }

        setMessagesList(prevArray => [...prevArray, obj]);
        // ${jobData.jobId}
        dataToPass.message = `/input_select_job{"select_job": "${jobData.jobId}"}`
        dataToPass.metadata.job_location = ipLocation;
        dataToPass.metadata.user_id = localStorage.getItem("userId") ? localStorage.getItem("userId") : null
        // dataToPass.message = type === "input_job_title" ? `/${type}{"job_title": "${value}"}` : `/${type}{"job_location": "${value}"}`;
        getTableData();

        // sendLocValue(null, "california", "input_job_location")

    }

    const sendLocationValue = (event: any, value: any, type: string) => {
        console.log();
        let obj = {
            "text": value,
            "payload": '',
            "sent": true,
            "metadata": {
                "job_id": (queryParam ? queryParam : "1")
            }
        }

        setMessagesList(prevArray => [...prevArray, obj]);
        dataToPass.message = type === "input_job_title" ? `/${type}{"job_title": "${value}"}` : `/${type}{"job_location": "${value}"}`;
        dataToPass.metadata.job_location = ipLocation;
        getTableData();

        // 

    }

    const handleShowLocation = () => {
        setIsShowLocation(!isShowLocation)
    }



    // const handleSlideIn = () => {
    //     return (Number(activeStep) === 0 || Number(activeStep)) ? true : false;
    // };
    // const clientId = process.env.REACT_APP_CLIENT_ID

    const refineSearchJob = (value: any) => {

        let { refine_job_search_message } = value.custom;
        let obj = {
            "text": "Refine job search",
            "payload": "",
            "sent": true,
        }
        setMessagesList((prevList) => [...prevList, obj])
        dataToPass = {
            "sender": `${randStr}`,
            "message": refine_job_search_message,
            "metadata": {
                "chatbot_type": chatbotType ? chatbotType : "1",
                "job_location": ipLocation,
                "ip_address": ipAddress ? ipAddress : "",
                "client_id": clientIdfromParent,
                "user_id": localStorage.getItem("userId") ? localStorage.getItem("userId") : null
            }
        };
        dataToPass.metadata.job_location = ipLocation;
        getTableData();
    }




    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState<any[]>([{ "stepNumber": 0 }]);
    const [slideDirection, setSlideDirection] = React.useState<'left' | 'right'>('left')
    // const maxSteps = steps.length;
    const [maxSteps, setMaxSteps] = React.useState(0);
    const [sliderCount, setSliderCount] = useState(0)
    const vertical = "top";
    const horizontal = "right";

    const handleNext = (count: any) => {
        let newArr = [...activeStep];
        newArr[count] = { "stepNumber": newArr[count].stepNumber + 1 }
        setActiveStep(newArr);
        setSlideDirection('left');
    };

    const handleBack = (count: any) => {
        let newArr = [...activeStep];
        newArr[count] = { "stepNumber": newArr[count].stepNumber - 1 }
        setActiveStep(newArr);
        setSlideDirection('right');
    };

    const generateRandomNumber = () => {
        const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generate a random number between 1,000,000,000 and 9,999,999,999
        localStorage.setItem("uuid", randomNumber.toString());
        return (randomNumber); // You can remove this line if you don't want to display the number in the console
    }
    let generateNum: any = null; //localStorage.getItem("uuid") ? localStorage.getItem("uuid") : generateRandomNumber();


    const [randStr, setRandStr] = useState("");
    // let randStr = generateRandomNumber();

    // setRandStr(generateNum);

    const toggleChatbot = () => {
        setIsChatbotOpen(true);
        sendToParent(true)
        // setIsTermCardOpen(true)
        localStorage.setItem("isChatOpened", "true")
    };

    const handleExitChatbot = () => {
        setIsChatbotOpen(false)
        // audioElementClose.play()
        sendToParent(false)
        setIsTermCardOpen(false)
    }

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };
    // const handleChange = (event:any) => {
    //     setMessage(event.target.value);
    //   };


    const sendMessage = (msg: any, msgObj: any) => {
        console.log('tit', msg.title)
        console.log('obj', msgObj)

        // debugger
        let obj = {
            "text": msg.title,
            "payload": msg.payload,
            "sent": true,
            "metadata": {
                "job_id": (queryParam ? queryParam : "1")
            }
        }
        // let oldObj =  msgObj;  
        msgObj['hideBtns'] = true;

        setMessagesList(prevArray => {
            prevArray.forEach((arr: any) => {
                if (arr.slideCount) {
                    arr.isDisabled = true
                }
                else {
                    arr.isDisabled = false
                }
            })
            return [...prevArray, obj]
        }
        );
        dataToPass.message = msg.payload;
        dataToPass.metadata.job_location = ipLocation;
        dataToPass.metadata.user_id = localStorage.getItem("userId") ? localStorage.getItem("userId") : null
        getTableData();

        // dataToPass.message = `/${intentType}{"${entityType}": "${formattedeKyValue}"}`

    }
    const sendPayload = (msg: string, msgObj: any) => {
        sessionStorage.setItem("isChatBotIntialized", "true")
        toggleChatbot();
        let obj = {
            "text": msgObj.title,
            "payload": msgObj.payload,
            "sent": true,
            "metadata": {
                "job_id": (queryParam ? queryParam : "1")
            }
        }
        // console.log(msgObj);
        // // let oldObj =  msgObj;  
        // msgObj['hideBtns'] = true;

        setMessagesList(prevArray => {
            // prevArray.forEach((arr: any) => {
            //     if (arr.slideCount) {
            //         arr.isDisabled = true
            //     }
            //     else {
            //         arr.isDisabled = false
            //     }
            // })
            return [...prevArray, obj]
        }
        );
        dataToPass.message = msg;
        dataToPass.metadata.job_location = ipLocation;
        dataToPass.metadata.user_id = localStorage.getItem("userId") ? localStorage.getItem("userId") : null
        getTableData();

    }

    function getMaxCount() {
        let filterJobs = messagesList.filter((message) => message.slideCount);
        let max = filterJobs[0].slideCount;
        for (let i = 0; i < filterJobs.length; i++) {
            if (filterJobs[i].slideCount > max) {
                max = filterJobs[i].slideCount
            }
        }
        return max;
    }

    const handleKeyDown = (event: any) => {
        console.log(event.keyCode);
        console.log(event);
        if (event.key === 'Enter') {
            setIsReload((prevState) => !prevState)
            // 👇 Get input value
            //   console.log(event.target.value);
            // setActiveStep([{ "stepNumber": 0 }])
            setActiveStep((prevState) => [...prevState])
            if (event.target.value !== "" && event.target.value.trim() !== "") {
                let obj = {
                    "text": event.target.value,
                    "payload": '',
                    "sent": true,
                    "metadata": {
                        "job_id": (queryParam ? queryParam : 1)
                    }
                }

                setMessagesList(prevArray => {
                    prevArray.forEach((arr: any) => {
                        if (arr.slideCount) {
                            arr.isDisabled = true
                        }
                        else {
                            arr.isDisabled = false
                        }
                    })
                    return [...prevArray, obj]
                }
                );
                if (intentType === "input_job_location" || intentType === "input_job_title") {
                    dataToPass.message = `/${intentType}{"${entityType}": "${event.target.value}"}`
                } else {
                    dataToPass.message = event.target.value;
                }

                // dataToPass.message = type === "input_job_location" ?  `/${type}{"job_location": "${event.target.value}"}` : `${event.target.value}`;
                // dataToPass.message = event.target.value;
                // console.log(event.target.value);
                dataToPass.metadata.job_location = ipLocation;
                dataToPass.metadata.user_id = localStorage.getItem("userId") ? localStorage.getItem("userId") : null

                getTableData();
            }
        }
    };

    //send text as input 

    const [ipAddress, setIpAddress] = useState('')
    // console.log('ipAddress', ipAddress)

    const getDateFormat = (date: string) => {
        if (date) {
            return moment(date).format("MM/DD/YYYY")
            //   return new Date(date.replace(' ', 'T')).toISOString();
        } else {
            return date;
        }
    }

    const sendTextMessage = () => {
        setIsReload((prevState) => !prevState)
        setActiveStep((prevState) => [...prevState])
        if (inputValue !== "" && inputValue.trim() !== "") {
            let obj = {
                "text": maskedData ? maskedData : inputValue,
                "payload": '',
                "sent": true,
                "metadata": {
                    "job_id": (queryParam ? queryParam : 1)
                }
            }
            // setMessagesList(prevArray => [...prevArray, obj]);
            setMessagesList(prevArray => {
                prevArray.forEach((arr: any) => {
                    if (arr.slideCount) {
                        arr.isDisabled = true
                    }
                })
                return [...prevArray, obj]
            }
            );
            if (intentType === "input_job_location" || intentType === "input_job_title") {
                dataToPass.message = `/${intentType}{"${entityType}": "${inputValue}"}`
            } else {
                dataToPass.message = inputValue;
            }
            dataToPass.metadata.job_location = ipLocation;
            dataToPass.metadata.user_id = localStorage.getItem("userId") ? localStorage.getItem("userId") : null

            setMaskedData("")
            getTableData();
        }


    }



    let dataToPass: PayloadObj = {
        "sender": `${randStr}`,
        "message": "/greet",
        "metadata": {
            "chatbot_type": chatbotType ? chatbotType : "1",
            "job_location": "",
            "ip_address": ipAddress ? ipAddress : "",
            "client_id": clientIdfromParent,
            "user_id": null
        }
    };


    let restartDataToPass = {
        "sender": `${randStr}`,
        "message": "/restart",
        "metadata": {
            "chatbot_type": chatbotType ? chatbotType : "1",
            "job_location": "",
            "ip_address": ipAddress ? ipAddress : "",
            "client_id": clientIdfromParent,
            "user_id": localStorage.getItem("userId") ? localStorage.getItem("userId") : null
        }
    };

    const [restart, setRestart] = useState(true)

    const restartData = () => {
        apiService.sendMessage(restartDataToPass).then((response: any) => {
            setRestart(false)
        })
    }
    const restartData1 = () => {
        apiService.sendMessage(restartDataToPass).then((response: any) => {
            getTableData();
        })
    }

    const cancelUpload = (value: any) => {
        let { cancel_message } = value.custom
        let obj = {
            "text": "cancel",
            "payload": "",
            "sent": true,
        }

        let filter_messages = messagesList.filter((message) => {

            return message.custom?.ui_component !== "resume_upload"

        })
        setMessagesList([...filter_messages, obj]);
        dataToPass = {
            "sender": `${randStr}`,
            "message": cancel_message,
            "metadata": {
                "chatbot_type": chatbotType ? chatbotType : "1",
                "job_location": ipLocation,
                "ip_address": ipAddress ? ipAddress : "",
                "client_id": clientIdfromParent,
                "user_id": localStorage.getItem("userId") ? localStorage.getItem("userId") : null
            }
        };
        setFileData(null)
        dataToPass.metadata.job_location = ipLocation;
        getTableData();
    }

    let isLoadedFirstTime = false;
    // let slideCountArray = []
    useEffect(() => {
        sessionStorage.setItem("isLoadedFirsttime", 'true')
    }, [])

    useEffect(() => {
        if (clientDetailsLoaded) {
            const receiveMessage = (event: any) => {
                // Ensure the message is from the expected origin
                //   if (event.origin !== 'URL_OF_PARENT') {
                //     return;
                //   }


                if (event.data?.data == 'remove') {
                    setMessagesList([]);
                    setRestart(false)
                    console.log('Message received from parent:', event.data.data);
                    dataToPass.metadata.user_id = event.data.data;
                    // localStorage.setItem("userId");
                    localStorage.removeItem("uuid");
                    localStorage.removeItem("userId");
                    restartDataToPass.metadata.user_id = null;
                    dataToPass.metadata.user_id = null;
                    dataToPass.message = "/greet";
                    generateNum = generateRandomNumber();


                    generateNum = generateNum.toString();
                    restartDataToPass.sender = generateNum ? generateNum.toString() : "";
                    dataToPass.sender = generateNum ? generateNum.toString() : "";
                    setRandStr(generateNum);

                    restartData1();

                } else if (event.data?.data) {
                    setMessagesList([]);
                    setRestart(false)
                    console.log('Message received from parent:', event.data.data);
                    dataToPass.metadata.user_id = event.data.data;
                    // localStorage.setItem("userId");
                    localStorage.removeItem("uuid");
                    localStorage.setItem("userId", event.data.data);
                    restartDataToPass.metadata.user_id = event.data.data.toString();
                    dataToPass.metadata.user_id = event.data.data.toString();
                    dataToPass.message = "/greet";
                    generateNum = generateRandomNumber();


                    generateNum = generateNum.toString();
                    restartDataToPass.sender = generateNum ? generateNum.toString() : "";
                    dataToPass.sender = generateNum ? generateNum.toString() : "";
                    setRandStr(generateNum);

                    restartData1();
                    // getTableData();

                    // getTableData();
                    // Handle the data from the parent here
                }
            };

            // Add event listener for message events
            window.addEventListener('message', receiveMessage, false);

            // Cleanup event listener on component unmount
            return () => {
                window.removeEventListener('message', receiveMessage, false);
            };

        }

    }, [clientDetailsLoaded]);



    const getTableData = () => {
        // alert(randStr);
        setInputValue('');
        setEnableAuto(false);
        setLoaded(true);

        if (restart) {
            restartData()
        }

        apiService.sendMessage(dataToPass).then((response: any) => {
            if (!response.error) {
                console.log(checkUseEffectLoad, 'checkUseEffectLoadcheckUseEffectLoad')
                if (checkUseEffectLoad) {
                    setInitialButtons(response.data[0].buttons);
                    setInitialText(response.data[0].text);
                    setIntialData(response.data)
                    setIsLoadedData(true)
                    dataToPass.message = "/job_screening";
                    checkUseEffectLoad = false;
                    // getTableData()
                    // console.log('aaaaaaaaaaaa', response.data)

                } else {
                    setSingle('');
                    if (response.data && response.data.length) {
                        response.data.map((obj: any, i: any) => {
                            setTimeout(function () {
                                const newObject = obj;
                                newObject.sent = false;
                                setIsSSN(false)
                                newObject.jobs = [];
                                newObject.hideBtns = (newObject.buttons && newObject.buttons.length) ? false : true
                                if (obj.custom && Object.keys(obj.custom).length) {
                                    if (obj.custom?.ui_component && obj.custom.ui_component === "job_title") {
                                        setEnableAuto(true);
                                        if (obj.custom.titles?.length) {
                                            setDefaultTitle(obj.custom.titles[0])
                                        }
                                        setSuggesations({
                                            titles: [...titleData],
                                            type: obj.custom.ui_component
                                        });

                                    }
                                    if (obj.custom?.intent) {
                                        setIntentType(obj.custom.intent);
                                        // console.log(`${intentType}`);
                                    }
                                    if (obj.custom?.entity) {
                                        setEntityType(obj.custom.entity);
                                        // console.log(`${entityType}`);
                                    }

                                    if (obj.custom?.ui_component && obj.custom.ui_component === "multi-select") {
                                        // setEnableAuto(true);
                                        // setSuggesations({
                                        //     titles: [...States],
                                        //     type: obj.custom.ui_component
                                        // });
                                        // obj.custom.options
                                        newObject.seek = obj?.custom?.options ? obj.custom.options : [];
                                        newObject.show = true;
                                        setSeek(obj.custom.options);
                                        setseekEmployementSubmt(false)
                                    }

                                    if (obj.custom?.ui_component && obj.custom.ui_component === "workflow" && obj.custom.workflow_url != '') {
                                        sendToParentNewTab(obj.custom.workflow_url);
                                    }

                                    if (obj.custom?.ui_component && obj.custom.ui_component === "job_location") {
                                        // setEnableAuto(true);
                                        // setSuggesations({
                                        //     titles: [...States],
                                        //     type: obj.custom.ui_component
                                        // });
                                    }
                                    if (obj.custom?.ui_component && obj.custom.ui_component === "select_job") {


                                        setInputValue('');
                                        setEnableAuto(false);
                                        newObject.newJobs = [];
                                        newObject.maxSteps = (newObject.custom?.jobs && newObject.custom?.jobs.length) ? newObject.custom?.jobs?.length : 1;

                                        newObject.jobs = newObject.custom?.jobs ? newObject.custom?.jobs : [];

                                        newObject.jobs.forEach((job: any) => {
                                            job.isRealJob = true
                                        })
                                        if (!newObject.jobs.length) {
                                            newObject.jobs.push({ "isRealJob": false })
                                        }

                                        newObject.jobs.push({ "isRealJob": false })
                                        // if (sessionStorage.getItem("isLoadedFirsttime") === "false") {
                                        // if (sessionStorage.getItem("isLoadedFirsttime") === "true") {
                                        setActiveStep((prevState) => [...prevState, { "stepNumber": 0 }])
                                        setSliderCount((prevState) => prevState + 1)
                                        newObject.slideCount = sliderCount + 1;
                                        isLoadedFirstTime = false
                                        // }

                                        console.log(newObject, 'newObject')
                                    }
                                    if (obj.custom?.ui_component && obj.custom.ui_component === "ssn") {
                                        setIsSSN(true)
                                    } else {
                                        setIsSSN(false)

                                    }
                                    sessionStorage.setItem("isLoadedFirsttime", 'false')


                                }


                                setMessagesList(prevArray => {

                                    return [...prevArray, newObject]
                                }
                                );

                                if (i + 1 === response.data.length) {
                                    setLoaded(false);
                                    if (obj.custom?.ui_component && obj.custom.placeholder_text !== "") {

                                        obj.custom?.placeholder_text ? setPlaceHolderText(obj.custom?.placeholder_text) : setPlaceHolderText("Type your message..");

                                    } else {
                                        setPlaceHolderText("Type your message..")
                                    }
                                }

                                setIntialData(prevArray => [...prevArray, newObject])
                                // console.log(messagesList, 'get ta', ref.current)
                                if (obj.custom?.ui_component && obj.custom.ui_component === "select_job") {
                                    // makeJobsCourousal(newObject);
                                }

                            }, (i) * 1000);
                            //   console.log(response.data[0]);

                        })
                        let checkMultiple = response.data.some((obj: any) => {
                            return obj.custom?.ui_component === "multi-select";
                        });

                        if (response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) {
                            setDisableBtn((response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) ? true : false);

                        } else if (checkMultiple) {
                            setDisableBtn(true)
                        } else {
                            setDisableBtn((response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) ? false : false);

                        }
                        // console.log(scrollRef);
                        if (scrollRef.current) {
                            // scrollRef.current.scrollIntoView({ behavior: 'smooth' });
                        }
                        //    setDisableBtn((newObject.buttons && newObject.buttons.length) ? true : false);


                    } else {
                        setLoaded(false);
                        generateNum = generateRandomNumber();
                        generateNum = generateNum.toString();
                        setRandStr(generateNum);
                        dataToPass.sender = `${generateNum}`;
                        dataToPass.message = "/greet";
                        // let dataToPass = {
                        //     "sender": `${randStr}`,
                        //     "message": "/greet",
                        //     "metadata": {
                        //         "chatbot_type": chatbotType ? chatbotType : "1",
                        //         "job_location": ""
                        //     }
                        // };
                        dataToPass.metadata.user_id = localStorage.getItem("userId") ? localStorage.getItem("userId") : null

                        getTableData();
                    }

                }
                // if (response.data && response.data.length) {
                //     response.data.map((obj: any) => {
                //         //   console.log(response.data[0]);
                //         const newObject = obj;
                //         newObject.sent = false;
                //         newObject.hideBtns = (newObject.buttons && newObject.buttons.length) ? false : true
                //         setMessagesList(prevArray => [...prevArray, newObject]);

                //     })
                //     console.log(messagesList);
                //     if (response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) {
                //         setDisableBtn((response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) ? true : false);

                //     } else {
                //         setDisableBtn((response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) ? false : false);

                //     }
                //     console.log(scrollRef);
                //     if (scrollRef.current) {
                //         // scrollRef.current.scrollIntoView({ behavior: 'smooth' });
                //     }
                //     //    setDisableBtn((newObject.buttons && newObject.buttons.length) ? true : false);


                // } else {
                //     console.log(checkUseEffectLoad);
                //     if (checkUseEffectLoad) {
                //         dataToPass.message = "/job_screening";
                //         checkUseEffectLoad = false;
                //         getTableData();

                //     }
                // }

            } else {
                setSeverity("error");
                setToastrMessage(response.message);
                setOpen(true);
            }
        }).catch((error: any) => {
            setSeverity("error");
            setToastrMessage("something went wrong");
            setOpen(true);
        })
    }


    const [isTermCardOpen, setIsTermCardOpen] = useState(false)
    const [isTermAccept, setIsTermAccept] = useState(false)
    const [isTermDecline, setIsTermDecline] = useState(false)

    const handleIsReviewTerm = () => {
        setIsTermCardOpen(!isTermCardOpen)
        setIsChatbotOpen(true)
        sendToParent(true)
        setIsTermAccept(false)
        setIsTermDecline(false)
    }

    const handleIsTermDeclined = () => {
        setIsTermAccept(false)
        setIsTermDecline(true)
        setIsTermCardOpen(false)
    }

    const handleTermAccept = () => {
        setIsTermAccept(true)
        setIsTermCardOpen(false)
        setIsTermDecline(false)
    }


    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    const currentTime = new Date()
    const currentDate = currentTime.getDate()
    const currentYear = currentTime.getFullYear()
    const currentMonth = monthNames[currentTime.getMonth()]
    const currentHours24 = currentTime.getHours()
    const currentHours12 = (currentHours24 % 12) || 12
    const currentMinutes = currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes()
    const amOrPm = currentHours24 >= 12 ? 'PM' : 'Am'

    const checkZipZeros = (str: any) => {
        if (str && str.length) {
            str = str.replace(/, 00000/g, '');
            str = str.replace(/, 0000/g, '');
        }

        return str;
    }
    // console.log('activeSteppppppppppp', activeStep)
    // console.log('messagesListssssssss', messagesList)

    const textWithLineBreaks = (props: any) => {
        // console.log(props);
        const textWithBreaks = props?.split('\n').map((text: any, index: any) => (
            <React.Fragment key={index}>
                {text}
                <br />
            </React.Fragment>
        ));

        return <div>{textWithBreaks}</div>;
    }

    const removeTags = (text: any) => {
        return text;
        const doc = new DOMParser().parseFromString(text, 'text/html');
        if (doc.body.children.length > 0) {
            return doc.body.textContent || "";
        } else {
            return text; // No tags found, return original content
        }
    }

    const [selectedSeekBtns, setSelectedSeekBtns] = useState<any>([]);
    const [selectedAnyBtn, setSelectedAnyBtn] = useState<any>([]);
    const [seekEmployementSubmt, setseekEmployementSubmt] = useState(false)
    const [anyText, setAnyText] = useState("")

    const handleSeekBtn = (btn: any) => {
        if (!seekEmployementSubmt) {
            if (selectedSeekBtns.includes(btn)) {
                setSelectedSeekBtns(selectedSeekBtns.filter((selectedBtn: any) => selectedBtn !== btn));
            } else {
                setSelectedSeekBtns([...selectedSeekBtns, btn]);
            }

            setSelectedAnyBtn([])
        }
    }

    const handelSelectAny = (btn: any, key: any) => {
        if (!seekEmployementSubmt) {
            if (selectedAnyBtn.includes(btn)) {
                setSelectedAnyBtn(selectedAnyBtn.filter((selectedBtn: any) => selectedBtn !== btn));

            } else {
                setSelectedAnyBtn([...selectedAnyBtn, btn]);
            }

            setAnyText(key)
        }
    }

    useEffect(() => {
        if (selectedAnyBtn.length) {
            setSelectedSeekBtns([]);
            setSelectedSeekBtns([...selectedAnyBtn])
        }

    }, [JSON.stringify(selectedAnyBtn)])

    var actVal = "";
    function checkSSN(event: any) {
        if (event?.target?.value.length == 9) {
            return false
        }
        var key = event?.keyCode || event?.charCode;
        if (event?.target?.value.length) {
            if (key == 8 || key == 46) {
                //actVal = event?.target?.value;
                return false;
            }
            actVal += event?.key;
            setTimeout(() => {
                var starVal = actVal.replace(/\d/g, "*")
                event.target.value = starVal
            }, 500)
            console.log(actVal, "is coming")
        }
    }

    var actualSSN = '';
    var pattern = /^[0-9]+$/;
    const converToSSN = (event: any) => {
        const enteredkey = event.key;
        const keyCode = event.keyCode;
        const matched = enteredkey.match(pattern);
        console.log(matched);
        if (keyCode !== 8 && keyCode !== 32 && keyCode !== 13 && matched && inputValue.length < 9) {

            actualSSN = inputValue + enteredkey;
            const semiMask = maskedData + enteredkey;
            setMaskedData(semiMask);
            setInputValue(actualSSN);
            setTimeout(function () {
                const stars = actualSSN.replace(/./g, '*');
                setMaskedData(stars);
            }, 500);

        }
        if (keyCode === 8) {
            const delSubstr = inputValue.substring(0, inputValue.length - 1);
            setInputValue(delSubstr);
            const stars = delSubstr.replace(/./g, '*');
            setMaskedData(stars);
        }

    }

    const seekSubmit = (msgObj: any, text: String) => {
        // setseekEmployementSubmt(true) 

        let formattedeKyValue = selectedSeekBtns.join();
        let formatValues: any = [];

        selectedSeekBtns.forEach((job: any) => {
            // job.isRealJob = true
            // console.log(job);
            let filterArr = seek.filter((data: any) => data.value == job)
            if (filterArr && filterArr.length) {
                formatValues.push(filterArr[0].key);
            }
            // console.log(filterArr);
            // seek.
            // formatValues.push()
        })
        let textVal = ''
        if (selectedAnyBtn.length) {
            textVal = anyText;
        }
        else {
            textVal = formatValues.join();
        }


        let obj = {
            "text": textVal,
            "payload": '',
            "multiSelect": formatValues,
            "sent": true,
            "metadata": {
                "job_id": (queryParam ? queryParam : "1")
            }
        }

        if (text == 'cancel') {
            dataToPass.message = 'back';
            obj.text = 'Back';
            delete obj.multiSelect;

        } else {
            dataToPass.message = `${formattedeKyValue}`;
        }
        dataToPass.metadata.user_id = localStorage.getItem("userId") ? localStorage.getItem("userId") : null
        msgObj['show'] = false;

        setMessagesList(prevArray => [...prevArray, obj]);
        dataToPass.metadata.job_location = ipLocation;
        setSelectedSeekBtns([]);
        setSelectedAnyBtn([])
        getTableData();
        setseekEmployementSubmt(true)
    }

    const [single, setSingle] = useState('')
    const [singleObj, setSingleObj] = useState()
    const [singleSelected, setSingleSelected] = useState('')

    const handleSingleSelect = (item: any) => {
        if (item) {
            setSingle(item.title);
            setSingleObj(item)
            console.log('Selected:', item);
        }
    };

    const handleSingleSubmit = (msgObj: any) => {
        setSingleSelected(msgObj.title)
    }

    return (
        <Stack sx={{
            display: (apiLoaded ? 'flex' : 'none'), flexDirection: 'row', justifyContent: 'flex-end',
            alignItems: 'flex-end', right: 500
        }}>
            <Stack sx={{ display: isTermCardOpen ? 'block' : 'none', height: '500px', bottom: '20px' }}>
                <Card sx={{ width: '350px', position: 'relative', right: '415px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', }}>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottom: '1px solid lightgrey', p: 1, maxHeight: '80px' }}>
                        <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box>
                                <img
                                    src={customerLogo ? customerLogo : customerFace}
                                    alt='avatar'
                                    style={{
                                        height: '35px',
                                        width: '35px',
                                    }}
                                />
                            </Box>
                            <Typography
                                sx={{ fontSize: '12px' }}
                            >
                                Hello, I'm CXninja SmartBot, your personal recruiting assistant. Before we
                                get started i'd like to make sure you have had a chance to
                                read and agree to the terms below:
                            </Typography>
                        </Stack>
                        <Box sx={{ cursor: 'pointer' }}>
                            <CloseSharpIcon sx={{ fontSize: '15px' }} onClick={handleIsReviewTerm} />
                        </Box>
                    </Stack>

                    <Stack sx={{ p: 1, pl: 2, pr: 2, maxHeight: '300px', overflowY: 'scroll' }}>
                        <Typography sx={{ fontSize: '12px', fontStyle: 'italic', mt: 1 }}>
                            By using our chatbot, you understand that Curately
                            will collect certain information that includes personal data about you
                            like your job interest, location, your contact details, and other
                            information that you share through this tool. This tool is managed by
                            Curately.AI, a Curately approved third party. Our recruiters and hiring
                            managers will use this information for recruiting, where needed to get in
                            touch with you, and for statistical and improvement purposes.
                        </Typography>

                        <Typography sx={{ fontSize: '12px', fontStyle: 'italic', mt: 2 }}>
                            <Box component='span' sx={{ fontWeight: 600 }}>Terms:</Box> By using this tool, you agree to these terms and understand how
                            Curately will use your personal data for these purposes.
                        </Typography>

                        <Typography sx={{ fontSize: '12px', fontStyle: 'italic', mt: 4, mb: 4 }}>
                            <Box component='span' sx={{ fontWeight: 600 }}>Privacy</Box> For more information about how Curately handles your personal
                            data or to exercise your rights, please visit our <Box component='span' sx={{ color: '#146EF6' }}>privacy Notice Center</Box> or
                            contact our Data Protection officer <Box component='span' sx={{ color: '#146EF6' }}>dpo@curately.com</Box>
                        </Typography>
                    </Stack>

                    {/* <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: 1, borderTop: '1px solid lightgrey' }}>
                        <Button
                            onClick={handleIsTermDeclined}
                            variant="contained"
                            disableRipple
                            sx={{
                                backgroundColor: '#146EF6',
                                width: '75px',
                                height: '30px',
                                textTransform: 'capitalize',
                                boxShadow: 0,
                                '&:hover': {
                                    backgroundColor: '#146EF6',
                                    boxShadow: 0,
                                }
                            }}
                        >
                            Decline
                        </Button>
                        <Button
                            variant="contained"
                            disableRipple
                            sx={{
                                backgroundColor: '#146EF6',
                                width: '75px',
                                height: '30px',
                                textTransform: 'capitalize',
                                boxShadow: 0,
                                '&:hover': {
                                    backgroundColor: '#146EF6',
                                    boxShadow: 0,
                                }
                            }}
                            onClick={handleTermAccept}
                        >
                            Accept
                        </Button>
                    </Stack> */}
                </Card>
            </Stack>

            <Stack
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    // position: 'absolute',
                    // bottom: 0
                }}
                mr={5}
                className="main_cls"
            >
                {/* {!isChatbotOpen ? ( */}


                <Card
                    sx={{
                        width: '375px',
                        '& .MuiPaper-root.MuiCard-root ': {
                            pt: 0,
                        },
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                        borderBottomLeftRadius: '15px',
                        position: 'absolute',
                        zIndex: isChatbotOpen ? 4 : -1,
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                        // right: '40px',
                        transform: isChatbotOpen ? 'translate(-5%,-5%)' : 'translateY(5%)',
                        transition: 'all .1s ease-out',
                        transformOrigin: "bottom right",
                        opacity: isChatbotOpen ? 1 : 0,
                        display: isReadmore ? 'none' : 'block',

                    }}

                    className="chat-width"
                >
                    <Stack id='header-container'
                        sx={{
                            backgroundImage: isBms ? 'none' : 'linear-gradient(to right,#2731DD, #137CED)',
                            backgroundColor: isBms ? '#EDE7E7' : 'none',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        direction='row'
                        spacing={2}
                        p='15px'
                        maxHeight='30px'
                    >
                        <Stack
                            direction='row'
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            spacing={2}
                        >
                            <Box>
                                {isBms ?
                                    (<img
                                        src={bmsChildLogo}
                                        alt='avatar'
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            borderRadius: '50%',

                                        }}

                                    />) : (<img
                                        src={customerLogo ? customerLogo : customerFace}
                                        alt='avatar'
                                        style={{
                                            // boxShadow: '0px 5px 10px 0px rgba(255, 255, 255, 0.5)',
                                            height: '32px',
                                            width: '32px',
                                            borderRadius: '50%',
                                        }}

                                    />)
                                }
                            </Box>
                            <Typography
                                sx={{ color: isBms ? '#333333' : '#ffffff', fontSize: '17px', fontWeight: 500, marginLeft: '8px' }}
                            >
                                {/* CXninja <Box component='span' sx={{ fontWeight: 400 }}>SmartBot</Box> */}
                                {isBms ? 'Vivian' : 'Ripley'}
                            </Typography>
                        </Stack>

                        <Stack
                            direction='row'
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            spacing={2}
                        >
                            <Stack >
                                {/* <img
                                    src={clientLogo}
                                    alt='cxNinja'
                                    style={{
                                        width: '150px'
                                    }}
                                /> */}
                            </Stack>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <div >
                                    {isBms ? <img src={bmslogo} alt="" style={{ height: '20px', width: '110px', marginRight: '10px' }} /> : ""}
                                </div>
                                <Box component='div' onClick={handleExitChatbot} >
                                    <CloseSharpIcon sx={{ color: isBms ? '#333333' : '#ffffff', fontSize: '18px', cursor: 'pointer' }} />
                                </Box>
                            </div>
                        </Stack>
                    </Stack>

                    {/* {isTermAccept ? */}
                    <Stack ref={scrollRef}
                        id='content-container'
                        sx={{
                            backgroundColor: '#ffffff', overflowY: 'scroll', maxHeight: '385px', minHeight: '350px', mb: '5px', display: isTermDecline ? 'none' : 'block'
                        }} >

                        <ReactScrolableFeed >

                            {/* <Stack sx={{ pl: '10px', pb: '10px', pt: '10px' }}>
                                <Typography component='p' sx={{ fontSize: '13px', color: '#374458' }}>
                                    The information you provide to the careers website <br />
                                    and chatbot will be collected to improve your <br />
                                    experience. Please read our
                                    <Box component='span'
                                        sx={{
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            pl: "5px",
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}>Privacy Policy
                                    </Box> to see how <br />
                                    we are storing and protecting your data, as well as <br />
                                    our <Box component='span'
                                        sx={{
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}>
                                        Terms of Use.
                                    </Box>
                                </Typography>
                            </Stack> */}

                            {/* <Stack sx={{ backgroundColor: '#fbfbfb', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', m: '25px', borderRadius: '30px', border: '1px solid #e2e2e2', borderStyle: 'dashed' }}>
                            <Box sx={{ backgroundColor: '#e2e2e2', height: '100px', width: '100px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', mb: '15px' }}>

                                <Box >
                                    <UploadFileIcon sx={{
                                        fontSize: '40px',
                                        color: 'white',
                                    }} />
                                </Box>

                            </Box>
                            <Typography>Drag & drop file to upload</Typography>
                            <Box sx={{ mt: '15px', mb: '15px' }}>
                                <input type="file" id="file-upload" style={{ display: 'none' }} />
                                <label htmlFor="file-upload">
                                    <Button
                                        onClick={handleFileUpload}
                                        variant="contained"
                                        disableRipple

                                        sx={{
                                            borderRadius: '5px', textTransform: 'capitalize', backgroundColor: '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '16px', height: '34px', boxShadow: 0,
                                            '&:hover': {
                                                backgroundColor: '#146EF6',
                                                boxShadow: 0
                                            }
                                        }}>
                                        Upload new Resume

                                    </Button>
                                </label>
                            </Box>
                            <Typography sx={{ fontWeight: 400, fontSize: '14px', textDecoration: 'underline', cursor: 'pointer' }}>
                                Cancel
                            </Typography>
                        </Stack> */}

                            {/* <Stack sx={{ p: '25px', height: '300px' }}>
                            <Stack sx={{
                                backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', height: '10px',
                            }}>
                                <Stack sx={{ backgroundColor: '#ffffff', mt: 1, borderRadius: '2px', height: '350px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
                                    <Box sx={{ p: 1 }}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Sales</Typography>
                                    </Box>

                                    <Stack sx={{ p: 2 }} direction='column' spacing={2}>

                                        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Manager, Manufacturing Sales</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <Box>
                                                <LocationOnOutlinedIcon sx={{ fontSize: '20px' }} />
                                            </Box>
                                            <Box sx={{ pl: '10px' }}>
                                                <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Philadelphia, PA, United States of America</Typography>
                                                <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>+11 locations</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Box>
                                                <CalendarTodayIcon sx={{ fontSize: '15px' }} />
                                            </Box>
                                            <Box sx={{ pl: '10px' }}>
                                                <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>Posted 6days ago</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Box>
                                                <AccessTimeIcon sx={{ fontSize: '15px' }} />
                                            </Box>
                                            <Box sx={{ pl: '10px' }}>
                                                <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>Full Time</Typography>
                                            </Box>
                                        </Box>

                                    </Stack>

                                    <Box>
                                        <Button
                                            disableRipple
                                            onClick={handleReadMore}
                                            endIcon={<KeyboardArrowRightIcon />}
                                            sx={{
                                                textTransform: 'capitalize',
                                                '& .MuiButton-endIcon': {
                                                    mr: 0,
                                                    ml: '-5px'
                                                },
                                                '& .MuiButton-endIcon>*:nth-of-type(1)': {
                                                    fontSize: '25px'
                                                },
                                                '&:hover': {
                                                    backgroundColor: '#ffffff'
                                                }

                                            }}
                                        >
                                            Read More
                                        </Button>
                                    </Box>

                                    <Box sx={{ textAlign: 'center', pb: 3, pl: 1, pr: 1 }}>
                                        <Button
                                            variant="contained"
                                            disableRipple
                                            sx={{
                                                borderRadius: '5px', textTransform: 'capitalize', backgroundColor: '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '16px', height: '34px', boxShadow: 0, width: '100%',
                                                '&:hover': {
                                                    backgroundColor: '#146EF6',
                                                    boxShadow: 0
                                                }
                                            }}
                                        >
                                            I'm Interested
                                        </Button>
                                    </Box>
                                </Stack>

                            </Stack>
                        </Stack>

                        <Stack sx={{ p: '25px', height: '270px' }}>
                            <Stack sx={{
                                backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', height: '10px',
                            }}>
                                <Stack sx={{ backgroundColor: '#ffffff', mt: 1, borderRadius: '2px', height: '350px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', textAlign: 'center' }}>

                                    <Stack sx={{ mt: 1 }}>
                                        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} direction='row' spacing={2}>
                                            <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                            <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                            <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                        </Stack>

                                        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} direction='row' spacing={2}>
                                            <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                            <SearchIcon sx={{ fontSize: '50px', zIndex: 5 }} />
                                            <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                        </Stack>

                                        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} direction='row' spacing={2}>
                                            <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                            <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                            <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                        </Stack>

                                    </Stack>

                                    <Typography sx={{ mt: 1, mb: 1, fontSize: '16px', fontWeight: 600 }}>Here's what you can do.</Typography>

                                    <Box sx={{ mr: 1, ml: 1 }}>
                                        <Button variant="outlined"
                                            disableRipple
                                            sx={{
                                                width: '100%', mb: 1, borderColor: '#146EF6', boxShadow: 0,
                                                fontSize: '14px', fontWeight: 400, textTransform: 'capitalize',
                                                '&:hover': {
                                                    backgroundColor: '#146EF6',
                                                    boxShadow: 0,
                                                    color: '#ffffff'
                                                }
                                            }}
                                        >
                                            Set Job Alert
                                        </Button>
                                        <Button variant="contained"
                                            disableRipple
                                            sx={{
                                                width: '100%', mb: 1, backgroundColor: '#146EF6', boxShadow: 0,
                                                fontSize: '14px', fontWeight: 400, textTransform: 'capitalize',
                                                '&:hover': {
                                                    backgroundColor: '#146EF6',
                                                    boxShadow: 0
                                                }
                                            }}
                                        >
                                            Refine Job Search
                                        </Button>
                                    </Box>
                                </Stack>

                            </Stack>
                        </Stack> */}

                            {/* <Stack sx={{
                            mb: 3, '&& .css-ohwg9z': {
                                overflow: 'unset'
                            }
                        }}>
                     <Carousel cycleNavigation={false} animation="slide" autoPlay={false}

                                NavButton={({ onClick, style, next }) => (
                                    <Box
                                        style={{
                                            ...style,
                                            position: 'absolute',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            left: next ? 'auto' : 0,
                                            right: next ? 0 : 'auto',

                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            disableRipple
                                            sx={{
                                                height: '50px', width: '20px', minWidth: '35px', ml: 1.5, mr: 1.5, backgroundColor: '#ffffff', color: '#146EF6', boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                                                '&:hover': {
                                                    backgroundColor: '#146EF6 !important',

                                                    color: '#ffffff'
                                                }
                                            }}
                                            onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
                                        >
                                            {next ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                                        </Button>
                                    </Box>
                                )}
                            >

                                <Stack sx={{ p: '25px', height: '300px' }}>
                                    <Stack sx={{
                                        backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', height: '10px',
                                    }}>
                                        <Stack sx={{ backgroundColor: '#ffffff', mt: 1, borderRadius: '2px', height: '350px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', textAlign: 'center' }}>

                                            <Stack sx={{ mt: 1 }}>
                                                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} direction='row' spacing={2}>
                                                    <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                    <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                    <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                </Stack>

                                                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} direction='row' spacing={2}>
                                                    <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                    <SearchIcon sx={{ fontSize: '50px', zIndex: 5 }} />
                                                    <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                </Stack>

                                                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} direction='row' spacing={2}>
                                                    <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                    <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                    <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                </Stack>

                                            </Stack>

                                            <Typography sx={{ mt: 1, mb: 1, fontSize: '16px', fontWeight: 600 }}>Here's what you can do.</Typography>

                                            <Box sx={{ mr: 1, ml: 1 }}>
                                                <Button variant="outlined"
                                                    disableRipple
                                                    sx={{
                                                        width: '100%', mb: 1, borderColor: '#146EF6', boxShadow: 0,
                                                        fontSize: '14px', fontWeight: 400, textTransform: 'capitalize',
                                                        '&:hover': {
                                                            backgroundColor: '#146EF6',
                                                            boxShadow: 0,
                                                            color: '#ffffff'
                                                        }
                                                    }}
                                                >
                                                    Set Job Alert
                                                </Button>
                                                <Button variant="contained"
                                                    disableRipple
                                                    sx={{
                                                        width: '100%', mb: 1, backgroundColor: '#146EF6', boxShadow: 0,
                                                        fontSize: '14px', fontWeight: 400, textTransform: 'capitalize',
                                                        '&:hover': {
                                                            backgroundColor: '#146EF6',
                                                            boxShadow: 0
                                                        }
                                                    }}
                                                >
                                                    Refine Job Search
                                                </Button>
                                            </Box>
                                        </Stack>

                                    </Stack>
                                </Stack>



                                <Stack sx={{ p: '25px', height: '300px' }}>
                                    <Stack sx={{
                                        backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', height: '10px',
                                    }}>
                                        <Stack sx={{ backgroundColor: '#ffffff', mt: 1, borderRadius: '2px', height: '350px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
                                            <Box sx={{ p: 1 }}>
                                                <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Sales</Typography>
                                            </Box>

                                            <Stack sx={{ p: 2 }} direction='column' spacing={2}>

                                                <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Manager, Manufacturing Sales</Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                    <Box>
                                                        <LocationOnOutlinedIcon sx={{ fontSize: '20px' }} />
                                                    </Box>
                                                    <Box sx={{ pl: '10px' }}>
                                                        <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Philadelphia, PA, United States of America</Typography>
                                                        <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>+11 locations</Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Box>
                                                        <CalendarTodayIcon sx={{ fontSize: '15px' }} />
                                                    </Box>
                                                    <Box sx={{ pl: '10px' }}>
                                                        <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>Posted 6days ago</Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Box>
                                                        <AccessTimeIcon sx={{ fontSize: '15px' }} />
                                                    </Box>
                                                    <Box sx={{ pl: '10px' }}>
                                                        <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>Full Time</Typography>
                                                    </Box>
                                                </Box>

                                            </Stack>

                                            <Box>
                                                <Button
                                                    disableRipple
                                                    onClick={handleReadMore}
                                                    endIcon={<KeyboardArrowRightIcon />}
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        '& .MuiButton-endIcon': {
                                                            mr: 0,
                                                            ml: '-5px'
                                                        },
                                                        '& .MuiButton-endIcon>*:nth-of-type(1)': {
                                                            fontSize: '25px'
                                                        },
                                                        '&:hover': {
                                                            backgroundColor: '#ffffff'
                                                        }

                                                    }}
                                                >
                                                    Read More
                                                </Button>
                                            </Box>

                                            <Box sx={{ textAlign: 'center', pb: 3, pl: 1, pr: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    disableRipple
                                                    sx={{
                                                        borderRadius: '5px', textTransform: 'capitalize', backgroundColor: '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '16px', height: '34px', boxShadow: 0, width: '100%',
                                                        '&:hover': {
                                                            backgroundColor: '#146EF6',
                                                            boxShadow: 0
                                                        }
                                                    }}
                                                >
                                                    I'm Interested
                                                </Button>
                                            </Box>
                                        </Stack>

                                    </Stack>
                                </Stack>

                            </Carousel> 

                        </Stack> */}


                            {/* sx={{ display: activeStep === 0 ? 'none' : 'block', mb: '60px', zIndex: 5, position: 'absolute', left: 0, height: '25px' }} */}
                            {/* // component='div'
                            // onMouseEnter={() => setIsButtonHover(true)}
                            // onMouseLeave={() => setIsButtonHover(false)} */}




                            <div >
                                {messagesList.map((msgObj) => (
                                    <>
                                        {msgObj.sent ?
                                            (<>
                                                <Stack sx={{ pt: '10px' }} direction='column' p={0.5} alignItems='flex-end' >
                                                    <Stack direction='row' spacing={0.5} mr={1} ml={1}>
                                                        <Stack sx=
                                                            {{
                                                                backgroundColor: isBms ? '#BC2BB8' : '#146EF6', borderRadius: '24px', p: 0.5, display: 'flex', flexDirection: 'row', justifyContent: 'center', borderBottomRightRadius: "5px", outline: "1px solid transparent", boxShadow: isBms ? '0px 2px 3px 0px #0000001F' : ''
                                                            }}

                                                        >
                                                            {
                                                                msgObj?.multiSelect && msgObj?.multiSelect.length ?
                                                                    <>
                                                                        <div className="submtd-emply-main-con">


                                                                            <div className="submtd-emply-con">

                                                                                {msgObj.multiSelect.map((employment: any) => (
                                                                                    <div
                                                                                        key={employment}
                                                                                        className="seek-emply-para-con"
                                                                                    >
                                                                                        <CheckIcon className="seek-check-icon" />
                                                                                        <p
                                                                                            className="seek-emply-text"
                                                                                        >
                                                                                            {employment}
                                                                                        </p>
                                                                                    </div>
                                                                                ))}

                                                                            </div>

                                                                        </div>
                                                                    </>
                                                                    :

                                                                    <>
                                                                        {singleSelected ? (
                                                                            <div className="single-para-con">
                                                                                <CheckIcon className="seek-check-icon" />
                                                                                <p className="seek-emply-text">
                                                                                    {single}
                                                                                </p>
                                                                            </div>

                                                                        ) : (
                                                                            <Typography component='p' sx={{ color: '#ffffff', padding: '5px', textAlign: 'left', fontSize: "13px" }}>
                                                                                {msgObj.text}
                                                                            </Typography>
                                                                        )}
                                                                    </>

                                                            }


                                                        </Stack>

                                                        <Stack>
                                                            <img src={profileIcon} style={{ height: '30px', width: '30px' }} alt="chatbot" />
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </>) :
                                            (<>
                                                {msgObj.custom?.ui_component === 'multi-select' ?
                                                    (<>
                                                        {
                                                            <div className="seek-main-con">
                                                                <div>
                                                                    {/* <img src={profileIcon} style={{ height: '30px', width: '30px', marginTop: '12px', marginRight: '4px' }} alt="chatbot" /> */}
                                                                </div>

                                                                <div>

                                                                    {/* <div className="seek-text-con">
                                                                <p className="seek-para-text">Okay!</p>
                                                            </div>

                                                            <div className="seek-text-con">
                                                                <p className="seek-para-text">
                                                                    What type of employment are you seeking? <br />
                                                                    <span className="seek-span-text">(you can select multiple options)</span>
                                                                </p>
                                                            </div> */}

                                                                    {
                                                                        <>
                                                                            <div className="seek-btn-con" style={{ display: msgObj.show ? "flex" : "none" }}>
                                                                                {msgObj.custom.anyRadioButton ? <Button
                                                                                    disableRipple
                                                                                    key={msgObj.custom.anyRadioButton.Name}
                                                                                    variant={selectedAnyBtn.includes(msgObj.custom.anyRadioButton.LookupId) ? 'contained' : 'outlined'}
                                                                                    className={selectedAnyBtn.includes(msgObj.custom.anyRadioButton.LookupId) ? (isBms ? 'seek-btn-select isBms-seek-btn-select' : 'seek-btn-select not-bms-seek-btn-select') : (isBms ? 'seek-btn-unselect isBms-seek-btn-unselect' : 'seek-btn-unselect not-bms-seek-btn-unselect')}
                                                                                    startIcon={selectedAnyBtn.includes(msgObj.custom.anyRadioButton.LookupId) ? <CheckCircleIcon /> : <CircleOutlinedIcon />}
                                                                                    onClick={() => handelSelectAny(msgObj.custom.anyRadioButton.LookupId, msgObj.custom.anyRadioButton.Name)}
                                                                                    style={{ boxShadow: 'none' }}
                                                                                >
                                                                                    {msgObj.custom.anyRadioButton.Name}
                                                                                </Button> : null}
                                                                                {
                                                                                    msgObj?.seek?.map((btn: any) => (
                                                                                        <Button
                                                                                            disableRipple
                                                                                            key={btn.value}
                                                                                            variant={selectedSeekBtns.includes(btn.value) ? 'contained' : 'outlined'}
                                                                                            className={selectedSeekBtns.includes(btn.value) ? (isBms ? 'seek-btn-select isBms-seek-btn-select' : 'seek-btn-select not-bms-seek-btn-select') : (isBms ? 'seek-btn-unselect isBms-seek-btn-unselect' : 'seek-btn-unselect not-bms-seek-btn-unselect')}
                                                                                            startIcon={selectedSeekBtns.includes(btn.value) ? <CheckCircleIcon /> : <CircleOutlinedIcon />}
                                                                                            onClick={() => handleSeekBtn(btn.value)}
                                                                                            sx={{
                                                                                                boxShadow: 'none'
                                                                                            }}
                                                                                        >
                                                                                            {btn.key}
                                                                                        </Button>
                                                                                    ))
                                                                                }
                                                                            </div>


                                                                            <div className="seek-submit-con" style={{ display: msgObj.show ? "block" : "none" }}>
                                                                                <Button
                                                                                    variant="contained"
                                                                                    disableRipple
                                                                                    className={isBms ? "isBms-seek-submit-btn seek-btns" : "seek-submit-btn seek-btns"}
                                                                                    style={{
                                                                                        boxShadow: 'none',
                                                                                        opacity: selectedSeekBtns.length !== 0 ? 1 : 0.5,
                                                                                        pointerEvents: selectedSeekBtns.length !== 0 ? 'auto' : 'none'
                                                                                    }}
                                                                                    onClick={() => seekSubmit(msgObj, 'submit')}
                                                                                >
                                                                                    Submit
                                                                                </Button>

                                                                                <Button
                                                                                    variant="outlined"
                                                                                    disableRipple
                                                                                    className="seek-back-btn seek-btns"
                                                                                    onClick={() => seekSubmit(msgObj, 'cancel')}
                                                                                    style={{ boxShadow: 'none', marginLeft: '5px', display: (msgObj.custom?.is_back_button_enabled ? 'initial' : 'none'), textAlign: 'center' }}
                                                                                >
                                                                                    Back
                                                                                </Button>
                                                                            </div>
                                                                        </>
                                                                    }


                                                                </div>
                                                            </div>
                                                        }
                                                    </>) :
                                                    (<>
                                                        {msgObj.custom?.ui_component === 'resume_upload' ?
                                                            (<>
                                                                <Stack sx={{ backgroundColor: '#fbfbfb', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', m: '25px', borderRadius: '30px', border: '1px solid #e2e2e2', borderStyle: 'dashed' }} ref={dropContainer} style={{ border: isDrag ? '5px dotted #e2e2e2' : '1px solid #e2e2e2', backgroundColor: isDrag ? 'rgba(255,255,255,.8)' : '#fbfbfb' }}>
                                                                    <Box sx={{ backgroundColor: '#e2e2e2', height: '100px', width: '100px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', mb: '15px', }}>
                                                                        {fileInputData ?
                                                                            <Box sx={{ position: "relative" }}>
                                                                                <InsertDriveFileOutlinedIcon sx={{
                                                                                    fontSize: '45px',
                                                                                    color: 'grey',
                                                                                    // fill: "green"
                                                                                }} />
                                                                                <CheckCircleIcon sx={{ fill: "#6fd4ab", fontSize: "15px", position: "absolute", right: "14px", top: "18px" }} />
                                                                            </Box> :
                                                                            <Box >
                                                                                <UploadFileIcon sx={{
                                                                                    fontSize: '40px',
                                                                                    color: 'white',

                                                                                }} />
                                                                            </Box>

                                                                        }

                                                                    </Box>
                                                                    {fileInputData ? <Typography sx={{ fontSize: "14px" }}>{fileInputData.name}</Typography> : <Typography sx={{ fontSize: "14px" }}>Drag & drop file to upload</Typography>}
                                                                    {!fileInputData ? <Box sx={{ mt: '15px', mb: '15px' }} >
                                                                        <input type="file" id="file-upload"
                                                                            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style={{ display: 'none' }} onChange={readFile} />
                                                                        <label htmlFor="file-upload">
                                                                            <Button
                                                                                onClick={() => handleFileUpload("file-upload")}
                                                                                variant="contained"
                                                                                disableRipple
                                                                                component='span'
                                                                                sx={{
                                                                                    borderRadius: '5px', textTransform: 'capitalize', backgroundColor: isBms ? '#BC2BB8' : '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '14px', height: '34px', boxShadow: 0,
                                                                                    '&:hover': {
                                                                                        backgroundColor: isBms ? '#BC2BB8' : '#146EF6',
                                                                                        boxShadow: 0
                                                                                    }
                                                                                }}>
                                                                                Upload new Resume

                                                                            </Button>
                                                                        </label>
                                                                    </Box> : <Box sx={{ mt: '15px', mb: '15px' }} >
                                                                        <Button
                                                                            onClick={submitFile}
                                                                            variant="contained"
                                                                            disableRipple

                                                                            sx={{
                                                                                borderRadius: '5px', textTransform: 'capitalize', backgroundColor: isBms ? '#BC2BB8' : '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '14px', height: '34px', boxShadow: 0,
                                                                                '&:hover': {
                                                                                    backgroundColor: isBms ? '#BC2BB8' : '#146EF6',
                                                                                    boxShadow: 0
                                                                                }
                                                                            }}>
                                                                            Submit

                                                                        </Button>

                                                                    </Box>}

                                                                    {msgObj.custom.is_cancel_allowed && <Typography sx={{ fontWeight: 400, fontSize: '14px', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => cancelUpload(msgObj)} >
                                                                        Cancel
                                                                    </Typography>}

                                                                </Stack>
                                                            </>) :
                                                            (<>
                                                                {msgObj.jobs && msgObj.jobs.length ?
                                                                    (<>
                                                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', overflow: (msgObj.jobs[0].isRealJob ? "hidden" : ''), height: (msgObj.jobs[0].isRealJob ? "300px" : '100px'), position: 'relative', mr: 1, ml: 1 }}>
                                                                            {/* , overflow: 'hidden' */}

                                                                            <Stack
                                                                                sx={{
                                                                                    display: activeStep[msgObj.slideCount]?.stepNumber === 0 ? 'none' : 'block',
                                                                                    mb: '60px'
                                                                                }}
                                                                            >
                                                                                <Button
                                                                                    disableRipple
                                                                                    size="small"
                                                                                    variant="contained"
                                                                                    onClick={() => handleBack(msgObj.slideCount)}
                                                                                    sx={{
                                                                                        position: 'absolute',
                                                                                        left: '1px',
                                                                                        zIndex: 2,
                                                                                        minWidth: '30px',
                                                                                        p: '5px',
                                                                                        backgroundColor: '#ffffff',
                                                                                        color: isBms ? '#AD3EB2' : '#146EF6',
                                                                                        height: '60px',
                                                                                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                                                                                        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                                                                        '&:hover': {
                                                                                            backgroundColor: isBms ? '#AD3EB2' : '#146EF6',
                                                                                            color: '#ffffff',

                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    {theme.direction === 'rtl' ? (
                                                                                        <KeyboardArrowRightIcon />
                                                                                    ) : (
                                                                                        <KeyboardArrowLeftIcon />
                                                                                    )}
                                                                                </Button>
                                                                                {/* } */}
                                                                            </Stack>

                                                                            {
                                                                                msgObj.jobs.map((job: any, i: any) => {
                                                                                    return <>

                                                                                        <Slide direction={slideDirection} in={i === activeStep[msgObj.slideCount]?.stepNumber} mountOnEnter unmountOnExit
                                                                                            timeout={{ appear: 0, enter: 300, exit: 0 }}
                                                                                        >

                                                                                            <Paper
                                                                                                square
                                                                                                elevation={0}
                                                                                                sx={{
                                                                                                    display: (i === activeStep[msgObj.slideCount]?.stepNumber) ? 'flex' : 'none',
                                                                                                    alignItems: 'center',
                                                                                                    height: '100%',
                                                                                                    bgcolor: 'background.default',
                                                                                                    position: 'relative',
                                                                                                    zIndex: 1,
                                                                                                    overflowY: "auto",
                                                                                                    scrollbarWidth: "none"
                                                                                                    // transition: 'transform 0.5s ease-in-out',
                                                                                                    // transform: `translateX(-${activeStep * (100 / steps.length)}%)`,

                                                                                                }}
                                                                                            >

                                                                                                {/* {step.container} */}
                                                                                                {job.isRealJob ? <Stack className="carousel-main-card">
                                                                                                    <Stack className={isBms ? "isBms-carousel-child-card-1" : "carousel-child-card-1"}>
                                                                                                        <Stack className="carousel-child-card-2">
                                                                                                            {/* <Box sx={{ p: 1 }}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Sales</Typography>
                                    </Box> */}

                                                                                                            <Stack className="carousel-detail-card">

                                                                                                                <Typography className="carousel-card-job-title-text">{job.jobTitle}</Typography>
                                                                                                                <Box className='carousel-card-location-con'>
                                                                                                                    <Box>
                                                                                                                        <LocationOnOutlinedIcon className="carousel-card-loc-icon" />
                                                                                                                    </Box>
                                                                                                                    <Box className='carousel-card-details-con'>
                                                                                                                        <Typography className="carousel-card-loc-details-text">{job.workCity + ', ' + job.workState + (job.workZipcode ? ', ' + job.workZipcode : '')}</Typography>

                                                                                                                        {/* <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>+11 locations</Typography> */}
                                                                                                                    </Box>
                                                                                                                </Box>
                                                                                                                <Box className="carousel-card-calender-details-con">
                                                                                                                    <Box>
                                                                                                                        <CalendarTodayIcon className="carousel-card-calender-icon" />
                                                                                                                    </Box>
                                                                                                                    <Box className='carousel-card-details-con'>

                                                                                                                        <Typography className="carousel-card-calender-details-text">Posted on {getDateFormat(job.createDate)}</Typography>
                                                                                                                    </Box>
                                                                                                                </Box>
                                                                                                                {/* HeightIcon */}
                                                                                                                {job.jobType ?
                                                                                                                    (<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '29px', marginTop: '5px' }}>
                                                                                                                        <Box>
                                                                                                                            <WorkOutlineIcon sx={{ fontSize: '16px' }} />
                                                                                                                        </Box>
                                                                                                                        <Box sx={{ pl: '10px' }}>
                                                                                                                            <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{jobTypesList[job.jobType]}</Typography>
                                                                                                                        </Box>
                                                                                                                    </Box>) :
                                                                                                                    (<></>)
                                                                                                                }
                                                                                                                {job.jobHours ?
                                                                                                                    (<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '29px', marginTop: '5px' }}>
                                                                                                                        <Box>
                                                                                                                            <HeightIcon sx={{ fontSize: '16px', rotate: '90deg' }} />
                                                                                                                        </Box>
                                                                                                                        <Box sx={{ pl: '10px' }}>
                                                                                                                            <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{jobHours[job.jobHours]}</Typography>
                                                                                                                        </Box>
                                                                                                                    </Box>) :
                                                                                                                    (<></>)
                                                                                                                }
                                                                                                                {job.payrateMax ?
                                                                                                                    (<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '29px', marginTop: '5px' }}>
                                                                                                                        <Box>
                                                                                                                            <AttachMoneyIcon sx={{ fontSize: '16px' }} />
                                                                                                                        </Box>
                                                                                                                        <Box>
                                                                                                                            <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{job.payrateMin} -</Typography>
                                                                                                                        </Box>
                                                                                                                        <Box>
                                                                                                                            <AttachMoneyIcon sx={{ fontSize: '16px' }} />
                                                                                                                        </Box>
                                                                                                                        <Box>
                                                                                                                            <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{job.payrateMax}</Typography>
                                                                                                                        </Box>
                                                                                                                    </Box>) :
                                                                                                                    (<></>)
                                                                                                                }

                                                                                                            </Stack>

                                                                                                            <Box>
                                                                                                                <Button
                                                                                                                    disableRipple
                                                                                                                    onClick={() => handleReadMore(job, msgObj.isDisabled)}
                                                                                                                    endIcon={<KeyboardArrowRightIcon className={isBms ? "isBms-read-more-btn-icon" : "read-more-btn-icon"} />}
                                                                                                                    className={isBms ? "isBms-read-more-btn" : "read-more-btn"}
                                                                                                                    sx={{
                                                                                                                        textTransform: 'capitalize',

                                                                                                                        '& .MuiButton-endIcon': {
                                                                                                                            marginRight: 0,
                                                                                                                            marginLeft: '-5px'
                                                                                                                        },
                                                                                                                        // '& .MuiButton-endIcon>*:nth-of-type(1)': {
                                                                                                                        //     fontSize: '25px'
                                                                                                                        // },
                                                                                                                        '&:hover': {
                                                                                                                            backgroundColor: '#ffffff'
                                                                                                                        }

                                                                                                                    }}

                                                                                                                >
                                                                                                                    Read More
                                                                                                                </Button>
                                                                                                            </Box>

                                                                                                            <Box sx={{ textAlign: 'center', pb: 3, pl: 1, pr: 1 }}>
                                                                                                                <Button
                                                                                                                    variant="contained"
                                                                                                                    onClick={() => sendJobValue(job)}
                                                                                                                    sx={{
                                                                                                                        borderRadius: '5px', textTransform: 'capitalize', backgroundColor: isBms ? '#BC2BB8' : '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '16px', height: '34px', boxShadow: 0, width: '100%',
                                                                                                                        '&:hover': {
                                                                                                                            backgroundColor: isBms ? '#BC2BB8' : '#146EF6',
                                                                                                                            boxShadow: 0
                                                                                                                        }
                                                                                                                    }}
                                                                                                                    disabled={msgObj.isDisabled}
                                                                                                                >

                                                                                                                    I'm Interested
                                                                                                                </Button>

                                                                                                                <Button
                                                                                                                    disableRipple
                                                                                                                    onClick={() => refineSearchJob(msgObj)}
                                                                                                                    disabled={msgObj.isDisabled}
                                                                                                                    sx={{
                                                                                                                        textTransform: 'capitalize',
                                                                                                                        textDecoration: 'underline',
                                                                                                                        color: isBms ? '#AD3EB2' : '#146EF6',
                                                                                                                        '& .MuiButton-endIcon': {
                                                                                                                            mr: 0,
                                                                                                                            ml: '-5px'
                                                                                                                        },
                                                                                                                        '& .MuiButton-endIcon>*:nth-of-type(1)': {
                                                                                                                            fontSize: '25px'
                                                                                                                        },
                                                                                                                        '&:hover': {
                                                                                                                            backgroundColor: '#ffffff'
                                                                                                                        }

                                                                                                                    }}

                                                                                                                >
                                                                                                                    Refine Search
                                                                                                                </Button>
                                                                                                            </Box>
                                                                                                        </Stack>

                                                                                                    </Stack>
                                                                                                </Stack> :
                                                                                                    <Stack sx={{ minWidth: '300px' }}>
                                                                                                        {/* minHeight: '300px', */}
                                                                                                        <Stack sx={{
                                                                                                            backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                                                                                                            height: '10px',
                                                                                                        }}>
                                                                                                            {/* boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', */}
                                                                                                            <Stack sx={{ backgroundColor: '#ffffff', textAlign: 'center', p: 2 }}>
                                                                                                                {/* borderRadius: '2px', */}
                                                                                                                {/* boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', mt: 1, height: '350px',*/}
                                                                                                                {/* <Stack sx={{ mt: 1 }}>
                                                                                                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} direction='row' spacing={2}>
                                                                                                        <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                                                                        <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                                                                        <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                                                                    </Stack>

                                                                                                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} direction='row' spacing={2}>
                                                                                                        <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                                                                        <SearchIcon sx={{ fontSize: '50px' }} />
                                                                                                        <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                                                                    </Stack>

                                                                                                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} direction='row' spacing={2}>
                                                                                                        <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                                                                        <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                                                                        <BusinessCenterTwoToneIcon sx={{ fontSize: '40px' }} />
                                                                                                    </Stack>

                                                                                   </Stack> */}

                                                                                                                {/* <Typography sx={{ mt: 1, mb: 1, fontSize: '16px', fontWeight: 600 }}>Here's what you can do.</Typography> */}

                                                                                                                <Box sx={{ mr: 1, ml: 1 }}>

                                                                                                                    <Button variant="contained"
                                                                                                                        disableRipple
                                                                                                                        sx={{
                                                                                                                            width: '100%', mb: 1, backgroundColor: isBms ? '#BC2BB8' : '#146EF6', boxShadow: 0,
                                                                                                                            fontSize: '14px', fontWeight: 400, textTransform: 'capitalize',
                                                                                                                            '&:hover': {
                                                                                                                                backgroundColor: isBms ? '#BC2BB8' : '#146EF6',
                                                                                                                                boxShadow: 0
                                                                                                                            }
                                                                                                                        }}

                                                                                                                        onClick={() => refineSearchJob(msgObj)}
                                                                                                                        disabled={msgObj.isDisabled}
                                                                                                                    >
                                                                                                                        Refine Job Search
                                                                                                                    </Button>
                                                                                                                </Box>
                                                                                                            </Stack>

                                                                                                        </Stack>
                                                                                                    </Stack>}


                                                                                            </Paper>

                                                                                        </Slide>

                                                                                    </>
                                                                                })
                                                                            }

                                                                            <Box sx={{

                                                                                display: activeStep[msgObj.slideCount]?.stepNumber === msgObj.maxSteps - 1 ? 'none' : 'block',
                                                                                mb: '60px',

                                                                            }}>
                                                                                <Button
                                                                                    size="small"
                                                                                    variant="contained"
                                                                                    onClick={() => handleNext(msgObj.slideCount)}
                                                                                    sx={{
                                                                                        position: 'absolute',
                                                                                        right: '1px',
                                                                                        zIndex: 2,
                                                                                        minWidth: '30px',
                                                                                        backgroundColor: '#ffffff',
                                                                                        color: isBms ? '#AD3EB2' : '#146EF6',
                                                                                        height: '60px',
                                                                                        p: '5px',
                                                                                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                                                                                        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                                                                        '&:hover': {
                                                                                            backgroundColor: isBms ? '#AD3EB2' : '#146EF6',
                                                                                            color: '#ffffff',
                                                                                        }
                                                                                    }}
                                                                                    disableRipple
                                                                                >
                                                                                    {theme.direction === 'rtl' ? (
                                                                                        <KeyboardArrowLeftIcon />
                                                                                    ) : (
                                                                                        <KeyboardArrowRightIcon />
                                                                                    )}
                                                                                </Button>

                                                                            </Box>
                                                                        </Box>
                                                                        {msgObj.maxSteps ?
                                                                            (<>
                                                                                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mb: 2 }}
                                                                                    direction='row' spacing={2}
                                                                                >

                                                                                    <Box sx={{ textAlign: 'center', ml: '70px', }}>
                                                                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                                                            {`${activeStep[msgObj.slideCount]?.stepNumber + 1} of ${msgObj.maxSteps}`}
                                                                                        </Typography>
                                                                                    </Box>

                                                                                    <Box>
                                                                                        <MobileStepper
                                                                                            variant="progress"
                                                                                            steps={msgObj.maxSteps}
                                                                                            position="static"
                                                                                            sx={{
                                                                                                width: '160px',
                                                                                                '& .MuiLinearProgress-bar': {
                                                                                                    backgroundColor: isBms ? '#BC2BB8' : '#146EF6',
                                                                                                },

                                                                                                '& .MuiMobileStepper-progress': {
                                                                                                    backgroundColor: isBms ? 'rgba(188, 43, 184, 0.3)' : 'rgba(20, 110, 246,  0.3)',
                                                                                                }
                                                                                            }}
                                                                                            activeStep={activeStep[sliderCount]?.stepNumber}
                                                                                            nextButton={null}
                                                                                            backButton={null}
                                                                                        />
                                                                                    </Box>

                                                                                </Stack></>) : (<></>)}

                                                                    </>) :
                                                                    (
                                                                        <>
                                                                            <>
                                                                                {msgObj.text ? (
                                                                                    <Stack direction='row' spacing={0.5} p={0.5} mr={5}>

                                                                                        <Stack sx={{ pl: '6px' }}>
                                                                                            {isBms ?
                                                                                                (<img src={bmsChildLogo} style={{
                                                                                                    height: '35px', width: '35px',
                                                                                                    borderRadius: "50%",
                                                                                                    // boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)' 
                                                                                                }} alt="chatbot" />)
                                                                                                :
                                                                                                (
                                                                                                    <img src={customerLogo ? customerLogo : customerFace} style={{
                                                                                                        height: '35px', width: '35px',
                                                                                                        borderRadius: "50%",
                                                                                                        // boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)' 
                                                                                                    }} alt="chatbot" />
                                                                                                )}

                                                                                        </Stack>
                                                                                        <Stack sx=
                                                                                            {{
                                                                                                backgroundColor: isBms ? '#F9F2F2' : '#eaeeed', borderRadius: '24px', p: 0.5, borderBottomLeftRadius: "5px", outline: "1px solid transparent", boxShadow: isBms ? '0px 2px 3px 0px #0000001F' : '',
                                                                                            }}
                                                                                        >
                                                                                            <Typography component='p' sx={{ color: 'black', padding: '5px', textAlign: 'left', fontSize: "13px" }}>
                                                                                                {textWithLineBreaks(msgObj.text)}
                                                                                            </Typography>
                                                                                        </Stack>
                                                                                    </Stack>
                                                                                ) : (<></>)}

                                                                            </>

                                                                            <>
                                                                                {(msgObj.buttons && msgObj.buttons.length && !msgObj.hideBtns) ?
                                                                                    (
                                                                                        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2} mt={1} sx={{ ml: '40px', mr: '20px' }}>
                                                                                            {msgObj.buttons.map((btnObj: any) => (
                                                                                                <Button variant="outlined"
                                                                                                    onClick={() => {
                                                                                                        sendMessage(btnObj, msgObj)
                                                                                                        handleSingleSubmit({ title: "" })
                                                                                                    }}
                                                                                                    sx={{
                                                                                                        borderRadius: '20px', p: '5px 8px', textTransform: 'capitalize', borderColor: isBms ? '#AD3EB2' : '#146EF6', color: isBms ? '#AD3EB2' : '#146EF6', fontWeight: 400, fontSize: '13px', width: 'auto', outline: "1px solid transparent",
                                                                                                        '&:hover': {
                                                                                                            borderColor: isBms ? '#AD3EB2' : '#146EF6',
                                                                                                            color: isBms ? '#AD3EB2' : '#146EF6',
                                                                                                            backgroundColor: 'transparent',
                                                                                                            boxShadow: 0
                                                                                                        }
                                                                                                    }}>
                                                                                                    {btnObj.title}
                                                                                                </Button>
                                                                                            ))}
                                                                                        </Stack>
                                                                                    ) :
                                                                                    (<></>)}
                                                                            </>

                                                                            <>
                                                                                {(msgObj.buttons && msgObj.buttons.length && !msgObj.hideBtns && msgObj.text === 'Availability Status123') ?
                                                                                    (
                                                                                        <Stack direction="column" useFlexGap flexWrap="wrap" spacing={0.2} mt={0.4} sx={{ ml: '40px', mr: '20px' }}>
                                                                                            {msgObj.buttons.map((btnObj: any) => (
                                                                                                <Button
                                                                                                    disableRipple
                                                                                                    key={btnObj.title}
                                                                                                    variant={single === btnObj.title ? 'contained' : 'outlined'}
                                                                                                    // className={single === btnObj.title ? 'seek-btn-select not-bms-seek-btn-select' : 'seek-btn-unselect not-bms-seek-btn-unselect'}
                                                                                                    // className={single === btnObj.title ? (isBms ? 'seek-btn-select isBms-seek-btn-select' : 'seek-btn-select not-bms-seek-btn-unselect') : (isBms ? 'seek-btn-unselect isBms-seek-btn-unselect' : 'seek-btn-unselect not-bms-seek-btn-unselect')}
                                                                                                    className={single === btnObj.title ? (isBms ? 'seek-btn-select isBms-seek-btn-select' : 'seek-btn-select not-bms-seek-btn-select') : (isBms ? 'seek-btn-unselect isBms-seek-btn-unselect' : 'seek-btn-unselect not-bms-seek-btn-unselect')}
                                                                                                    startIcon={single === btnObj.title ? <CheckCircleIcon /> : <CircleOutlinedIcon />}
                                                                                                    style={{ boxShadow: 'none' }}
                                                                                                    onClick={() => handleSingleSelect(btnObj)}
                                                                                                    data-item={btnObj.title}
                                                                                                >
                                                                                                    {btnObj.title}
                                                                                                </Button>
                                                                                            ))}

                                                                                            <Button
                                                                                                variant="contained"
                                                                                                disableRipple
                                                                                                // className="seek-submit-btn seek-btns"
                                                                                                className={isBms ? "isBms-seek-submit-btn seek-btns" : "seek-submit-btn seek-btns"}
                                                                                                style={{
                                                                                                    boxShadow: 'none',
                                                                                                    opacity: single ? 1 : 0.5,
                                                                                                    pointerEvents: single ? 'auto' : 'none'
                                                                                                }}
                                                                                                onClick={() => {
                                                                                                    sendMessage(singleObj, msgObj)
                                                                                                    handleSingleSubmit(singleObj)
                                                                                                }}
                                                                                            >
                                                                                                Submit
                                                                                            </Button>
                                                                                        </Stack>
                                                                                    ) :
                                                                                    (<></>)}
                                                                            </>
                                                                        </>


                                                                    )
                                                                }
                                                            </>)
                                                        }
                                                    </>)
                                                }

                                            </>)}
                                    </>
                                ))}
                                {loaded ?
                                    (<><Stack direction='row' spacing={0.5} p={0.5} mr={5}>

                                        <Stack style={{ paddingLeft: "6px" }}>
                                            {isBms ?
                                                (<img src={bmsChildLogo} style={{
                                                    height: '35px', width: '35px', borderRadius: "50%",
                                                    //  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)'
                                                }} alt="chatbot" />)
                                                :
                                                (<img src={customerLogo ? customerLogo : customerFace} style={{
                                                    height: '35px', width: '35px', borderRadius: "50%",
                                                    //  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)'
                                                }} alt="chatbot" />)}

                                        </Stack>
                                        <Stack sx=
                                            {{
                                                p: 0.5
                                            }}
                                        >
                                            <Loader isBms={isBms} />
                                        </Stack>
                                    </Stack></>)
                                    : (<></>)
                                }
                            </div>

                        </ReactScrolableFeed>
                    </Stack>
                    {/* :
                        <> */}
                    <Stack
                        sx={{
                            backgroundColor: '#ffffff', overflowY: 'scroll', minHeight: '350px', mb: '5px', display: isTermDecline ? 'flex' : 'none', flexDirection: 'center', justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        <CancelIcon sx={{ height: '100px', width: '100px' }} />
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: 600,
                                mt: 1
                            }}
                        >
                            Declined
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',
                                fontWeight: 400
                            }}
                        >
                            CXninja SmartBot will not keep your information.
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',
                                fontWeight: 400
                            }}
                        >
                            If you change your mind, you can
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',
                                fontWeight: 400
                            }}
                        >
                            review the terms again.
                        </Typography>

                        <Button
                            variant="contained"
                            disableRipple
                            onClick={handleIsReviewTerm}
                            sx={{
                                backgroundColor: '#146EF6',
                                width: '130px',
                                height: '35px',
                                whiteSpace: 'nowrap',
                                fontWeight: 600,
                                fontSize: '14px',
                                textTransform: 'capitalize',
                                boxShadow: 0,
                                mt: 3,
                                '&:hover': {
                                    backgroundColor: '#146EF6',
                                    boxShadow: 0,
                                }
                            }}
                        >
                            Review Terms
                        </Button>
                    </Stack>

                    {/* <Stack sx={{ minHeight: '350px', mb: 1, mt: 1, display: isTermDecline ? 'none' : 'block' }}>
                                <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10vh', flexDirection: 'row' }}>
                                    <Box sx={{ borderTop: '1px solid lightgrey', width: '30%', mr: '2px' }}></Box>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: '12px'
                                            }}
                                        >
                                            {`${currentMonth} ${currentDate}, ${currentYear} at ${currentHours12}:${currentMinutes} ${amOrPm}`}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ borderTop: '1px solid lightgrey', width: '25%', ml: '2px' }}></Box>
                                </Stack>
                                <Stack direction='row' spacing={0.5} sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <img
                                        src={Chatbotlogo}
                                        alt='avatar'
                                        style={{
                                            height: '18px',
                                            width: '18px',
                                        }}
                                    />

                                    <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                        <Box sx={{
                                            backgroundColor: '#eaeeed', borderRadius: '24px', p: 0.8, borderBottomLeftRadius: "5px", outline: "1px solid transparent", width: '80%'
                                        }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Hello! I’m CXninja SmartBot, your job assistant at Bristol Myers Squibb. Do you have any questions? You can ask me anything about our careers, culture, company and more.
                                            </Typography>
                                        </Box>

                                        <Stack sx={{ ml: 1 }}>
                                            <WestRoundedIcon sx={{ height: '35px', width: '35px', color: '#919191' }} />
                                            <Typography sx={{ fontSize: '12px' }}>REVIEW</Typography>
                                        </Stack>

                                    </Stack>
                                </Stack>


                            </Stack> */}
                    {/* </>
                    } */}
                    <Stack
                        id='send-container'
                        direction="row" alignItems="center" pt='2%' mr={1} ml={1} pb='2%'
                        sx={{ borderTop: '1px solid lightgrey', bottom: '0px' }}
                        spacing={1}
                        position='sticky'
                        zIndex={1}
                        maxHeight={suggesationObj.type === "job_location" ? "70px" : "50px"}
                    >
                        <Box sx={{ cursor: 'pointer' }} onClick={handleOpenMenu}>
                            <MenuIcon fontSize="large" sx={{ color: '#919191' }} />
                        </Box>
                        {
                            enableAuto ? suggesationObj.type === "job_title" ?
                                <Autocomplete
                                    open={openAutoComplete}
                                    onOpen={
                                        openPopper
                                    }
                                    defaultValue={defaultTitle}
                                    onClose={closePopper}
                                    filterOptions={(options, state) => {
                                        let filterArr = options.filter((opt) => opt.toLowerCase().includes(state.inputValue.toLowerCase()))
                                        if (!filterArr.length) {
                                            setIsShowResults(true)
                                        }
                                        else {
                                            setIsShowResults(false)
                                        }
                                        return ["Searched job title", ...filterArr]
                                    }}
                                    PaperComponent={({ children }) => {
                                        return (
                                            <Paper sx={{ width: "375px", position: "relative", right: "50px", borderRadius: "0px", top: "10px", boxShadow: "none", fontSize: "13px" }} className="auto-cls">

                                                {children}
                                            </Paper>
                                        )
                                    }}
                                    sx={{ overflowX: "hidden !important" }}
                                    id="free-solo-demo"
                                    onChange={(e, value) => sendValue(e, value)}
                                    freeSolo
                                    fullWidth
                                    getOptionDisabled={option => option === "Searched job title"}
                                    options={suggesationObj.titles.map((suggesation) => suggesation)}
                                    renderOption={(props, option, { inputValue }) => {
                                        const matches = match(option, inputValue, { insideWords: true });
                                        const parts = parse(option, matches);
                                        return (
                                            <>
                                                {option !== "Searched job title" ?
                                                    <li {...props}>
                                                        <Box sx={{
                                                            width: "100%", textTransform: "capitalize"
                                                        }}>
                                                            {parts.map((part, index) => (
                                                                <span
                                                                    key={index}
                                                                    style={{
                                                                        fontWeight: part.highlight ? 700 : 400,
                                                                    }}
                                                                >
                                                                    {part.text}
                                                                </span>
                                                            ))}
                                                        </Box>
                                                    </li>
                                                    :

                                                    <Box
                                                        sx={{
                                                            width: "100%"
                                                        }}

                                                    >
                                                        <Box sx={{ clear: "both", position: "relative", borderBottom: "1px solid black", paddingBottom: "4px", cursor: "pointer" }}>
                                                            <Typography sx={{ paddingLeft: "15px", fontWeight: "600", fontSize: "13px" }}>{option}</Typography>

                                                            <CloseSharpIcon sx={{ color: '#ffffff', fontSize: '18px', cursor: 'pointer', position: "absolute", right: "5px", bottom: "2px" }}
                                                                onClick={() => {

                                                                    setOpenAutoComplete(false)
                                                                }
                                                                } />
                                                        </Box>
                                                        {isShowNoResults && <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50px" }}>
                                                            <Typography sx={{ fontWeight: 700, fontSize: "13px" }}>
                                                                No results found
                                                            </Typography>
                                                        </Box>
                                                        }
                                                    </Box>

                                                }

                                            </>
                                        );
                                    }}

                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            defaultValue={defaultTitle}
                                            placeholder="Type your message..."
                                            onChange={handleTitleChange}
                                            sx={{
                                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                    padding: '6px 10px',
                                                    height: "13px",
                                                    fontSize: "13px"

                                                },
                                                '& .MuiInputBase-root.MuiOutlinedInput-root ': {
                                                    borderRadius: '15px',
                                                    backgroundColor: '#fff'
                                                },
                                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#E6E6E6',

                                                },
                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#E6E6E6',
                                                    borderWidth: '1px'

                                                },

                                            }}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {!defaultTitle ? <TelegramIcon sx={{ cursor: 'pointer', color: '#919191', position: "fixed", right: "20px" }} /> :
                                                            <TelegramIcon sx={{ cursor: 'pointer', color: '#919191', position: "fixed", right: "20px" }} onClick={(value) => sendValue(null, defaultTitle)} />
                                                        }

                                                    </InputAdornment>
                                                ),
                                            }}
                                        />}

                                />
                                :
                                <Autocomplete
                                    multiple
                                    disabled={isTermAccept ? false : true}
                                    open={openAutoComplete}
                                    onOpen={openPopper}
                                    onClose={closePopper}
                                    onChange={sendLocation}

                                    filterOptions={(options, state) => {
                                        let filterArr = options.filter((opt) => (
                                            opt.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                                            opt.key.toLowerCase().includes(state.inputValue.toLowerCase())
                                        ))
                                        if (!filterArr.length) {
                                            setIsShowResults(true)
                                        }
                                        else {
                                            setIsShowResults(false)
                                        }

                                        return [{ name: "Searched job location", key: "" }, ...filterArr]
                                    }}
                                    PaperComponent={({ children }) => {
                                        return (
                                            <Paper sx={{ width: "375px", position: "relative", right: "50px", borderRadius: "0px", top: "10px", fontSize: "13px" }} className="auto-shadow auto-cls" >

                                                {children}
                                            </Paper>
                                        )
                                    }}
                                    sx={{ overflowX: "hidden !important" }}
                                    id="free-solo-demo"
                                    freeSolo
                                    fullWidth
                                    getOptionDisabled={option => option.name === "Searched job location"}
                                    options={suggesationObj.titles.map((suggesation) => suggesation)}
                                    getOptionLabel={(option) => {
                                        return option.name
                                    }}
                                    renderOption={(props, option, { inputValue }) => {
                                        const matches = match(option?.name, inputValue, { insideWords: true });
                                        const parts = parse(option?.name, matches);
                                        return (
                                            <>
                                                {option?.name !== "Searched job location" ?
                                                    <li {...props}>
                                                        <Box sx={{
                                                            width: "100%", textTransform: "capitalize"
                                                        }}>
                                                            {parts.map((part, index) => (
                                                                <span
                                                                    key={index}
                                                                    style={{
                                                                        fontWeight: part.highlight ? 700 : 400,
                                                                    }}
                                                                >
                                                                    {part.text}
                                                                </span>
                                                            ))}
                                                        </Box>
                                                    </li>
                                                    :

                                                    <Box
                                                        sx={{
                                                            width: "100%"
                                                        }}

                                                    >
                                                        <Box sx={{ clear: "both", position: "relative", borderBottom: "1px solid black", paddingBottom: "4px", cursor: "pointer" }}>
                                                            <Typography sx={{ paddingLeft: "15px", fontWeight: "600", fontSize: "13px" }}>{option.name}</Typography>

                                                            <CloseSharpIcon sx={{ color: '#ffffff', fontSize: '18px', cursor: 'pointer', position: "absolute", right: "5px", bottom: "2px" }}
                                                                onClick={() => {

                                                                    setOpenAutoComplete(false)
                                                                }
                                                                } />
                                                        </Box>
                                                        {isShowNoResults && <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50px" }}>
                                                            <Typography sx={{ fontWeight: 700, fontSize: "13px" }}>
                                                                No results found
                                                            </Typography>
                                                        </Box>
                                                        }
                                                    </Box>

                                                }

                                            </>
                                        );
                                    }}

                                    renderInput={(params) =>
                                        <TextField
                                            {...params}

                                            placeholder="Type your message..."

                                            sx={{
                                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                    padding: '5px 10px',
                                                    height: "13px"

                                                },
                                                '& .MuiInputBase-root.MuiOutlinedInput-root ': {
                                                    borderRadius: '15px',
                                                    backgroundColor: '#fff'
                                                },
                                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#E6E6E6',

                                                },
                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#E6E6E6',
                                                    borderWidth: '1px'

                                                },
                                                maxHeight: "80px",
                                                overflowY: "auto"
                                            }}
                                            className="multi-location"
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <TelegramIcon onClick={sendLocationData} sx={{ cursor: 'pointer', color: '#919191', position: "fixed", right: "20px", bottom: "15px" }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />}

                                />

                                :
                                isSSN ?

                                    <TextField
                                        placeholder={placeHolderText}
                                        // disabled={isTermAccept ? false : true}
                                        onKeyDown={converToSSN}
                                        // onKeyDown={handleKeyDown}
                                        fullWidth
                                        disabled={disableBtn}
                                        // value={inputValue}
                                        value={maskedData}
                                        // onChange={handleInputChange}
                                        // onChange={converToSSN}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <TelegramIcon sx={{ cursor: 'pointer', color: isBms ? '#BC2BB8' : '#919191' }} onClick={sendTextMessage} />
                                                </InputAdornment>
                                            ),
                                        }}

                                        sx={{
                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                padding: '5px 10px',
                                                fontSize: '14px',
                                                height: '20px'
                                            },
                                            '& .MuiInputBase-root.MuiOutlinedInput-root ': {
                                                borderRadius: '15px',
                                                backgroundColor: '#fff'
                                            },
                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#E6E6E6',

                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#E6E6E6',
                                                borderWidth: '1px'

                                            },
                                        }}
                                    /> :


                                    <TextField
                                        placeholder={placeHolderText}
                                        // disabled={isTermAccept ? false : true}
                                        onKeyDown={handleKeyDown}
                                        fullWidth
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <TelegramIcon sx={{ cursor: 'pointer', color: isBms ? '#BC2BB8' : '#919191' }} onClick={sendTextMessage} />
                                                </InputAdornment>
                                            ),
                                        }}

                                        sx={{
                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                padding: '5px 10px',
                                                fontSize: '14px',
                                                height: '20px'
                                            },
                                            '& .MuiInputBase-root.MuiOutlinedInput-root ': {
                                                borderRadius: '15px',
                                                backgroundColor: '#fff'
                                            },
                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#E6E6E6',

                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#E6E6E6',
                                                borderWidth: '1px'

                                            },
                                        }}
                                    />
                        }





                        {/* <Box sx={{ cursor: 'pointer' }}>
                        <AttachFileRoundedIcon sx={{ fontSize: '18px', color: '#919191' }} />
                    </Box> */}

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                sx: { py: 0 }
                            }}
                            sx={{ transform: "translateY(-50px) translateX(15px)", padding: "5px 2px" }}

                        >
                            <MenuItem sx={{ padding: "4px 5px" }} onClick={() => handleCloseMenu((initialButtons && initialButtons.length) ? initialButtons[1].payload : '', (initialButtons && initialButtons.length) ? initialButtons[1] : '')}>
                                <ListItemIcon>
                                    <SearchIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText sx={{ pr: "15px" }}><span style={{ fontSize: "13px" }}>{(initialButtons && initialButtons.length) ? initialButtons[1].title : ''}</span></ListItemText> </MenuItem>
                            <Divider sx={{ marginTop: "1px !important", marginBottom: "1px !important" }} />
                            <MenuItem sx={{ padding: "4px 5px" }} onClick={() => handleCloseMenu((initialButtons && initialButtons.length) ? initialButtons[0].payload : '', (initialButtons && initialButtons.length) ? initialButtons[0] : '')}>
                                <ListItemIcon><HelpOutlineIcon fontSize="small" /></ListItemIcon>
                                <ListItemText><span style={{ fontSize: "13px" }}>{(initialButtons && initialButtons.length) ? initialButtons[0].title : ''}</span></ListItemText></MenuItem>

                        </Menu>
                    </Stack>

                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mb: 0.5 }}>
                        <Link sx={{ color: '#919191', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}
                            underline="none"
                            onClick={handleIsReviewTerm}
                        >
                            Terms
                        </Link>
                        <Box sx={{ borderRight: '1.5px solid lightgrey', ml: 1, mr: 1 }}></Box>
                        <Typography
                            sx={{ color: '#919191', fontSize: '14px', fontWeight: 500 }}
                        >
                            Powered by <Box component='span' sx={{ fontWeight: 600 }}>Curately.AI</Box>
                        </Typography>
                    </Stack>
                </Card >


                <Card
                    sx={{
                        width: '375px',
                        '& .MuiPaper-root.MuiCard-root ': {
                            pt: 0,
                        },
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                        borderBottomLeftRadius: '15px',
                        position: 'absolute',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                        // right: '80px',
                        // bottom: '-65px',
                        // left: 0,
                        // right: 0,
                        transition: 'all .1s ease-out',
                        transformOrigin: "bottom right",
                        transform: 'translate(-5%,-5%)',
                        display: isReadmore ? 'block' : 'none',
                    }}
                    className="chat-width"
                >

                    <Stack
                        sx={{
                            backgroundImage: isBms ? 'none' : 'linear-gradient(to right,#2731DD, #137CED)',
                            backgroundColor: isBms ? '#EDE7E7' : 'none',
                            display: 'flex', flexDirection: 'row', alignItems: 'center'
                        }}
                        p='15px'
                        maxHeight='30px'
                    >
                        <Stack onClick={() => handleReadMore('', '')} sx={{ cursor: 'pointer' }}>
                            <KeyboardArrowLeftIcon sx={{ fontSize: '30px', color: isBms ? '#111111' : '#ffffff', fontWeight: 600 }} />
                        </Stack>
                        <Stack
                            sx={{ ml: '100px' }}
                        >
                            <Typography sx={{ color: isBms ? '#111111' : '#ffffff' }}>View Jobs</Typography>
                        </Stack>

                    </Stack>

                    <Stack
                        id='readmore-content'
                        sx={{
                            backgroundColor: '#ffffff', overflowY: 'scroll', maxHeight: '300px', minHeight: '300px', mb: '5px', p: 3
                        }} >

                        <Stack sx={{ pb: '15px', borderBottom: '1px solid lightgrey' }} direction='column' spacing={2}>

                            <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{selectedJobData[0]?.jobTitle}</Typography>
                            {(selectedJobData[0]?.workCity || selectedJobData[0]?.workState) ?
                                <>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Box>
                                            <LocationOnOutlinedIcon sx={{ fontSize: '18px' }} />
                                        </Box>
                                        <Box sx={{ pl: '10px' }}>
                                            <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{selectedJobData[0]?.workCity + ', ' + selectedJobData[0]?.workState + (selectedJobData[0]?.workZipcode ? ', ' + selectedJobData[0]?.workZipcode : '')}</Typography>

                                            {/* <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>+11 locations</Typography> */}
                                        </Box>
                                    </Box></> :
                                <></>}

                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Box>
                                    <CalendarTodayIcon sx={{ fontSize: '15px' }} />
                                </Box>
                                <Box sx={{ pl: '10px' }}>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>Posted {getDateFormat(selectedJobData[0]?.createDate)}</Typography>
                                </Box>
                            </Box>
                            {selectedJobData[0]?.jobType ?
                                (<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Box>
                                        <WorkOutlineIcon sx={{ fontSize: '16px' }} />
                                    </Box>
                                    <Box sx={{ pl: '10px' }}>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{jobTypesList[selectedJobData[0]?.jobType]}</Typography>
                                    </Box>
                                </Box>)
                                : (<></>)

                            }
                            {selectedJobData[0]?.jobHours ?
                                (<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Box>
                                        <HeightIcon sx={{ fontSize: '16px', rotate: '90deg' }} />
                                    </Box>
                                    <Box sx={{ pl: '10px' }}>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{jobHours[selectedJobData[0]?.jobHours]}</Typography>
                                    </Box>
                                </Box>)
                                : (<></>)

                            }
                            {selectedJobData[0]?.payrateMax ?
                                (<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '29px', marginTop: '5px' }}>
                                    <Box>
                                        <AttachMoneyIcon sx={{ fontSize: '16px' }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{selectedJobData[0].payrateMin} -</Typography>
                                    </Box>
                                    <Box>
                                        <AttachMoneyIcon sx={{ fontSize: '16px' }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{selectedJobData[0].payrateMax}</Typography>
                                    </Box>
                                </Box>) :
                                (<></>)
                            }

                        </Stack>


                        <Stack>
                            {/* <Box sx={{ mt: '5px', fontSize: '16px', fontWeight: 600 }}>
                                <Typography>Let's Grow Together</Typography>
                            </Box> */}

                            <Box sx={{ mt: '5px' }}>
                                <Typography sx={{ fontSize: '14px' }}>
                                    <span dangerouslySetInnerHTML={{ __html: selectedJobData[0]?.publicJobDescr }} />
                                    {/* {selectedJobData[0]?.description} */}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack
                        sx={{ bottom: '0px', p: 1 }}
                        position='sticky'
                        zIndex={1}
                        maxHeight='50px'
                    >
                        <Button
                            variant="contained"
                            disableRipple
                            // onClick={()=>handleReadMore('')}
                            onClick={() => (sendJobValue(selectedJobData[0]), handleReadMore('', ''))}
                            sx={{
                                borderRadius: '5px', textTransform: 'capitalize', backgroundColor: isBms ? '#BC2BB8' : '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '16px', height: '34px', boxShadow: 0, width: '100%',
                                '&:hover': {
                                    backgroundColor: isBms ? '#BC2BB8' : '#146EF6',
                                    boxShadow: 0
                                }
                            }}
                            disabled={selectedJobData[0]?.isDisabled}
                        >
                            I'm Interested
                        </Button>
                    </Stack>

                </Card >

                {
                    !isChatbotOpen ? (

                        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: "30px", cursor: 'pointer', backgroundColor: 'transparent', padding: '10px 4px' }} className="bottom-cls">
                            {isBms ?
                                (<Box
                                    component="div"
                                    sx={{
                                        height: '50px',
                                        width: '50px',
                                        borderRadius: '50%',
                                        backgroundImage: `url("${bmsMainLogo}")`,
                                        backgroundSize: 'cover',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s, opacity 0.3s',
                                        transform: isChatbotOpen ? 'translateY(20%)' : 'none',
                                        opacity: isChatbotOpen ? 0 : 1,
                                        margin: '20px',
                                        position: 'relative',
                                        // boxShadow: '0 0 5px 5px rgb(0 0 0 / 36%)',
                                        '&:hover': {
                                            // animation: 'ripples 1s linear infinite',
                                        },
                                        '@keyframes ripples': {
                                            to: {
                                                boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.2), 0 0 0 6px rgba(0, 0, 0, 0.2), 0 0 0 8px rgba(0, 0, 0, 0.2), 0 0 0 10px rgba(0, 0, 0, 0.2)'
                                            }
                                        }
                                    }}
                                    onClick={intializeChatBot}
                                ></Box>)
                                :
                                (<Box
                                    component="div"
                                    sx={{
                                        height: '50px',
                                        width: '50px',
                                        borderRadius: '50%',
                                        backgroundImage: `url("${customerLogo ? customerLogo : customerFace}")`,
                                        backgroundSize: 'cover',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s, opacity 0.3s',
                                        transform: isChatbotOpen ? 'translateY(20%)' : 'none',
                                        opacity: isChatbotOpen ? 0 : 1,
                                        margin: '20px',
                                        position: 'relative',
                                        // boxShadow: '0 0 5px 5px rgb(0 0 0 / 36%)',
                                        '&:hover': {
                                            // animation: 'ripples 1s linear infinite',
                                        },
                                        '@keyframes ripples': {
                                            to: {
                                                boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.2), 0 0 0 6px rgba(0, 0, 0, 0.2), 0 0 0 8px rgba(0, 0, 0, 0.2), 0 0 0 10px rgba(0, 0, 0, 0.2)'
                                            }
                                        }
                                    }}
                                    onClick={intializeChatBot}
                                ></Box>)
                            }

                            {!onlyImage && (initialButtons && initialButtons.length) ?
                                (<>
                                    <Stack className="hide-initial-card">
                                        <Box component='div' sx={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'row', borderRadius: '20px', boxShadow: 'rgb(0 0 0 / 16%) 0px 1px 15px 2px' }}>

                                            <Box component='div' sx={{ p: '18px 22px 16px 18px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onClick={intializeChatBot}>
                                                <Typography sx={{ fontSize: '14px', color: '#1A1A1A' }}>{initialText} </Typography>
                                            </Box>

                                            <Box component='div' sx={{ pr: '7px', pt: '18px' }}>
                                                <CloseSharpIcon sx={{ fontSize: '20px' }} onClick={() => (setOnlyImage(true), sendToParent("short"))} />
                                            </Box>
                                        </Box>
                                        <Stack mt={1} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Button
                                                variant="outlined"
                                                disableRipple
                                                startIcon={<SearchIcon />}
                                                sx={{
                                                    borderRadius: '20px', backgroundColor: '#ffffff', textTransform: 'capitalize', borderColor: isBms ? '#AD3EB2' : '#146EF6', color: isBms ? '#AD3EB2' : '#146EF6', fontWeight: 400, fontSize: '12px', height: '34px', whiteSpace: 'nowrap',
                                                    '&:hover': {
                                                        backgroundColor: isBms ? '#AD3EB2' : '#146EF6',
                                                        borderColor: isBms ? '#AD3EB2' : '#146EF6',
                                                        color: '#ffffff'
                                                    }
                                                }}
                                                className="chat-button"
                                                onClick={() => sendPayload(initialButtons[0].payload, initialButtons[0])}
                                            >
                                                {(initialButtons && initialButtons.length) ? initialButtons[0].title : ''}

                                            </Button>
                                            <Button variant="outlined"
                                                onClick={() => sendPayload(initialButtons[1].payload, initialButtons[1])}
                                                sx={{
                                                    borderRadius: '20px',
                                                    backgroundColor: '#ffffff',
                                                    textTransform: 'capitalize', borderColor: isBms ? '#AD3EB2' : '#146EF6', color: isBms ? '#AD3EB2' : '#146EF6', fontWeight: 400, fontSize: '12px', height: '34px', whiteSpace: 'nowrap',
                                                    '&:hover': {
                                                        backgroundColor: isBms ? '#AD3EB2' : '#146EF6',
                                                        borderColor: isBms ? '#AD3EB2' : '#146EF6',
                                                        color: '#ffffff'
                                                    }
                                                }}
                                                disableRipple
                                                startIcon={<HelpOutlineIcon />}
                                            >
                                                {(initialButtons && initialButtons.length) ? initialButtons[1].title : ''}
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </>)
                                :
                                (<></>)}

                        </Stack>) : <Stack></Stack>
                }
                <div>
                    <Snackbar onClose={() => setOpen(false)}
                        anchorOrigin={{ vertical, horizontal }}

                        key={vertical + horizontal}
                        open={toaster}
                        autoHideDuration={4000}
                    >
                        {
                            (<Alert severity="error">{toastrMessage}</Alert>)

                        }

                    </Snackbar>
                </div>

            </Stack>

        </Stack >
    );
};

export default Chatbot;
