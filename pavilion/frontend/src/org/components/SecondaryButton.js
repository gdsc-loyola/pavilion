// import essential dependencies
import React from 'react'

// import stylesheets
import "../../stylesheets/org/SecondaryButton.scss"

const SecondaryButton = ({button_copy}) => {
    return (
        <a href="#"><button className="secondary_button">{button_copy}</button></a>
    )
}

export default SecondaryButton;

