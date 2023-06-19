import React, { useState, useRef } from "react";
import { Stack, Card, Typography, Box, TextField, Button } from "@mui/material";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import TelegramIcon from '@mui/icons-material/Telegram';
import InputAdornment from '@mui/material/InputAdornment';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import ReactScrolableFeed from 'react-scrollable-feed';


import c from '../Rectangle 99@2x.svg';
import c1 from '../Rectangle 99@2x-1.png'
import profileIcon from '../profile.jpg';
import Chatbotlogo from '../Rectangle 98@2x.svg';
import apiService from "../shared/api/apiService";



const Chatbot = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messagesList, setMessagesList] = React.useState<any[] | never[]>([]);
    const [updated, setUpdated] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef(null);

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
            "sent": true
        }
        console.log(msgObj);
        // let oldObj =  msgObj;  
        msgObj['hideBtns'] = true;
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
                "sent": true
            }
            setMessagesList(prevArray => [...prevArray, obj]);
            dataToPass.message = event.target.value;
            getTableData();
            //   setUpdated(message);
        }
    };


    let checkUseEffectLoad = false;
    let dataToPass = {
        "sender": randStr,
        "message": "/restart"
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
                    width: '358px',
                    '& .MuiPaper-root.MuiCard-root ': {
                        pt: 0,
                    },
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                    borderBottomLeftRadius: '15px',
                    // display: isChatbotOpen ? 'block' : 'none',
                    position: 'absolute',
                    top: '45%',
                    zIndex: 4,
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                    right: '80px',
                    opacity: isChatbotOpen ? 1 : 0,
                    transform: isChatbotOpen ? 'translateY(-50%)' : 'none',
                    transition: 'transform 0.5s,opacity 0.5s',
                    maxHeight: '100%',
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
                    p='10px'
                    maxHeight='50px'
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
                                    height: '37px',
                                    width: '37px',
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
                        backgroundColor: '#ffffff', overflowY: 'scroll', maxHeight: '380px', minHeight: '380px', mb: '5px'
                    }} >
                    <ReactScrolableFeed >
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

            </Card>

            <Box
                component="div"
                onClick={toggleChatbot}
                sx={{
                    height: '80px',
                    width: '80px',
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
        </Stack>
    );
};

export default Chatbot;
