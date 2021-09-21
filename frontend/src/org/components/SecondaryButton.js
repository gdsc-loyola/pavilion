// import essential dependencies
import React from 'react'

// import stylesheets
import "../../../stylesheets/SecondaryButton.scss"

const SecondaryButton = ({button_copy}) => {
    return (
        <button className="secondary_button">{button_copy}</button>
    )
}

export default SecondaryButton;

