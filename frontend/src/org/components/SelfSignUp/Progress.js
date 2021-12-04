import React, { useLayoutEffect, useEffect, useState } from 'react';
import '../../../../stylesheets/org/SelfSignUp.scss';
{
  /* 3 dots or progress bar*/
}
{
  /* HOW TO USE: add button_state when using the component
    ex: <Progress button_state="one" />
    This adds a class to the component that corresponds to their progress (seen in SelfSignUp.scss under .progress).
    The choices are: "one", two", and "three" tpo indicate which stage they are in filling out the form. */
}
const Progress = ({ progress_state }) => {
  const [stateOne, setStateOne] = useState(false);
  const [stateTwo, setStateTwo] = useState(false);
  const [stateThree, setStateThree] = useState(false);

  //Possible states and parsing incoming info
  function progression() {
    if (progress_state == 'one') {
      setStateOne(true);
      console.log('One');
      // used for debugging and checking that conditions were working
    } else if (progress_state == 'two') {
      setStateTwo(true);
    } else if (progress_sstate == 'three') {
      setStateThree(true);
    }
  }

  // componentDidMount (progression)  {
  //     progression
  // }

  return (
    // This adds the class corresponding to the progression_state
    <div
      className={`progress ${stateOne ? 'one' : ''} ${stateTwo ? 'two' : ''} ${
        stateThree ? 'three' : ''
      }`}
    >
      <div id="one"></div>
      <div id="two"></div>
      <div id="three"></div>
    </div>
  );
};

export default Progress;
