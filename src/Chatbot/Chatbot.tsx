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
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import Link from '@mui/material/Link'

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import cxNinjaLogo from '../cxninja-logo.png'
import cxNinjaLogo1 from '../image_2023_08_15T08_37_10_603Z.png'
import c from '../Rectangle 99@2x.svg';
import c1 from '../Rectangle 99@2x-1.png'
import profileIcon from '../profile.jpg';
import Chatbotlogo from '../Rectangle 98@2x.svg';
import apiService from "../shared/api/apiService";
import { States } from "./utills/helper";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { formatDate } from "./utills/helper";


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

const Loader = () => {
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
                    color: '#2731DD',
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
                    color: '#2731DD',
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
                    color: '#2731DD',
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

const Chatbot = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('job_id');
    let tempchatbotType = null;
    const chatbotType = localStorage.getItem("chatbotType");//params.get('type');
    //   alert(chatbotType);
    const valueRef = useRef()

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
    const [isReload, setIsReload] = useState(false)
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

    useEffect(() => {

        let paramType = params.get('type') ? params.get('type') : "1";
        if(localStorage.getItem("chatbotType") !== params.get('type') && paramType){
            localStorage.setItem("chatbotType", paramType);
            generateNum = generateRandomNumber();
        } else {
            generateNum = localStorage.getItem("uuid");
        }
        if(generateNum){
            generateNum = generateNum.toString();
            dataToPass.sender = generateNum ? generateNum.toString() : "";
            setRandStr(generateNum);
        }
        dataToPass.metadata.chatbot_type = "1"
        if(paramType){            
            dataToPass.metadata.chatbot_type = paramType
        }
        
        const getLocation = async () => {
            try {
                let response = await apiService.getIpAddress();
                let data = response.data;
                dataToPass.metadata.job_location = data.region;
                setIpLocation(data.region);
                console.log(data.region)
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
        getLocation()

        // alert(params.get('type'));
        // tempchatbotType = 

    }, [])


    const handleFileUpload = () => {
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        fileInput.click();
    };

    const readFile = async (e: any) => {

        let fileData = e.target.files ? e.target.files[0] : e.dataTransfer.files[0]
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
        let formData = new FormData()
        formData.append("resume", fileInputData)
        formData.set("sender", `${randStr}`);
        formData.set("metaData", JSON.stringify(dataToPass.metadata));
        setLoaded(true);
        try {
            let response = await apiService.uploadFile(formData)
            if (response.data.success) {
                setLoaded(false);
                let filter_messages = messagesList.filter((message) => {
                    return message.custom?.ui_component !== "resume_upload"
                })
                setMessagesList([...filter_messages]);
                sendValue(null, `candid ${response.data.candidate_id}`)
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
            // dataToPass.message = type === "input_job_title" ? `/${type}{"job_title": "${value}"}` : `/${type}{"job_location": "${value}"}`;
            getTableData();

        }

        // sendLocValue(null, "california", "input_job_location")

    }

    const intializeChatBot = () => {
        setIsChatbotOpen(true)
        let isIntialized = sessionStorage.getItem("isChatBotIntialized");
        if (isIntialized === "false") {
            setMessagesList(prevState => [...prevState, ...intialData])
            sessionStorage.setItem("isChatBotIntialized", "true")
        }
        setLoaded(false);
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
            "text": jobData.title_,
            "payload": '',
            "sent": true,
            "metadata": {
                "job_id": (queryParam ? queryParam : "1")
            }
        }

        setMessagesList(prevArray => [...prevArray, obj]);
        dataToPass.message = `/input_select_job{"select_job": "${jobData.requisitionId_}"}`
        dataToPass.metadata.job_location = ipLocation;
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
                "job_location": ipLocation
            }
        };
        dataToPass.metadata.job_location = ipLocation;
        getTableData();
    }

    const makeJobsCourousal = (rowObj: any) => {
        rowObj.jobs.forEach((job: any) => {
            const jobObj = {
                "container": (

                    <Stack sx={{ minHeight: '300px', minWidth: '300px' }}>
                        <Stack sx={{
                            backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', height: '10px',
                        }}>
                            <Stack sx={{ backgroundColor: '#ffffff', mt: 1, borderRadius: '2px', height: '350px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
                                {/* <Box sx={{ p: 1 }}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Sales</Typography>
                                    </Box> */}

                                <Stack sx={{ p: '10px' }} direction='column' spacing={2}>

                                    <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{job.title_}</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                                        <Box>
                                            <LocationOnOutlinedIcon sx={{ fontSize: '20px' }} />
                                        </Box>
                                        <Box sx={{ pl: '10px' }}>
                                            <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{job.addresses_ && job.addresses_[0]}</Typography>
                                            {/* <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>+11 locations</Typography> */}
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 2 }}>
                                        <Box>
                                            <CalendarTodayIcon sx={{ fontSize: '15px' }} />
                                        </Box>
                                        <Box sx={{ pl: '10px' }}>

                                            <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>Posted on {formatDate(job.postingPublishTime_?.seconds_)}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Box>
                                            <AccessTimeIcon sx={{ fontSize: '15px' }} />
                                        </Box>
                                        <Box sx={{ pl: '10px' }}>
                                            <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{job.customAttributes_.mapData.jobType.stringValues_[0]}</Typography>
                                        </Box>
                                    </Box>

                                </Stack>

                                <Box>
                                    <Button
                                        disableRipple
                                        onClick={() => handleReadMore(job, '')}
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
                                        onClick={() => sendJobValue(job)}
                                        sx={{
                                            borderRadius: '5px', textTransform: 'capitalize', backgroundColor: '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '16px', height: '34px', boxShadow: 0, width: '100%',
                                            '&:hover': {
                                                backgroundColor: '#146EF6',
                                                boxShadow: 0
                                            }
                                        }}
                                        disabled={rowObj.isDisabled}
                                    >
                                        {rowObj.isDisabled}---
                                        I'm Interested
                                    </Button>
                                </Box>
                            </Stack>

                        </Stack>
                    </Stack>

                ),
            };
            rowObj.newJobs.push(jobObj);



            // setNewSteps((prevSearchData: any) => ({
            //     ...prevSearchData,jobObj
            //   }));
        })

        let refineJobSearch = {
            "container": (
                <Stack sx={{ minHeight: '300px', minWidth: '300px' }}>
                    <Stack sx={{
                        backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', height: '10px',
                    }}>
                        <Stack sx={{ backgroundColor: '#ffffff', mt: 1, borderRadius: '2px', height: '350px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', textAlign: 'center', p: 2 }}>

                            <Stack sx={{ mt: 1 }}>
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

                            </Stack>

                            <Typography sx={{ mt: 1, mb: 1, fontSize: '16px', fontWeight: 600 }}>Here's what you can do.</Typography>

                            <Box sx={{ mr: 1, ml: 1 }}>

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

                                    onClick={() => refineSearchJob(rowObj)}
                                    disabled={rowObj.disabled}
                                >
                                    Refine Job Search
                                </Button>
                            </Box>
                        </Stack>

                    </Stack>
                </Stack>
            ),
        }
        rowObj.newJobs.push(refineJobSearch);


    }


    const steps = [
        {
            container: (
                <Stack sx={{ minHeight: '300px', minWidth: '300px' }}>
                    <Stack sx={{
                        backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', height: '10px',
                    }}>
                        <Stack sx={{ backgroundColor: '#ffffff', mt: 1, borderRadius: '2px', height: '350px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', textAlign: 'center', p: 2 }}>

                            <Stack sx={{ mt: 1 }}>
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
            ),
        },
        {
            container: (
                <Stack sx={{ minHeight: '300px', minWidth: '300px' }}>
                    <Stack sx={{
                        backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', height: '10px',
                    }}>
                        <Stack sx={{ backgroundColor: '#ffffff', mt: 1, borderRadius: '2px', height: '350px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
                            <Box sx={{ p: 1 }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Sales</Typography>
                            </Box>

                            <Stack sx={{ p: '10px' }} direction='column' spacing={2}>

                                <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Manager, Manufacturing Sales</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                                    <Box>
                                        <LocationOnOutlinedIcon sx={{ fontSize: '20px' }} />
                                    </Box>
                                    <Box sx={{ pl: '10px' }}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Philadelphia, PA, United States of America</Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>+11 locations</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 2 }}>
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
                                    // onClick={handleReadMore}
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
            ),
        },
        {
            container: (
                <Stack sx={{ minHeight: '300px', minWidth: '300px' }}>
                    <Stack sx={{
                        backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', height: '10px',
                    }}>
                        <Stack sx={{ backgroundColor: '#ffffff', mt: 1, borderRadius: '2px', height: '350px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', textAlign: 'center', p: 2 }}>

                            <Stack sx={{ mt: 1 }}>
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
            ),
        },
    ];


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
    let generateNum = null; //localStorage.getItem("uuid") ? localStorage.getItem("uuid") : generateRandomNumber();


    const [randStr, setRandStr] = useState("");
    // let randStr = generateRandomNumber();

    // setRandStr(generateNum);

    const toggleChatbot = () => {
        setIsChatbotOpen(true);
        // setIsTermCardOpen(true)
        localStorage.setItem("isChatOpened", "true")
    };

    const handleExitChatbot = () => {
        setIsChatbotOpen(false)
        setIsTermCardOpen(false)
    }

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };
    // const handleChange = (event:any) => {
    //     setMessage(event.target.value);
    //   };


    const sendMessage = (msg: any, msgObj: any) => {
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

                getTableData();
            }
        }
    };

    //send text as input 

    const sendTextMessage = () => {
        setIsReload((prevState) => !prevState)
        setActiveStep((prevState) => [...prevState])
        if (inputValue !== "" && inputValue.trim() !== "") {
            let obj = {
                "text": inputValue,
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


            getTableData();
        }


    }


    let checkUseEffectLoad = false;
    let dataToPass = { 
        "sender": `${randStr}`,
        "message": "/greet",
        "metadata": {
            "chatbot_type": chatbotType ? chatbotType : "1",
            "job_location": ""
        }
    };

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
                "job_location": ipLocation
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

    const [slideObj, setSlideObj] = useState({})
    const getTableData = () => {
        // alert(randStr);
        setInputValue('');
        setEnableAuto(false);
        setLoaded(true);
        apiService.sendMessage(dataToPass).then((response: any) => {
            if (!response.error) {

                if (checkUseEffectLoad) {
                    setInitialButtons(response.data[0].buttons);
                    setInitialText(response.data[0].text);
                    setIntialData(response.data)
                    dataToPass.message = "/job_screening";
                    checkUseEffectLoad = false;
                    // getTableData()

                } else {
                    if (response.data && response.data.length) {
                        response.data.map((obj: any, i: any) => {
                            setTimeout(function () {
                                const newObject = obj;
                                newObject.sent = false;
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
                                        newObject.maxSteps = newObject.custom?.jobs.length ? newObject.custom?.jobs?.length : 1;

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
                        // console.log(messagesList);
                        if (response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) {
                            setDisableBtn((response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) ? true : false);

                        } else {
                            setDisableBtn((response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) ? false : false);

                        }
                        // console.log(scrollRef);
                        if (scrollRef.current) {
                            // scrollRef.current.scrollIntoView({ behavior: 'smooth' });
                        }
                        //    setDisableBtn((newObject.buttons && newObject.buttons.length) ? true : false);


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
        })
    }
    React.useEffect(() => {
        if (!checkUseEffectLoad) {
            // getTableData();
        }
        sessionStorage.setItem("isChatBotIntialized", "false")
        checkUseEffectLoad = true;
        // setLoaded(true);
    }, []);

    const [isTermCardOpen, setIsTermCardOpen] = useState(false)
    const [isTermAccept, setIsTermAccept] = useState(false)
    const [isTermDecline, setIsTermDecline] = useState(false)

    const handleIsReviewTerm = () => {
        setIsTermCardOpen(true)
        setIsChatbotOpen(true)
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



    return (
        <Stack sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'flex-end',
            alignItems: 'flex-end', right: 500
        }}>

            <Stack sx={{ display: isTermCardOpen ? 'block' : 'none', height: '90vh', bottom: '20px' }}>
                <Card sx={{ width: '350px', position: 'relative', right: '400px' }}>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid lightgrey', p: 1, maxHeight: '80px' }}>
                        <Box>
                            <img
                                src={Chatbotlogo}
                                alt='avatar'
                                style={{
                                    height: '30px',
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

                    <Stack sx={{ p: 1, pl: 2, pr: 2, maxHeight: '270px', overflowY: 'scroll' }}>
                        <Typography sx={{ fontSize: '12px', fontStyle: 'italic', mt: 1 }}>
                            By using our chatbot, you understand that Bristal-Myers Squibb (BMS)
                            will collect certain information that includes personal data about you
                            like your job interest, location, your contact details, and other
                            information that you share through this tool. This tool is managed by
                            Curately.AI, a BMS approved third party. Our recruiters and hiring
                            managers will use this information for recruiting, where needed to get in
                            touch with you, and for statistical and improvement purposes.
                        </Typography>

                        <Typography sx={{ fontSize: '12px', fontStyle: 'italic', mt: 2 }}>
                            <Box component='span' sx={{ fontWeight: 600 }}>Terms:</Box> By using this tool, you agree to these terms and understand how
                            BMS will use your personal data for these purposes.
                        </Typography>

                        <Typography sx={{ fontSize: '12px', fontStyle: 'italic', mt: 4, mb: 4 }}>
                            <Box component='span' sx={{ fontWeight: 600 }}>Privacy</Box> For more information about how BMS handles your personal
                            data or to exercise your rights, please visit our <Box component='span' sx={{ color: '#146EF6' }}>privacy Notice Center</Box> or
                            contact our Data Protection officer <Box component='span' sx={{ color: '#146EF6' }}>dpo@bms.com</Box>
                        </Typography>
                    </Stack>

                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: 1, borderTop: '1px solid lightgrey' }}>
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
                    </Stack>
                </Card>
            </Stack>

            <Stack
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
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
                            backgroundImage: 'linear-gradient(to right,#2731DD, #137CED)',
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
                            <Box sx={{ border: '3px solid #CDE4FD', borderRadius: '50%' }}>
                                <img
                                    src={Chatbotlogo}
                                    alt='avatar'
                                    style={{
                                        height: '30px',
                                        width: '35px',
                                    }}
                                />
                            </Box>
                            <Typography
                                sx={{ color: '#ffffff', fontSize: '17px', fontWeight: 500 }}
                            >
                                {/* CXninja <Box component='span' sx={{ fontWeight: 400 }}>SmartBot</Box> */}
                                Ripley
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
                            <Box sx={{ backgroundColor: '#ffffff', p: 0.5, borderRadius: '30px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                <img
                                    src={cxNinjaLogo}
                                    alt='cxNinja'
                                    style={{
                                        height: '25px',
                                        width: '100px',
                                    }}
                                />
                            </Box>
                            <Box component='div' onClick={handleExitChatbot} >
                                <CloseSharpIcon sx={{ color: '#001C46', fontSize: '18px', cursor: 'pointer' }} />
                            </Box>
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


                            {/* {isButtonHover && */}



                            {messagesList.map((msgObj) => (
                                <>
                                    {msgObj.sent ?
                                        (<>
                                            <Stack  sx={{pt: '10px'}}  direction='column' p={0.5} alignItems='flex-end' >
                                                <Stack direction='row' spacing={0.5} mr={1}>
                                                    <Stack sx=
                                                        {{
                                                            backgroundColor: '#146EF6', borderRadius: '24px', p: 0.5, display: 'flex', flexDirection: 'row', justifyContent: 'center', borderBottomRightRadius: "5px", outline: "1px solid transparent"
                                                        }}

                                                    >
                                                        <Typography component='p' sx={{ color: '#ffffff', padding: '5px', textAlign: 'left', fontSize: "13px" }}>
                                                            {msgObj.text}
                                                        </Typography>
                                                    </Stack>

                                                    <Stack>
                                                        <img src={profileIcon} style={{ height: '30px', width: '30px' }} alt="chatbot" />
                                                    </Stack>
                                                </Stack>
                                            </Stack>
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
                                                                    onClick={handleFileUpload}
                                                                    variant="contained"
                                                                    disableRipple

                                                                    sx={{
                                                                        borderRadius: '5px', textTransform: 'capitalize', backgroundColor: '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '14px', height: '34px', boxShadow: 0,
                                                                        '&:hover': {
                                                                            backgroundColor: '#146EF6',
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
                                                                    borderRadius: '5px', textTransform: 'capitalize', backgroundColor: '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '14px', height: '34px', boxShadow: 0,
                                                                    '&:hover': {
                                                                        backgroundColor: '#146EF6',
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
                                                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '350px', position: 'relative', mr: 1, ml: 1, overflow: 'hidden' }}>

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
                                                                            color: '#146EF6',
                                                                            height: '60px',
                                                                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                                                                            display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                                                            '&:hover': {
                                                                                backgroundColor: '#146EF6',
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
                                                                                        // transition: 'transform 0.5s ease-in-out',
                                                                                        // transform: `translateX(-${activeStep * (100 / steps.length)}%)`,

                                                                                    }}
                                                                                >

                                                                                    {/* {step.container} */}
                                                                                    {job.isRealJob ? <Stack sx={{ minHeight: '300px', minWidth: '300px' }}>
                                                                                        <Stack sx={{
                                                                                            backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                                                                                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', height: '10px',
                                                                                        }}>
                                                                                            <Stack sx={{ backgroundColor: '#ffffff', mt: 1, borderRadius: '2px', height: '350px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
                                                                                                {/* <Box sx={{ p: 1 }}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Sales</Typography>
                                    </Box> */}

                                                                                                <Stack sx={{ p: '10px' }} direction='column' spacing={2}>

                                                                                                    <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{job.title_}</Typography>
                                                                                                    <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                                                                                                        <Box>
                                                                                                            <LocationOnOutlinedIcon sx={{ fontSize: '20px' }} />
                                                                                                        </Box>
                                                                                                        <Box sx={{ pl: '10px' }}>
                                                                                                            <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{job.addresses_ && job.addresses_[0]}</Typography>
                                                                                                            {/* <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>+11 locations</Typography> */}
                                                                                                        </Box>
                                                                                                    </Box>

                                                                                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 2 }}>
                                                                                                        <Box>
                                                                                                            <CalendarTodayIcon sx={{ fontSize: '15px' }} />
                                                                                                        </Box>
                                                                                                        <Box sx={{ pl: '10px' }}>

                                                                                                            <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>Posted on {formatDate(job.postingPublishTime_?.seconds_)}</Typography>
                                                                                                        </Box>
                                                                                                    </Box>

                                                                                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                                        <Box>
                                                                                                            <AccessTimeIcon sx={{ fontSize: '15px' }} />
                                                                                                        </Box>
                                                                                                        <Box sx={{ pl: '10px' }}>
                                                                                                            <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{job.customAttributes_.mapData.jobType.stringValues_[0]}</Typography>
                                                                                                        </Box>
                                                                                                    </Box>

                                                                                                </Stack>

                                                                                                <Box>
                                                                                                    <Button
                                                                                                        disableRipple
                                                                                                        onClick={() => handleReadMore(job, msgObj.isDisabled)}
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
                                                                                                        onClick={() => sendJobValue(job)}
                                                                                                        sx={{
                                                                                                            borderRadius: '5px', textTransform: 'capitalize', backgroundColor: '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '16px', height: '34px', boxShadow: 0, width: '100%',
                                                                                                            '&:hover': {
                                                                                                                backgroundColor: '#146EF6',
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
                                                                                                        sx={{
                                                                                                            textTransform: 'capitalize',
                                                                                                            textDecoration: 'underline',
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
                                                                                    </Stack> : <Stack sx={{ minHeight: '300px', minWidth: '300px' }}>
                                                                                        <Stack sx={{
                                                                                            backgroundColor: '#146EF6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
                                                                                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', height: '10px',
                                                                                        }}>
                                                                                            <Stack sx={{ backgroundColor: '#ffffff', mt: 1, borderRadius: '2px', height: '350px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', textAlign: 'center', p: 2 }}>

                                                                                                <Stack sx={{ mt: 1 }}>
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

                                                                                                </Stack>

                                                                                                <Typography sx={{ mt: 1, mb: 1, fontSize: '16px', fontWeight: 600 }}>Here's what you can do.</Typography>

                                                                                                <Box sx={{ mr: 1, ml: 1 }}>

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
                                                                            color: '#146EF6',
                                                                            height: '60px',
                                                                            p: '5px',
                                                                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                                                                            display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                                                            '&:hover': {
                                                                                backgroundColor: '#146EF6',
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

                                                                        <Box sx={{ textAlign: 'center', ml: '70px' }}>
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                {`${activeStep[msgObj.slideCount]?.stepNumber + 1} of ${msgObj.maxSteps}`}
                                                                            </Typography>
                                                                        </Box>

                                                                        <Box>
                                                                            <MobileStepper
                                                                                variant="progress"
                                                                                steps={msgObj.maxSteps}
                                                                                position="static"
                                                                                sx={{ width: '160px', }}
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

                                                                            <Stack>
                                                                                <img src={Chatbotlogo} style={{ height: '18px', width: '18px' }} alt="chatbot" />
                                                                            </Stack>
                                                                            <Stack sx=
                                                                                {{
                                                                                    backgroundColor: '#eaeeed', borderRadius: '24px', p: 0.5, borderBottomLeftRadius: "5px", outline: "1px solid transparent"
                                                                                }}
                                                                            >
                                                                                <Typography component='p' sx={{ color: 'black', padding: '5px', textAlign: 'left', fontSize: "13px" }}>
                                                                                    {msgObj.text}
                                                                                </Typography>
                                                                            </Stack>
                                                                        </Stack>
                                                                    ) : (<></>)}

                                                                </>

                                                                <>
                                                                    {(msgObj.buttons && msgObj.buttons.length && !msgObj.hideBtns) ?
                                                                        (
                                                                            <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2} mt={1} ml={3}>
                                                                                {msgObj.buttons.map((btnObj: any) => (
                                                                                    <Button variant="outlined" onClick={() => sendMessage(btnObj, msgObj)} sx={{ borderRadius: '20px', textTransform: 'capitalize', borderColor: '#146EF6', color: '#146EF6', fontWeight: 400, fontSize: '13px', width: 'auto', outline: "1px solid transparent" }}>
                                                                                        {btnObj.title}
                                                                                    </Button>
                                                                                ))}
                                                                            </Stack>
                                                                        ) :
                                                                        (<></>)}
                                                                </>
                                                            </>


                                                        )
                                                    }
                                                </>)
                                            }
                                        </>)}
                                </>
                            ))}
                            {loaded ?
                                (<><Stack direction='row' spacing={0.5} p={0.5} mr={5}>

                                    <Stack>
                                        <img src={Chatbotlogo} style={{ height: '18px', width: '18px' }} alt="chatbot" />
                                    </Stack>
                                    <Stack sx=
                                        {{
                                            p: 0.5
                                        }}
                                    >
                                        <Loader />
                                    </Stack>
                                </Stack></>)
                                : (<></>)
                            }
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

                                                            <CloseSharpIcon sx={{ color: '#001C46', fontSize: '18px', cursor: 'pointer', position: "absolute", right: "5px", bottom: "2px" }}
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
                                                    padding: '5px 10px',
                                                    height: "10px",
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

                                                            <CloseSharpIcon sx={{ color: '#001C46', fontSize: '18px', cursor: 'pointer', position: "absolute", right: "5px", bottom: "2px" }}
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
                                                    height: "10px"

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

                                <TextField
                                    placeholder={placeHolderText}
                                    // disabled={isTermAccept ? false : true}
                                    onKeyDown={handleKeyDown}
                                    fullWidth
                                    // disabled={disableBtn}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <TelegramIcon sx={{ cursor: 'pointer', color: '#919191' }} onClick={sendTextMessage} />
                                            </InputAdornment>
                                        ),
                                    }}

                                    sx={{
                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                            padding: '5px 10px',

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
                                <ListItemText sx={{pr:"15px"}}><span style={{ fontSize: "13px" }}>{(initialButtons && initialButtons.length) ? initialButtons[1].title : ''}</span></ListItemText> </MenuItem>
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
                        position: 'fixed',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                        right: '80px',
                        transform: 'translateY(-20%)',
                        display: isReadmore ? 'block' : 'none',
                    }}
                    className="set-width"
                >

                    <Stack
                        sx={{
                            backgroundImage: 'linear-gradient(to right,#2731DD, #137CED)', display: 'flex', flexDirection: 'row', alignItems: 'center'
                        }}
                        p='15px'
                        maxHeight='30px'
                    >
                        <Stack onClick={() => handleReadMore('', '')} sx={{ cursor: 'pointer' }}>
                            <KeyboardArrowLeftIcon sx={{ fontSize: '30px', color: '#ffffff', fontWeight: 600 }} />
                        </Stack>
                        <Stack
                            sx={{ ml: '100px' }}
                        >
                            <Typography sx={{ color: '#ffffff' }}>View Jobs</Typography>
                        </Stack>

                    </Stack>

                    <Stack
                        sx={{
                            backgroundColor: '#ffffff', overflowY: 'scroll', maxHeight: '300px', minHeight: '300px', mb: '5px', p: 3
                        }} >

                        <Stack sx={{ pb: '15px', borderBottom: '1px solid lightgrey' }} direction='column' spacing={2}>

                            <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{selectedJobData[0]?.title_}</Typography>


                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Box>
                                    <CalendarTodayIcon sx={{ fontSize: '15px' }} />
                                </Box>
                                <Box sx={{ pl: '10px' }}>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>Posted {formatDate(selectedJobData[0]?.postingCreateTime_.seconds_)}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Box>
                                    <AccessTimeIcon sx={{ fontSize: '15px' }} />
                                </Box>
                                <Box sx={{ pl: '10px' }}>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{selectedJobData[0]?.customAttributes_.mapData.jobType.stringValues_[0]}</Typography>
                                </Box>
                            </Box>

                        </Stack>


                        <Stack>
                            {/* <Box sx={{ mt: '5px', fontSize: '16px', fontWeight: 600 }}>
                                <Typography>Let's Grow Together</Typography>
                            </Box> */}

                            <Box sx={{ mt: '5px' }}>
                                <Typography sx={{ fontSize: '14px' }}>
                                    <span dangerouslySetInnerHTML={{ __html: selectedJobData[0]?.description_ }} />
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
                                borderRadius: '5px', textTransform: 'capitalize', backgroundColor: '#146EF6', color: '#ffffff', fontWeight: 400, fontSize: '16px', height: '34px', boxShadow: 0, width: '100%',
                                '&:hover': {
                                    backgroundColor: '#146EF6',
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

                        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: "30px", cursor: 'pointer' }} className="bottom-cls">

                            <Box
                                component="div"
                                sx={{
                                    height: '50px',
                                    width: '50px',
                                    borderRadius: '50%',
                                    backgroundImage: `url("${c1}")`,
                                    backgroundSize: 'cover',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s, opacity 0.3s',
                                    transform: isChatbotOpen ? 'translateY(20%)' : 'none',
                                    opacity: isChatbotOpen ? 0 : 1,
                                    margin: '20px',
                                    position: 'relative',
                                    zIndex: 5,
                                }}
                                onClick={intializeChatBot}
                            ></Box>
                            {(initialButtons && initialButtons.length) ?
                                (<>
                                    <Stack >
                                        <Box component='div' sx={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'row', borderRadius: '20px', boxShadow: 'rgb(0 0 0 / 16%) 0px 1px 15px 2px' }} onClick={intializeChatBot}>
                                            <Box component='div' sx={{ p: '18px 22px 16px 18px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography sx={{ fontSize: '14px', color: '#1A1A1A' }}>{initialText} </Typography>
                                            </Box>

                                            <Box component='div' sx={{ pr: '7px', pt: '18px' }}>
                                                <CloseSharpIcon sx={{ fontSize: '20px' }} />
                                            </Box>
                                        </Box>
                                        <Stack mt={1} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Button
                                                variant="outlined"
                                                disableRipple
                                                startIcon={<SearchIcon />}
                                                sx={{
                                                    borderRadius: '20px', textTransform: 'capitalize', borderColor: '#146EF6', color: '#146EF6', fontWeight: 400, fontSize: '12px', height: '34px', whiteSpace: 'nowrap',
                                                    '&:hover': {
                                                        backgroundColor: '#146EF6',
                                                        borderColor: '#146EF6',
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
                                                    borderRadius: '20px', textTransform: 'capitalize', borderColor: '#146EF6', color: '#146EF6', fontWeight: 400, fontSize: '12px', height: '34px', whiteSpace: 'nowrap',
                                                    '&:hover': {
                                                        backgroundColor: '#146EF6',
                                                        borderColor: '#146EF6',
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

        </Stack>
    );
};

export default Chatbot;
