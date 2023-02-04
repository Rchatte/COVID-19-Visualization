import React, { useEffect, useState } from "react";


export default function DisplayVisual(props) {


    const [currentData, setCurrentData ] = useState();



    // Get current data stored in key value "data"
    // Set object to variable currentData.
    const getLocalStorage = () => {
        if (window) {
            try {
                const currentObject = window.sessionStorage.getItem("data");
                setCurrentData(JSON.parse(currentObject));
            }catch (error) {
                console.log(error)
            }

            
        }
    }

    // At render get the current information in browser data
    useEffect(() => {
        getLocalStorage();
    }, [])

    return(
        <>
            
            { currentData && console.log(currentData)}
        </>
    )

}