// import essential dependencies
import React from 'react'

// import stylesheets
import "../../../stylesheets/org/PrimaryButton.scss"

const PrimaryButton = ({button_copy}) => {
    return (
        <button className="primary_button">{button_copy}</button>
    )
}

export default PrimaryButton;

