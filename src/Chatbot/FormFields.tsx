import React, { useState } from 'react';
import './FormFields.css';
import { TextField, Box, Stack, Typography, Rating, IconButton } from '@mui/material';
import customerFace from '../chatbot_face.png';
import bmsChildLogo from '../bms-logo/bmslatestchild.png'
import { ReactSortable } from 'react-sortablejs';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


interface LoaderProps {
    isBms: boolean;
}
interface Choice {
    character: string;
    value: string;
}

const choices: Choice[] = [
    { character: 'A', value: 'Option 1' },
    { character: 'B', value: 'Option 2' },
    { character: 'C', value: 'Option 3' },
    { character: 'D', value: 'Option 4' }
];

const weightedChoices: Choice[] = [
    { character: 'A', value: 'Option 1' },
    { character: 'B', value: 'Option 2' },
    { character: 'C', value: 'Option 3' },
    { character: 'D', value: 'Option 4' }
];

const scores = Array.from({ length: 11 }, (_, i) => i);
const opinion = Array.from({ length: 6 }, (_, i) => i);

interface RankItem {
    id: string;
    value: string;
}

const initialRankingItems: RankItem[] = [
    { id: 'A', value: 'Option 1' },
    { id: 'B', value: 'Option 2' },
    { id: 'C', value: 'Option 3' },
    { id: 'D', value: 'Option 4' }
];

