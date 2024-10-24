import React, { useState } from "react";
import "./FormFields.css";
import {
  Box,
  Typography,
  Rating,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import customerFace from "../chatbot_face.png";
import bmsChildLogo from "../bms-logo/bmslatestchild.png";
import { ReactSortable } from "react-sortablejs";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import "./Chatbot.css";

const weightedChoices: any = [
  { character: "A", value: "Option 1" },
  { character: "B", value: "Option 2" },
  { character: "C", value: "Option 3" },
  { character: "D", value: "Option 4" },
];

const choices: any = [
  { character: "A", value: "Option 1" },
  { character: "B", value: "Option 2" },
  { character: "C", value: "Option 3" },
  { character: "D", value: "Option 4" },
];

interface FormFieldsProps {
  msgObj: any;
  onRatingChange: (newRating: number | null, msgObj: any) => void; // Update to accept both rating and msgObj
  rankOptions: any[];
  onRankingChange: (updatedRanking: any[]) => void;
  isBms: any;
  netprometerOptions: any[];
  opinionOptions: any[];
  onNetprometerUpdate: (score: any) => void;
  onOpinionScaleUpdate: (score: any) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({
  msgObj,
  onRatingChange,
  rankOptions,
  onRankingChange,
  isBms,
  netprometerOptions,
  opinionOptions,
  onNetprometerUpdate,
  onOpinionScaleUpdate,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [rankingItems, setRankingItems] = useState<any[]>(rankOptions);
  const [isRankSubmit, setIsRankSubmit] = useState<any>(false);

  const onMultipleSelect = (value: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((option) => option !== value)
        : [...prevSelected, value]
    );
  };

  //console.log('Form-msgObj',msgObj)

  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const onNetSelect = (score: number) => {
    setSelectedScore(score);
    onNetprometerUpdate(score);
  };

  const [selectedOpinion, setSelectedOpinion] = useState<number | null>(null);

  const onNetSelectOpinion = (score: number) => {
    setSelectedOpinion(score);
    onOpinionScaleUpdate(score);
  };

  const [selectedWeightedOption, setSelectedWeightedOption] = useState<
    string | null
  >(null);

  const onWeightedSelect = (value: string) => {
    setSelectedWeightedOption(value);
  };

  const [rating, setRating] = useState<number | null>(null);

  const handleRatingChange = (
    event: React.SyntheticEvent,
    newValue: number | null,
    msgObj: any
  ) => {
    setRating(newValue);
    onRatingChange(newValue, msgObj); // Pass both the rating and msgObj to the parent
  };

  const handleRankingChange = (newList: any) => {
    // Map the new list to update the ranks based on the new order
    const updatedWithRanks = newList.map((item: any, index: any) => ({
      ...item,
      rank: index + 1, // Update rank based on new position
    }));

    setRankingItems(updatedWithRanks); // Update local state
    console.log("Updated list after drag ends:", updatedWithRanks);
  };

  // Function to send updated rankings to parent only when submit is clicked
  const handleSubmit = () => {
    onRankingChange(rankingItems); // Send updated ranks to parent on submit
    setIsRankSubmit(true);
  };

  return (
    <div>
      {/* Net promoter score */}
      {msgObj.custom.ui_component === "netprometer" && (
        <div style={{ display: selectedScore ? "none" : "block" }}>
          <Box className="nps-container">
            <Box className="net-custom-button">
              {netprometerOptions.map((score) => (
                <Box
                  key={score}
                  className={`net-child-div ${
                    selectedScore === score ? "net-selected-button" : ""
                  }`}
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
      )}

      {/* Opinion scale */}
      {msgObj.custom.ui_component === "opinionscale" && (
        <div style={{ display: selectedOpinion ? "none" : "block" }}>
          <Box className="nps-container">
            <Box className="net-custom-button">
              {opinionOptions.map((score) => (
                <Box
                  key={score}
                  className={`net-child-div ${
                    selectedOpinion === score ? "net-selected-button" : ""
                  }`}
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
      )}

      {/* Weighted Multiple Choice */}
      <div style={{ display: "none" }}>
        <Box className="weighted-form-container">
          <Box className="weighted-multiple-choice-field">
            {weightedChoices.map((choice: any) => (
              <Box
                key={choice.value}
                className={`weighted-multiple-custom-button ${
                  selectedWeightedOption === choice.value
                    ? "weighted-selected"
                    : ""
                }`}
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
      {msgObj.custom.ui_component === "rating" && (
        <div style={{ display: rating ? "none" : "block" }}>
          <Box className="rating-form-container">
            <Rating
              name="customized-stars"
              value={rating}
              onChange={(event, newValue) =>
                handleRatingChange(event, newValue, msgObj)
              } // Pass event, rating, and msgObj
              precision={1}
              size="large"
              className="custom-rating-stars"
              max={5}
            />
          </Box>
        </div>
      )}

      {/* Ranking */}
      {msgObj.custom.ui_component === "ranking" && (
        <div style={{ display: isRankSubmit ? "none" : "block" }}>
          {/* <Stack direction='row' spacing={0.5} p={0.5} mr={5}>

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
                </Stack> */}

          <Box className="ranking-form-container">
            <ReactSortable
              list={rankingItems}
              setList={handleRankingChange}
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

            <Button
              variant="contained"
              disableRipple
              className={
                isBms
                  ? "isBms-seek-submit-btn seek-btns"
                  : "seek-submit-btn seek-btns"
              }
              style={{
                boxShadow: "none",
                marginTop: "10px",
                marginLeft: "10px",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </div>
      )}

      {/* <div>
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
            </div> */}

      {/* Multiple Choice Field */}
      {/* <div>
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

                            </Box>
                        ))}
                    </Box>
                </Box>
            </div> */}
    </div>
  );
};

export default FormFields;
