import React, { useState, useRef } from "react";
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel'

import c from '../Rectangle 99@2x.svg';
import c1 from '../Rectangle 99@2x-1.png'
import profileIcon from '../profile.jpg';
import Chatbotlogo from '../Rectangle 98@2x.svg';
import apiService from "../shared/api/apiService";



const Chatbot = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('job_id');
    //   alert(queryParam);

    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messagesList, setMessagesList] = React.useState<any[] | never[]>([]);
    const [updated, setUpdated] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isReadmore, setIsReadMore] = useState(false)
    const [isShowLocation, setIsShowLocation] = useState(false)
    const [isButtonHover, setIsButtonHover] = useState(false)
    const scrollRef = useRef(null);

    const isChatOpenedFirstTime = localStorage.getItem("isChatOpened") ? true : false;


    const handleFileUpload = () => {
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        fileInput.click();
    };

    const handleReadMore = () => {
        setIsReadMore(!isReadmore)
    }

    const handleShowLocation = () => {
        setIsShowLocation(!isShowLocation)
    }



    const handleSlideIn = () => {
        return (Number(activeStep) === 0 || Number(activeStep)) ? true : false;
    };


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
    const [activeStep, setActiveStep] = React.useState(0);
    const [slideDirection, setSlideDirection] = React.useState<'left' | 'right'>('left')
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSlideDirection('left');
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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


    const sendMessage = (msg: string, msgObj: any) => {
        let obj = {
            "text": msg,
            "sent": true,
            "metadata": {
                "job_id": (queryParam ? queryParam : "1")
            }
        }
        console.log(msgObj);
        // let oldObj =  msgObj;  
        msgObj['hideBtns'] = true;
        dataToPass.metadata.job_id = (queryParam ? queryParam : "1");
        setMessagesList(prevArray => [...prevArray, obj]);
        dataToPass.message = msg;
        getTableData();

    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            //   console.log(event.target.value);
            let obj = {
                "text": event.target.value,
                "sent": true,
                "metadata": {
                    "job_id": (queryParam ? queryParam : 1)
                }
            }
            setMessagesList(prevArray => [...prevArray, obj]);
            dataToPass.message = event.target.value;
            dataToPass.metadata.job_id = (queryParam ? queryParam : "1");
            getTableData();
            //   setUpdated(message);
        }
    };


    let checkUseEffectLoad = false;
    let dataToPass = {
        "sender": randStr,
        "message": "/restart",
        "metadata": {
            "job_id": (queryParam ? queryParam : "1")
        }
    };


    const getTableData = () => {
        // alert(randStr);
        setInputValue('');
        apiService.sendMessage(dataToPass).then((response: any) => {
            if (!response.error) {
                if (response.data && response.data.length) {
                    response.data.map((obj: any) => {
                        //   console.log(response.data[0]);
                        const newObject = obj;
                        newObject.sent = false;
                        newObject.hideBtns = (newObject.buttons && newObject.buttons.length) ? false : true
                        setMessagesList(prevArray => [...prevArray, newObject]);

                    })
                    console.log(messagesList);
                    if (response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) {
                        setDisableBtn((response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) ? true : false);

                    } else {
                        setDisableBtn((response.data[response.data.length - 1].buttons && response.data[response.data.length - 1].buttons.length) ? false : false);

                    }
                    console.log(scrollRef);
                    if (scrollRef.current) {
                        // scrollRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                    //    setDisableBtn((newObject.buttons && newObject.buttons.length) ? true : false);


                } else {
                    if (checkUseEffectLoad) {
                        dataToPass.message = "/job_screening";
                        checkUseEffectLoad = false;
                        getTableData();

                    }
                }

            }
        })
    }
    React.useEffect(() => {
        if (!checkUseEffectLoad) {
            getTableData();
        }
        checkUseEffectLoad = true;
        setLoaded(true);
    }, []);

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
                    right: '80px',
                    transform: isChatbotOpen ? 'translate(-5%,-15%)' : 'translateY(5%)',
                    transition: 'all .1s ease-out',
                    transformOrigin: "bottom right",
                    opacity: isChatbotOpen ? 1 : 0,
                    display: isReadmore ? 'none' : 'block',

                }}
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
                        backgroundColor: '#ffffff', overflowY: 'scroll', maxHeight: '330px', minHeight: '300px', mb: '5px'
                    }} >

                    <ReactScrolableFeed >

                        <Stack sx={{ pl: '10px', pb: '10px', pt: '10px' }}>
                            <Typography component='p' sx={{ fontSize: '14px' }}>
                                The information you provide to the careers website <br />
                                and chatbot will be collected to improve your <br />
                                experience. Please read our
                                <Box component='span'
                                    sx={{
                                        color: '#146EF6',
                                        fontSize: '14px',
                                        fontWeight: 600,
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
                                        color: '#146EF6',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}>
                                    Terms of Use.
                                </Box>
                            </Typography>
                        </Stack>

                        <Stack sx={{ backgroundColor: '#fbfbfb', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', m: '25px', borderRadius: '30px', border: '1px solid #e2e2e2', borderStyle: 'dashed' }}>
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
                        </Stack>

                        <Stack sx={{ p: '25px', height: '300px' }}>
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
                        </Stack>

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


                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '350px', position: 'relative', mr: 1, ml: 1 }}>

                            <Stack
                                sx={{
                                    display: activeStep === 0 ? 'none' : 'block',
                                    mb: '60px'
                                }}
                            >
                                <Button
                                    disableRipple
                                    size="small"
                                    variant="contained"
                                    onClick={handleBack}
                                    sx={{
                                        position: 'absolute',
                                        left: 0,
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
                                steps.map((step, i) => {
                                    return <>

                                        <Slide direction={slideDirection} in={i === activeStep} mountOnEnter unmountOnExit
                                            timeout={{ appear: 0, enter: 300, exit: 0 }}
                                        >

                                            <Paper
                                                square
                                                elevation={0}
                                                sx={{
                                                    display: (i === activeStep) ? 'flex' : 'none',
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

                                display: activeStep === maxSteps - 1 ? 'none' : 'block',
                                mb: '60px',

                            }}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{
                                        position: 'absolute',
                                        right: 0,
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
                                    {`${activeStep + 1} of ${maxSteps}`}
                                </Typography>
                            </Box>

                            <Box>
                                <MobileStepper
                                    variant="progress"
                                    steps={maxSteps}
                                    position="static"
                                    sx={{ width: '160px', }}
                                    activeStep={activeStep}
                                    nextButton={null}
                                    backButton={null}
                                />
                            </Box>

                        </Stack>


                        {messagesList.map((msgObj) => (
                            <>
                                {!msgObj.sent ? (
                                    <>
                                        <>

                                            <Stack direction='row' spacing={0.5} p={0.5} mr={5}>

                                                <Stack>
                                                    <img src={Chatbotlogo} style={{ height: '18px', width: '18px' }} alt="chatbot" />
                                                </Stack>
                                                <Stack sx=
                                                    {{
                                                        backgroundColor: '#374458', borderRadius: '5px', pr: 5
                                                    }}
                                                >
                                                    <Typography component='p' sx={{ color: '#ffffff', padding: '5px', textAlign: 'left' }}>
                                                        {msgObj.text}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </>

                                        <>
                                            {(msgObj.buttons && msgObj.buttons.length && !msgObj.hideBtns) ?
                                                (
                                                    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2} mt={1} ml={3}>
                                                        {msgObj.buttons.map((btnObj: any) => (
                                                            <Button variant="outlined" onClick={() => sendMessage(btnObj.payload, msgObj)} sx={{ borderRadius: '20px', textTransform: 'capitalize', borderColor: '#146EF6', color: '#146EF6', fontWeight: 400, fontSize: '16px', height: '34px', width: 'auto' }}>
                                                                {btnObj.title}
                                                            </Button>
                                                        ))}
                                                    </Stack>
                                                ) :
                                                (<></>)}
                                        </>
                                    </>


                                ) : (
                                    <Stack direction='column' p={0.5} alignItems='flex-end' >
                                        <Stack direction='row' spacing={0.5} mr={1}>
                                            <Stack sx=
                                                {{
                                                    backgroundColor: '#146EF6', borderRadius: '5px', p: 0.5, height: '31px', display: 'flex', flexDirection: 'row', justifyContent: 'center'
                                                }}

                                            >
                                                <Typography component='p' sx={{ color: '#ffffff', padding: '5px', textAlign: 'left' }}>
                                                    {msgObj.text}
                                                </Typography>
                                            </Stack>

                                            <Stack>
                                                <img src={profileIcon} style={{ height: '30px', width: '30px' }} alt="chatbot" />
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                )}
                            </>
                            // <Stack direction='row' spacing={0.5} p={0.5} mr={5}>

                            //     <Stack>
                            //         <img src={Chatbotlogo} style={{ height: '18px', width: '18px' }} alt="chatbot" />
                            //     </Stack>
                            //     <Stack sx=
                            //         {{
                            //             backgroundColor: '#374458', borderRadius: '5px', pr: 5
                            //         }}
                            //     >
                            //         <Typography component='p' sx={{ color: '#ffffff', padding: '5px', textAlign: 'left' }}>
                            //             {msgObj.text}
                            //         </Typography>
                            //     </Stack>
                            // </Stack>

                        ))}


                        {/* <Stack direction='column' p={0.5} alignItems='flex-end' >
                        <Stack direction='row' spacing={0.5} mr={1}>
                            <Stack sx=
                                {{
                                    backgroundColor: '#146EF6', borderRadius: '5px', p: 0.5, width: '49px', height: '31px', display: 'flex', flexDirection: 'row', justifyContent: 'center'
                                }}

                            >
                                <Typography component='p' sx={{ color: '#ffffff', padding: '5px', textAlign: 'left' }}>
                                    Yes
                                </Typography>
                            </Stack>

                            <Stack>
                                <img src={Chatbotlogo} style={{ height: '18px', width: '18px' }} alt="chatbot" />
                            </Stack>
                        </Stack>
                    </Stack> */}


                        {/* <Stack p={0.5} mr={5}>
                        <Stack direction='row' spacing={0.5}>
                            <Stack>
                                <img src={Chatbotlogo} style={{ height: '18px', width: '18px' }} alt="chatbot" />
                            </Stack>
                            <Stack sx=
                                {{
                                    backgroundColor: '#374458', borderRadius: '5px', pr: 1.5
                                }}
                            >
                                <Typography component='p' sx={{ color: '#ffffff', padding: '5px', textAlign: 'left' }}>
                                    Do you have any Concerns about working in a call center environment on a recorded line?
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction='row' spacing={2} mt={1}>
                            <Button variant="outlined" sx={{ borderRadius: '20px', textTransform: 'capitalize', borderColor: '#146EF6', color: '#146EF6', fontWeight: 400, fontSize: '16px', height: '34px', width: '80px', ml: 2.5 }}
                                disableRipple>
                                Yes
                            </Button>
                            <Button variant="outlined" sx={{ borderRadius: '20px', textTransform: 'capitalize', borderColor: '#146EF6', color: '#146EF6', fontWeight: 400, fontSize: '16px', height: '34px', width: '80px' }}
                                disableRipple>
                                No
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack p={0.5} mr={5}>
                        <Stack direction='row' spacing={0.5}>
                            <Stack>
                                <img src={Chatbotlogo} style={{ height: '18px', width: '18px' }} alt="chatbot" />
                            </Stack>
                            <Stack sx=
                                {{
                                    backgroundColor: '#374458', borderRadius: '5px', pr: 1.5
                                }}
                            >
                                <Typography component='p' sx={{ color: '#ffffff', padding: '5px', textAlign: 'left' }}>
                                    Do you have any Concerns about working in a call center environment on a recorded line?
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction='row' spacing={2} mt={1}>
                            <Button variant="outlined" sx={{ borderRadius: '20px', textTransform: 'capitalize', borderColor: '#146EF6', color: '#146EF6', fontWeight: 400, fontSize: '16px', height: '34px', width: '80px', ml: 2.5 }}
                                disableRipple>
                                Yes
                            </Button>
                            <Button variant="outlined" sx={{ borderRadius: '20px', textTransform: 'capitalize', borderColor: '#146EF6', color: '#146EF6', fontWeight: 400, fontSize: '16px', height: '34px', width: '80px' }}
                                disableRipple>
                                No
                            </Button>
                        </Stack>
                    </Stack> */}
                    </ReactScrolableFeed>
                </Stack>

                <Stack
                    id='send-container'
                    direction="row" alignItems="center" pt='5%' mr={1} ml={1} pb='5%'
                    sx={{ borderTop: '1px solid lightgrey', bottom: '0px' }} spacing={1}
                    position='sticky'
                    zIndex={1}
                    maxHeight='50px'
                >

                    <TextField
                        variant="outlined"
                        placeholder="Type your message..."
                        onKeyDown={handleKeyDown}
                        fullWidth
                        disabled={disableBtn}
                        value={inputValue}
                        onChange={handleInputChange}
                        sx={{
                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                padding: '5px 10px',

                            },
                            '& .MuiInputBase-root.MuiOutlinedInput-root ': {
                                borderRadius: '15px',
                                backgroundColor: '#F5F5F5'
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
                            endAdornment: (
                                <InputAdornment position="end">
                                    <TelegramIcon sx={{ cursor: 'pointer', color: '#919191' }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box sx={{ cursor: 'pointer' }}>
                        <AttachFileRoundedIcon sx={{ fontSize: '18px', color: '#919191' }} />
                    </Box>
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
            >

                <Stack
                    sx={{
                        backgroundImage: 'linear-gradient(to right,#2731DD, #137CED)', display: 'flex', flexDirection: 'row', alignItems: 'center'
                    }}
                    p='15px'
                    maxHeight='30px'
                >
                    <Stack onClick={handleReadMore} sx={{ cursor: 'pointer' }}>
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

                        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Manager, Manufacturing Sales</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box>
                                <LocationOnOutlinedIcon sx={{ fontSize: '20px' }} />
                            </Box>
                            <Stack sx={{ pl: '10px' }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Philadelphia, PA, United States of America</Typography>
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
                                        // overflow: 'hidden',
                                        // maxHeight: isShowLocation ? '1000px' : '0',
                                        // transition: 'max-height 0.3s ease',
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


                    <Stack>
                        <Box sx={{ mt: '5px', fontSize: '16px', fontWeight: 600 }}>
                            <Typography>Let's Grow Together</Typography>
                        </Box>

                        <Box sx={{ mt: '5px' }}>
                            <Typography sx={{ fontSize: '14px' }}>
                                Our mission is to live our “at your side” promise and simplify and enrich the lives of our customers, employees, and communities. "At your side" is more than a slogan to us; it’s the purpose we do our best to fulfill every day. With a legacy spanning over a century, this is a great place to launch or expand any career and push the boundaries of what comes next. We're committed to achieving shared success, and we provide opportunities for you to develop through experience, exposure and education. Our people have always leveraged their unique perspectives to keep us on the right track for a lasting future. If you want to innovate, learn, and grow with a global leader that builds products, services, and a company people love, then we’ll be “at your side” every step of the way.
                            </Typography>
                        </Box>


                        <Box sx={{ mt: '5px' }}>
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
                        </Stack>
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


            {!isChatbotOpen ? (<Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: "30px", cursor: 'pointer' }}>

                <Box
                    component="div"
                    onClick={toggleChatbot}
                    sx={{
                        height: '50px',
                        width: '50px',
                        borderRadius: '50%',
                        backgroundImage: `url("${c1}")`,
                        backgroundSize: 'cover',
                        cursor: 'pointer',
                        transition: 'transform 0.3s, opacity 0.3s',
                        transform: isChatbotOpen ? 'translateY(20%)' : 'none',
                        // top: isChatbotOpen ? '50%' : 'none',
                        opacity: isChatbotOpen ? 0 : 1,
                        margin: '20px',
                        position: 'relative',
                        zIndex: 5,
                    }}
                ></Box>

                <Stack >
                    <Box component='div' sx={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'row', borderRadius: '20px', boxShadow: 'rgb(0 0 0 / 16%) 0px 1px 15px 2px' }}>
                        <Box component='div' sx={{ p: '18px 22px 16px 18px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: '16px' }}>Hi! How can we be at your side today?</Typography>
                        </Box>

                        <Box component='div' sx={{ p: '5px' }}>
                            <CloseSharpIcon sx={{ fontSize: '20px' }} />
                        </Box>
                    </Box>
                    <Stack mt={1} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            variant="outlined"
                            disableRipple
                            startIcon={<SearchIcon />}
                            onClick={toggleChatbot}
                            sx={{
                                borderRadius: '20px', textTransform: 'capitalize', borderColor: '#146EF6', color: '#146EF6', fontWeight: 400, fontSize: '16px', height: '34px', whiteSpace: 'nowrap',
                                '&:hover': {
                                    backgroundColor: '#146EF6',
                                    borderColor: '#146EF6',
                                    color: '#ffffff'
                                }
                            }}
                            className="chat-button"
                        >
                            Explore jobs
                        </Button>
                        <Button variant="outlined"
                            sx={{
                                borderRadius: '20px', textTransform: 'capitalize', borderColor: '#146EF6', color: '#146EF6', fontWeight: 400, fontSize: '16px', height: '34px', whiteSpace: 'nowrap',
                                '&:hover': {
                                    backgroundColor: '#146EF6',
                                    borderColor: '#146EF6',
                                    color: '#ffffff'
                                }
                            }}
                            disableRipple
                            startIcon={<HelpOutlineIcon />}
                        >
                            Ask  <Box component='span' sx={{ textTransform: 'lowercase', pl: '5px', pr: '5px' }}>a</Box>  question
                        </Button>
                    </Stack>
                </Stack>
            </Stack>) : <Stack></Stack>}

        </Stack >
    );
};

export default Chatbot;