const FormFields = () => {
    const [isBms, setIsBms] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [rankingItems, setRankingItems] = useState<RankItem[]>(initialRankingItems);

    const onMultipleSelect = (value: string) => {
        setSelectedOptions((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((option) => option !== value)
                : [...prevSelected, value]
        );
    };

    const [selectedScore, setSelectedScore] = useState<number | null>(null);

    const onNetSelect = (score: number) => {
        setSelectedScore(score);
    };

    const [selectedOpinion, setSelectedOpinion] = useState<number | null>(null);

    const onNetSelectOpinion = (score: number) => {
        setSelectedOpinion(score);
    };


    const [selectedWeightedOption, setSelectedWeightedOption] = useState<string | null>(null);

    const onWeightedSelect = (value: string) => {
        setSelectedWeightedOption(value);
    };

    const [rating, setRating] = useState<number | null>(null);

    const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
        setRating(newValue);
    };

    return (
        <>
            <div>
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
                                <img src={customerFace} style={{
                                    height: '35px', width: '35px',
                                    borderRadius: "50%",
                                    // boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)' 
                                }} alt="chatbot" />
                            )}

                    </Stack>
                    <Stack sx=
                        {{
                            backgroundColor: '#eaeeed', borderRadius: '24px', p: 0.5, borderBottomLeftRadius: "5px", outline: "1px solid transparent", boxShadow: isBms ? '0px 2px 3px 0px #0000001F' : '',
                        }}
                    >
                        <Typography component='p' sx={{ color: 'black', padding: '5px', textAlign: 'left', fontSize: "13px" }}>
                            Please enter your details:
                        </Typography>
                    </Stack>
                </Stack>
                <Box className="form-container">
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        className="form-field"
                        InputProps={{
                            style: {
                                borderRadius: '50px',
                                border: '1px solid transparent',
                                opacity: 1,
                                marginBottom: '10px',
                            },
                        }}
                        InputLabelProps={{
                            style: { fontSize: '13px' }
                        }}
                    />

                    <TextField
                        label="Mobile Number"
                        variant="outlined"
                        fullWidth
                        className="form-field"
                        InputProps={{
                            style: {
                                borderRadius: '50px',
                                border: '1px solid transparent',
                                opacity: 1,
                                marginBottom: '10px',
                            },
                        }}
                        InputLabelProps={{
                            style: { fontSize: '13px' }
                        }}
                    />

                    <Box display="flex" justifyContent="space-between">
                        <TextField
                            label="First Name"
                            variant="outlined"
                            className="form-inline-field"
                            InputProps={{
                                style: {
                                    borderRadius: '50px',
                                    border: '1px solid transparent',
                                    opacity: 1,
                                    marginBottom: '10px',
                                },
                            }}
                            InputLabelProps={{
                                style: { fontSize: '13px' }
                            }}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            className="form-inline-field"
                            InputProps={{
                                style: {
                                    borderRadius: '50px',
                                    border: '1px solid transparent',
                                    opacity: 1,
                                    marginBottom: '10px',
                                },
                            }}
                            InputLabelProps={{
                                style: { fontSize: '13px' }
                            }}
                        />
                    </Box>

                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={2}
                        fullWidth
                        className="form-field"
                        InputProps={{
                            style: {
                                borderRadius: '20px',
                                border: '1px solid transparent',
                                opacity: 1,
                            },
                        }}
                        InputLabelProps={{
                            style: { fontSize: '13px' }
                        }}
                    />
                </Box>
            </div>
            {/* Multiple Choice Field */}
            <div>
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
                                <img src={customerFace} style={{
                                    height: '35px', width: '35px',
                                    borderRadius: "50%",
                                    // boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)' 
                                }} alt="chatbot" />
                            )}

                    </Stack>
                    <Stack sx=
                        {{
                            backgroundColor: '#eaeeed', borderRadius: '24px', p: 0.5, borderBottomLeftRadius: "5px", outline: "1px solid transparent", boxShadow: isBms ? '0px 2px 3px 0px #0000001F' : '',
                        }}
                    >
                        <Typography component='p' sx={{ color: 'black', padding: '5px', textAlign: 'left', fontSize: "13px" }}>
                            Please select your preferred locations
                        </Typography>
                    </Stack>
                </Stack>
                <Box className="form-container">

                    <Box className="multiple-choice-field">
                        {choices.map((choice) => (
                            <Box
                                key={choice.value}
                                className={`multiple-custom-button ${selectedOptions.includes(choice.value) ? 'selected' : ''}`}
                                onClick={() => onMultipleSelect(choice.value)}
                            >
                                <Box className="multiple-child-div">
                                    <div className="checkbox-child-1">
                                        <input
                                            type="checkbox"
                                            checked={selectedOptions.includes(choice.value)}
                                            className="custom-checkbox"
                                            readOnly
                                        />
                                    </div>
                                    <p className="checkbox-child-2">{choice.value}</p>
                                </Box>

                                {/* {selectedOptions.includes(choice.value) && (
                                    <div className="multiple-selected-div">
                                        <span className="tick-mark">&#10003;</span>
                                    </div>
                                )} */}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </div>

            {/* Net promoter score */}
            <div>
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
                                <img src={customerFace} style={{
                                    height: '35px', width: '35px',
                                    borderRadius: "50%",
                                    // boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)' 
                                }} alt="chatbot" />
                            )}

                    </Stack>
                    <Stack sx=
                        {{
                            backgroundColor: '#eaeeed', borderRadius: '24px', p: 0.5, borderBottomLeftRadius: "5px", outline: "1px solid transparent", boxShadow: isBms ? '0px 2px 3px 0px #0000001F' : '',
                        }}
                    >
                        <Typography component='p' sx={{ color: 'black', padding: '5px', textAlign: 'left', fontSize: "13px" }}>
                            Net promotor score
                        </Typography>
                    </Stack>
                </Stack>

                <Box className="nps-container">

                    <Box className="net-custom-button">
                        {scores.map((score) => (
                            <Box
                                key={score}
                                className={`net-child-div ${selectedScore === score ? 'net-selected-button' : ''}`}
                                onClick={() => onNetSelect(score)}
                            >
                                <Typography variant="body2" className="score-text">
                                    {score}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* <Box className="like-div">
                        <Typography className="like-text">Not Likely</Typography>
                        <Typography className="like-text">Extremely Likely</Typography>
                    </Box> */}
                </Box>
            </div>

            {/* Opinion scale */}
            <div>
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
                                <img src={customerFace} style={{
                                    height: '35px', width: '35px',
                                    borderRadius: "50%",
                                    // boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)' 
                                }} alt="chatbot" />
                            )}

                    </Stack>
                    <Stack sx=
                        {{
                            backgroundColor: '#eaeeed', borderRadius: '24px', p: 0.5, borderBottomLeftRadius: "5px", outline: "1px solid transparent", boxShadow: isBms ? '0px 2px 3px 0px #0000001F' : '',
                        }}
                    >
                        <Typography component='p' sx={{ color: 'black', padding: '5px', textAlign: 'left', fontSize: "13px" }}>
                            Select on opinion scale
                        </Typography>
                    </Stack>
                </Stack>

                <Box className="nps-container">

                    <Box className="net-custom-button">
                        {opinion.map((score) => (
                            <Box
                                key={score}
                                className={`net-child-div ${selectedOpinion === score ? 'net-selected-button' : ''}`}
                                onClick={() => onNetSelectOpinion(score)}
                            >
                                <Typography variant="body2" className="score-text">
                                    {score}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </div>

            {/* Weighted Multiple Choice */}
            <div>
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
                                <img src={customerFace} style={{
                                    height: '35px', width: '35px',
                                    borderRadius: "50%",
                                    // boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)' 
                                }} alt="chatbot" />
                            )}

                    </Stack>
                    <Stack sx=
                        {{
                            backgroundColor: '#eaeeed', borderRadius: '24px', p: 0.5, borderBottomLeftRadius: "5px", outline: "1px solid transparent", boxShadow: isBms ? '0px 2px 3px 0px #0000001F' : '',
                        }}
                    >
                        <Typography component='p' sx={{ color: 'black', padding: '5px', textAlign: 'left', fontSize: "13px" }}>
                            Please select your gender.
                        </Typography>
                    </Stack>
                </Stack>

                <Box className="weighted-form-container">
                    <Box className="weighted-multiple-choice-field">
                        {weightedChoices.map((choice) => (
                            <Box
                                key={choice.value}
                                className={`weighted-multiple-custom-button ${selectedWeightedOption === choice.value ? 'weighted-selected' : ''}`}
                                onClick={() => onWeightedSelect(choice.value)}
                            >
                                <Box className="weighted-multiple-child-div">
                                    <div className="weighted-radio-child-1">
                                        <input
                                            type="radio"
                                            checked={selectedWeightedOption === choice.value}
                                            className="custom-weighted-radio"
                                            readOnly
                                        />
                                    </div>
                                    <p className="weighted-radio-child-2">{choice.value}</p>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </div>

            {/* Rating */}
            <div>
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
                                <img src={customerFace} style={{
                                    height: '35px', width: '35px',
                                    borderRadius: "50%",
                                    // boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)' 
                                }} alt="chatbot" />
                            )}

                    </Stack>
                    <Stack sx=
                        {{
                            backgroundColor: '#eaeeed', borderRadius: '24px', p: 0.5, borderBottomLeftRadius: "5px", outline: "1px solid transparent", boxShadow: isBms ? '0px 2px 3px 0px #0000001F' : '',
                        }}
                    >
                        <Typography component='p' sx={{ color: 'black', padding: '5px', textAlign: 'left', fontSize: "13px" }}>
                            Please rate your experience with us
                        </Typography>
                    </Stack>
                </Stack>

                <Box className="rating-form-container">
                    <Rating
                        name="customized-stars"
                        value={rating}
                        onChange={handleRatingChange}
                        precision={1}
                        size="large"
                        className="custom-rating-stars"
                        max={5}
                    />
                </Box>
            </div>

            {/* Ranking */}
            <div>
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
                                <img src={customerFace} style={{
                                    height: '35px', width: '35px',
                                    borderRadius: "50%",
                                    // boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)' 
                                }} alt="chatbot" />
                            )}

                    </Stack>
                    <Stack sx=
                        {{
                            backgroundColor: '#eaeeed', borderRadius: '24px', p: 0.5, borderBottomLeftRadius: "5px", outline: "1px solid transparent", boxShadow: isBms ? '0px 2px 3px 0px #0000001F' : '',
                        }}
                    >
                        <Typography component='p' sx={{ color: 'black', padding: '5px', textAlign: 'left', fontSize: "13px" }}>
                            Please arrange the options
                        </Typography>
                    </Stack>
                </Stack>

                <Box className="ranking-form-container">

                    <ReactSortable
                        list={rankingItems}
                        setList={setRankingItems}
                        className="ranking-sortable-list"
                        animation={150}
                    >
                        {rankingItems.map((item) => (
                            <Box key={item.id} className="ranking-item">
                                <Box className="ranking-item-content">

                                    <Box className="ranking-item-index">
                                        {rankingItems.indexOf(item) + 1}
                                    </Box>

                                    <p className="ranking-item-text">{item.value}</p>

                                </Box>
                                {/* <IconButton className="drag-icon"> */}
                                <DragIndicatorIcon className="drag-icon" />
                                {/* </IconButton> */}
                            </Box>
                        ))}
                    </ReactSortable>
                </Box>
            </div>
        </>
    );
}

export default FormFields;
