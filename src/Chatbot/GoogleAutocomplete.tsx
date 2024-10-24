import React, { useState } from "react";
import AutoComplete from 'react-google-autocomplete';
import TelegramIcon from '@mui/icons-material/Telegram';
import { InputAdornment, TextField } from "@mui/material";

interface GoogleAutocompleteProps {
    onPlaceSelected: (place: any) => void;
    onInputClear: () => void;  // Add new prop to handle input clear
    value: any;
}

const GoogleAutocomplete: React.FC<GoogleAutocompleteProps> = ({ onPlaceSelected, onInputClear, value }) => {
    // console.log('bbb', value)
    const apikey: string =
        window.location.hostname === "localhost"
            ? "AIzaSyBPvFpashJv6w5SFk_7HVO3Y_STF3NN3BQ"
            : "AIzaSyDU2gtuDLdiMfEFTygfm-vCEO7UwH-AbBM";

    const [selectedPlace, setSelectedPlace] = useState<any>(null);

    const handlePlaceSelected = (place: any) => {
        const addressComponents = place?.address_components || [];

        let state = '';
        let city = '';
        let zipcode = '';

        addressComponents.forEach((component: any) => {
            if (component.types.includes('administrative_area_level_1')) {
                state = component.long_name;
            }
            if (component.types.includes('locality')) {
                city = component.long_name;
            }
            if (component.types.includes('postal_code')) {
                zipcode = component.long_name;
            }
        });

        const location = {
            text: place?.formatted_address,
            state,
            city,
            zipcode
        };

        setSelectedPlace(location);
    };

    const handleInputChange = (event: any) => {
        if (event.target.value === "") {
            // Call the onInputClear function if the input is cleared
            onInputClear();
            setSelectedPlace(null)
        }
    };


    const handleSubmitAddress = () => {
        if (selectedPlace) {
            onPlaceSelected(selectedPlace);  // Send the selected place to the parent
        }
    };

    return (
        <>
            <AutoComplete
                apiKey={apikey}
                defaultValue={value}
                style={{
                    width: "90%",
                    padding: "8px 14px",
                    borderRadius: "25px",
                    borderColor: "rgb(187, 186, 184)",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    boxShadow: "0px 0px",
                    outline: "none", // Remove focus outline
                    // Use a different border color when focused (optional)
                    ':focus': {
                        borderColor: "rgb(187, 186, 184)", // Keep the same or change as needed
                    },
                }}
                onPlaceSelected={handlePlaceSelected}
                onChange={handleInputChange}  // Handle input changes (including clearing)
                className="address-auto"

                options={{
                    types: ["geocode", "establishment"],
                    componentRestrictions: { country: "us" },
                }}
            />

            <div style={{
                position: "absolute",
                right: "15px", // Adjust as needed
                top: "50%",
                transform: "translateY(-50%)", // Center the icon vertically
                cursor: 'pointer'
            }}
                onClick={handleSubmitAddress}>
                <TelegramIcon sx={{cursor: 'pointer', color: '#919191',marginTop:'4px'}}/>
            </div>
        </>
    );
}

export default GoogleAutocomplete;
