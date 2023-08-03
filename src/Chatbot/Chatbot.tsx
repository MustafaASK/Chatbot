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


import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
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
    //   alert(queryParam);

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
            dataToPass.metadata.job_id = (queryParam ? queryParam : "1");
            setMessagesList(prevArray => [...prevArray, obj]);
            dataToPass.message = msg;
            getTableData();
        }

    };



    const handleFileUpload = () => {
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        fileInput.click();
    };

    const readFile = async (e: any) => {

        let fileData = e.target.files ? e.target.files[0] : e.dataTransfer.files[0]
        setFileData(fileData)


    }

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

    const handleReadMore = (obj: any) => {
        if (obj) {
            setSelectedJobData(prevArray => [obj]);
        }
        setIsReadMore(!isReadmore)
    }

    const sendValue = (event: any, value: any) => {
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
            dataToPass.metadata.job_id = (queryParam ? queryParam : "1");
            setMessagesList(prevArray => [...prevArray, obj]);
            value = (value.search("candid") !== -1) ? value.split(" ")[1] : value;
            dataToPass.message = `/${intentType}{"${entityType}": "${value}"}`
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
        dataToPass.metadata.job_id = (queryParam ? queryParam : "1");
        setMessagesList(prevArray => [...prevArray, obj]);
        dataToPass.message = `/${intentType}{"${entityType}": "${formattedeKyValue}"}`
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
                let searchResp = await apiService.searchJobTitle(titleSearchValue)
                let filteredValues = searchResp.data.filter((data: string) => data !== "")
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
        dataToPass.metadata.job_id = (queryParam ? queryParam : "1");
        setMessagesList(prevArray => [...prevArray, obj]);
        dataToPass.message = `/input_select_job{"select_job": "${jobData.requisitionId_}"}`
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
        dataToPass.metadata.job_id = (queryParam ? queryParam : "1");
        setMessagesList(prevArray => [...prevArray, obj]);
        dataToPass.message = type === "input_job_title" ? `/${type}{"job_title": "${value}"}` : `/${type}{"job_location": "${value}"}`;
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
                "job_id": (queryParam ? queryParam : "1")
            }
        };
        getTableData();
    }

    const makeJobsCourousal = (rowObj: any) => {
        // setMaxSteps(rowObj.jobs.length)
        console.log(rowObj);

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
                                            <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{job.companyDisplayName_}</Typography>
                                        </Box>
                                    </Box>

                                </Stack>

                                <Box>
                                    <Button
                                        disableRipple
                                        onClick={() => handleReadMore(job)}
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
                                    >
                                        I'm Interested
                                    </Button>
                                </Box>
                            </Stack>

                        </Stack>
                    </Stack>

                )
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
        return (randomNumber); // You can remove this line if you don't want to display the number in the console
    }
    let generateNum = generateRandomNumber();


    const [randStr, setRandStr] = useState(generateNum);
    // let randStr = generateRandomNumber();

    // setRandStr(generateNum);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
        localStorage.setItem("isChatOpened", "true")
    };
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
        dataToPass.metadata.job_id = (queryParam ? queryParam : "1");
        setMessagesList(prevArray => [...prevArray, obj]);
        dataToPass.message = msg.payload;
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
        dataToPass.metadata.job_id = (queryParam ? queryParam : "1");
        setMessagesList(prevArray => [...prevArray, obj]);
        dataToPass.message = msg;
        getTableData();

    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
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
                setMessagesList(prevArray => [...prevArray, obj]);
                if (intentType === "input_job_location") {
                    dataToPass.message = `/${intentType}{"${entityType}": "${event.target.value}"}`
                } else {
                    dataToPass.message = event.target.value;
                }

                // dataToPass.message = type === "input_job_location" ?  `/${type}{"job_location": "${event.target.value}"}` : `${event.target.value}`;
                // dataToPass.message = event.target.value;
                console.log(event.target.value);
                dataToPass.metadata.job_id = (queryParam ? queryParam : "1");
                getTableData();
            }
        }
    };

    //send text as input 

    const sendTextMessage = () => {
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
            setMessagesList(prevArray => [...prevArray, obj]);
            if (intentType === "input_job_location") {
                dataToPass.message = `/${intentType}{"${entityType}": "${inputValue}"}`
            } else {
                dataToPass.message = inputValue;
            }

            dataToPass.metadata.job_id = (queryParam ? queryParam : "1");
            getTableData();
        }
    }


    let checkUseEffectLoad = false;
    let dataToPass = {
        "sender": `${randStr}`,
        "message": "/greet",
        "metadata": {
            "job_id": (queryParam ? queryParam : "1")
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
                "job_id": (queryParam ? queryParam : "1")
            }
        };
        setFileData(null)
        getTableData();
    }

    let isLoadedFirstTime = false;
    // let slideCountArray = []
    useEffect(() => {
        sessionStorage.setItem("isLoadedFirsttime", 'true')
    }, [])


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
                                        newObject.maxSteps = newObject.custom?.jobs ? newObject.custom?.jobs?.length + 1 : 1;

                                        newObject.jobs = newObject.custom?.jobs ? newObject.custom?.jobs : [];
                                        makeJobsCourousal(newObject);
                                        if (sessionStorage.getItem("isLoadedFirsttime") === "false") {
                                            console.log("is coming juyyy")
                                            setActiveStep((prevState) => [...prevState, { "stepNumber": 0 }])
                                            setSliderCount((prevState) => prevState + 1)
                                            newObject.slideCount = sliderCount + 1;
                                            isLoadedFirstTime = false
                                        }

                                    }
                                    sessionStorage.setItem("isLoadedFirsttime", 'false')

                                }
                                if (i + 1 === response.data.length) {
                                    setLoaded(false);
                                    if (obj.custom?.ui_component && obj.custom.placeholder_text !== "") {

                                        obj.custom?.placeholder_text ? setPlaceHolderText(obj.custom?.placeholder_text) : setPlaceHolderText("Type your message..");

                                    } else {
                                        setPlaceHolderText("Type your message..")
                                    }
                                }
                                setMessagesList(prevArray => [...prevArray, newObject]);
                                setIntialData(prevArray => [...prevArray, newObject])
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
            getTableData();
        }
        sessionStorage.setItem("isChatBotIntialized", "false")
        checkUseEffectLoad = true;
        // setLoaded(true);
    }, []);
    React.useEffect(() => {
        // console.log(messagesList, 'messsage');
    }, [messagesList]);

    return (

        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                height: '100vh',
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
                    position: 'fixed',
                    zIndex: isChatbotOpen ? 4 : -1,
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                    right: '40px',
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
                                    height: '35px',
                                    width: '40px',
                                }}
                            />
                        </Box>
                        <Typography
                            sx={{ color: '#ffffff', fontSize: '17px', fontWeight: 700 }}
                        >
                            CXninja <Box component='span' sx={{ fontWeight: 400 }}>SmartBot</Box>
                        </Typography>
                    </Stack>
                    <Box component='div' onClick={toggleChatbot} >
                        <CloseSharpIcon sx={{ color: '#001C46', fontSize: '18px', cursor: 'pointer' }} />
                    </Box>
                </Stack>


                <Stack ref={scrollRef}
                    id='content-container'
                    sx={{
                        backgroundColor: '#ffffff', overflowY: 'scroll', maxHeight: '385px', minHeight: '350px', mb: '5px'
                    }} >

                    <ReactScrolableFeed >

                        <Stack sx={{ pl: '10px', pb: '10px', pt: '10px' }}>
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
                        </Stack>

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
                                        <Stack direction='column' p={0.5} alignItems='flex-end' >
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
                                                {msgObj.newJobs && msgObj.newJobs.length ?
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
                                                                msgObj.newJobs.map((step: any, i: any) => {
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

                                                                                {step.container}

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

                                                        </Stack>
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
                            (
                                <TextField

                                    placeholder={placeHolderText}
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
                            )
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
                            <ListItemText><span style={{ fontSize: "13px" }}>{(initialButtons && initialButtons.length) ? initialButtons[1].title : ''}</span></ListItemText> </MenuItem>
                        <Divider sx={{ marginTop: "1px !important", marginBottom: "1px !important" }} />
                        <MenuItem sx={{ padding: "4px 5px" }} onClick={() => handleCloseMenu((initialButtons && initialButtons.length) ? initialButtons[0].payload : '', (initialButtons && initialButtons.length) ? initialButtons[0] : '')}>
                            <ListItemIcon><HelpOutlineIcon fontSize="small" /></ListItemIcon>
                            <ListItemText><span style={{ fontSize: "13px" }}>{(initialButtons && initialButtons.length) ? initialButtons[0].title : ''}</span></ListItemText></MenuItem>

                    </Menu>
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
                    <Stack onClick={() => handleReadMore('')} sx={{ cursor: 'pointer' }}>
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
                        {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box>
                                <LocationOnOutlinedIcon sx={{ fontSize: '20px' }} />
                            </Box>
                            <Stack sx={{ pl: '10px' }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{selectedJobData[0]?.city}, {selectedJobData[0]?.state} {selectedJobData[0]?.zipcode}</Typography>
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        fontWeight: 400,
                                        display: isShowLocation ? 'none' : 'block',
                                    }}>+11 locations
                                </Typography>

                                <Stack
                                    direction='column'
                                    spacing={1}
                                    sx={{
                                        display: isShowLocation ? 'block' : 'none',
                                    }}
                                >
                                    <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Richmond, VA, United States of America</Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Miami, FL, United States of America</Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Atlanta, GA, United States of America
                                        Greenville, SC, United States of America</Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Charlotte, NC, United States of America</Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Charleston, WV, United States of America</Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Charleston, SC, United States of America</Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Orlando, FL, United States of America
                                        Bridgewater, NJ, United States of America</Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Boston, MA, United States of America
                                        New York, NY, United States of America</Typography>
                                </Stack>

                            </Stack>
                            <Box
                                onClick={handleShowLocation}
                                sx={{ cursor: 'pointer' }}
                            >
                                {isShowLocation ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                            </Box>
                        </Box> */}

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
                                <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{selectedJobData[0]?.companyDisplayName_}</Typography>
                            </Box>
                        </Box>

                    </Stack>


                    <Stack>
                        <Box sx={{ mt: '5px', fontSize: '16px', fontWeight: 600 }}>
                            <Typography>Let's Grow Together</Typography>
                        </Box>

                        <Box sx={{ mt: '5px' }}>
                            <Typography sx={{ fontSize: '14px' }}>
                                <span dangerouslySetInnerHTML={{ __html: selectedJobData[0]?.description_ }} />
                                {/* {selectedJobData[0]?.description} */}
                            </Typography>
                        </Box>


                        {/* <Box sx={{ mt: '5px' }}>
                            <Typography sx={{ fontSize: '14px' }}>
                                The <Box component='span' sx={{ fontWeight: 600 }}>Manager, Manufacturing Sales</Box> focuses on expansion of Brother Mobile Solutions’ (BMS) sales revenue and market share within the major target vertical market – Manufacturing (includes Auto ID, Safety Signage & MRO) in North America. This role collaborates works under the leadership of the Senior Manager, Manufacturing Sales to execute cutting edge sales strategies to meet company’s revenue goals and profits. Additional focus areas for this position include but are not limited to: pipeline management, forecasting, and sales reporting.
                            </Typography>
                        </Box>

                        <Box sx={{ mt: '15px' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, textDecoration: 'underline' }}>
                                Sales Strategy Execution
                            </Typography>
                        </Box>

                        <Stack sx={{ mt: '15px' }}>
                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>
                                <Box sx={{ height: '8px', width: '15px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>
                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Execute the overall sales strategy and tactical plan for the Manufacturing vertical market (Auto ID, MRO, Signage); provide feedback on strategy to leadership
                                    </Typography>
                                </Box>
                            </Stack>


                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>
                                <Box sx={{ height: '8px', width: '15px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>
                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Drive and build a strong end-user pipeline; close opportunities in support of the overall sales strategy, working closely with end-users and channel partners
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>
                                <Box sx={{ height: '8px', width: '15px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>
                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Drive and build a strong end-user pipeline; close opportunities in support of the overall sales strategy, working closely with end-users and channel partners
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>
                                <Box sx={{ height: '8px', width: '15px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>
                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Drive and build a strong end-user pipeline; close opportunities in support of the overall sales strategy, working closely with end-users and channel partners
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>
                                <Box sx={{ height: '8px', width: '15px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>
                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Drive and build a strong end-user pipeline; close opportunities in support of the overall sales strategy, working closely with end-users and channel partners
                                    </Typography>
                                </Box>
                            </Stack>


                        </Stack>

                        <Box sx={{ mt: '15px' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, textDecoration: 'underline' }}>
                                Reporting, Budgeting, & Forecasting
                            </Typography>
                        </Box>

                        <Stack sx={{ mt: '15px' }}>

                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>

                                <Box sx={{ height: '8px', width: '15px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>

                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Provide timely and comprehensive sales reports on revenue attainment versus quota, pipeline progress, and sales forecasts for the demand planning process
                                    </Typography>
                                </Box>

                            </Stack>

                        </Stack>

                        <Stack direction='column' spacing={1}>
                            <Box>
                                <Typography>---</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '14px' }}>Qualifications</Typography>
                            </Box>
                        </Stack>

                        <Box sx={{ mt: '15px' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                                Education
                            </Typography>
                        </Box>

                        <Stack sx={{ mt: '15px' }}>

                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>

                                <Box sx={{ height: '8px', width: '15px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>

                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Bachelor's Degree (or equivalent experience) required, preferably in the field of Business, Marketing, or a related technical discipline
                                    </Typography>
                                </Box>

                            </Stack>

                        </Stack>

                        <Box sx={{ mt: '15px' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                                Experience
                            </Typography>
                            <Box sx={{ mt: '5px' }}>
                                <Typography sx={{ fontSize: '14px' }}>
                                    7+ years of combined experience spanning:
                                </Typography>
                            </Box>
                        </Box>

                        <Stack sx={{ mt: '15px' }}>

                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>

                                <Box sx={{ height: '8px', width: '8px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>

                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Managing customer accounts, channel partners, and outside representative agencies in a sales capacity
                                    </Typography>
                                </Box>

                            </Stack>


                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>

                                <Box sx={{ height: '8px', width: '5px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>

                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Driving end-user/channel sales for a large region
                                    </Typography>
                                </Box>

                            </Stack>

                            <Typography sx={{ fontSize: '14px' }}>
                                2+ years of experience selling to the manufacturing, MRO, safety signage, auto-ID markets
                            </Typography>


                        </Stack>

                        <Box sx={{ mt: '15px' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                                Software/Technical Skills
                            </Typography>
                        </Box>

                        <Stack sx={{ mt: '15px' }}>

                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>

                                <Box sx={{ height: '8px', width: '6px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>

                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Knowledge of Microsoft Office (Word, Outlook, PowerPoint, Excel)
                                    </Typography>
                                </Box>

                            </Stack>


                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>

                                <Box sx={{ height: '8px', width: '8px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>

                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Knowledge of Customer Relationship Management (CRM) software (Salesforce preferred)
                                    </Typography>
                                </Box>

                            </Stack>
                        </Stack>

                        <Box sx={{ mt: '15px' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                                Other Skills/Knowledge/Abilities
                            </Typography>
                        </Box>

                        <Stack sx={{ mt: '15px' }}>

                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>

                                <Box sx={{ height: '8px', width: '6px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>

                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Ability to strategically analyze data, think, and execute on long-term action plan
                                    </Typography>
                                </Box>

                            </Stack>


                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} direction='row' spacing={2}>

                                <Box sx={{ height: '8px', width: '8px', backgroundColor: 'black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', mt: '5px' }}> </Box>

                                <Box>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        Aptitude for crafting creative sales strategies to achieve business growth and divisional profit
                                    </Typography>
                                </Box>

                            </Stack>
                        </Stack>

                        <Stack direction='column' spacing={1}>
                            <Box>
                                <Typography>---</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '14px', textDecoration: 'underline' }}>What We Offer Our Employees</Typography>
                            </Box>
                        </Stack>

                        <Stack sx={{ mt: '15px' }}>
                            <Typography sx={{ fontSize: '14px' }}>
                                We offer an above-market benefits package that includes a choice of Health Insurance plans (including Dental and Vision Insurance), a generous 401(k) Retirement Savings Plan, paid holidays, paid time off (PTO), and more!  Plus, if you’re considering an advanced degree that would help you achieve your development and career goals, Brother USA offers a highly competitive tuition reimbursement program.
                            </Typography>
                        </Stack>



                        <Stack sx={{ mt: '15px' }}>
                            <Typography sx={{ fontSize: '14px' }}>
                                #LI-Remote
                            </Typography>

                            <Typography sx={{ fontSize: '14px', mt: '15px' }}>
                                Brother International Corporation has earned its reputation as a premier provider of home office and business products, home appliances for the sewing and crafting enthusiast as well as industrial solutions that revolutionize the way we live and work. Brother International Corporation is a wholly-owned subsidiary of Brother Industries Ltd. With worldwide sales exceeding $6 billion, this global manufacturer was started more than 100 years ago. Bridgewater, New Jersey is the corporate headquarters for Brother in the Americas. It has fully integrated sales, marketing services, manufacturing, research and development capabilities located in the U.S. In addition to its headquarters, Brother has facilities in California, Illinois and Tennessee, as well as subsidiaries in Canada, Brazil, Chile, Argentina, Peru and Mexico. For more information, visit www.brother.com.
                            </Typography>
                        </Stack> */}
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
                        onClick={() => (sendJobValue(selectedJobData[0]), handleReadMore(''))}
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

        </Stack >
    );
};

export default Chatbot;
