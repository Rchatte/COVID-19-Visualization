import React, { useEffect } from 'react'

const GeneralVisualTemplate = (props) => {


    useEffect(() => {

    }, [props.filters]);

    console.log(props.filters);
    return (
        <div>
            Graph goes here
        </div>
    )
}

export default GeneralVisualTemplate
