import React from 'react' 
import "../../../stylesheets/org/SelfSignUp.scss"
{/* 3 dots or progress bar*/}
const Progress = ({progress_state}) => {
    {/* HOW TO USE: add button_state when using the component
        ex: <Progress button_state="one" />
        This adds a class to the component that corresponds to their progress (seen in SelfSignUp.scss under .progress).
        The choices are: "one", two", and "three" tpo indicate which stage they are in filling out the form. */}
    return (
        <div className={`progress ${progress_state}`}>  
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Progress;