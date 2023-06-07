import React, { useState } from "react";
import { Stack, Card, Typography, Box, TextField } from "@mui/material";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import TelegramIcon from '@mui/icons-material/Telegram';
import InputAdornment from '@mui/material/InputAdornment';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';

import c from '../Rectangle 99@2x.svg';
import c1 from '../Rectangle 99.png'

import Chatbotlogo from '../Rectangle 98@2x.svg';


const Chatbot = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                height: '90vh'
            }}
            mr={5}
        >
            {/* {!isChatbotOpen ? ( */}

            <Card
                sx={{
                    width: '300px',
                    '& .MuiPaper-root.MuiCard-root ': {
                        pt: 0,
                    },
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                    borderBottomLeftRadius: '15px',
                    display: !isChatbotOpen ? 'none' : 'block',
                    position: 'absolute',
                    top: '50%',
                    right: '100px',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)'
                }}
            >
                <Stack
                    sx={{
                        backgroundImage: 'linear-gradient(to right,#2731DD, #137CED)',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    direction='row'
                    spacing={2}
                    p='10px'
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
                            Accuick <Box component='span' sx={{ fontWeight: 400 }}>SmartBot</Box>
                        </Typography>
                    </Stack>
                    <Box component='div' onClick={toggleChatbot} >
                        <CloseSharpIcon sx={{ color: '#001C46', fontSize: '18px', cursor: 'pointer' }} />
                    </Box>
                </Stack>

                <Stack sx={{ height: '40vh', backgroundColor: '#ffffff', p: '10px' }}>
                    Chatbot content goes here...
                </Stack>

                <Stack direction="row" alignItems="center" pt={2} mr={1} ml={1} pb={1}
                    sx={{ borderTop: '1px solid lightgrey' }} spacing={1}>

                    <TextField
                        variant="outlined"
                        placeholder="Type your message..."
                        fullWidth
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
                    backgroundImage: `url(${c1})`,
                    backgroundSize: 'cover',
                    cursor: 'pointer',
                }}
            ></Box>
        </Stack>
    );
};

export default Chatbot;
