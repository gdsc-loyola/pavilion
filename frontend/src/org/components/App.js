import React, {useState, useEffect} from 'react';
// import { render } from 'react-dom';
import privateRoutes from './Router';
import { BrowserRouter, Switch } from 'react-router-dom';
import Cotter from 'cotter'

const App = () => {  
  const [isAuth, setIsAuth] = useState(false)
  const [payload, setpayload] = useState(null)
  // user = payload.user.identifier

  const toggleAuth = (toggle) => {
    if (toggle != null) {
      return true
    }
  }

  useEffect(() => {
      var cotter = new Cotter("aa2398ab-3950-42dd-b3d1-4e383734a5ac"); // 👈 Specify your API KEY ID here
      cotter
        .withFormID("form_default") // Use customization for form "form_default"
        .signInWithLink() // use .signInWithOTP() to send an OTP
        .showEmailForm()  // use .showPhoneForm() to send magic link to a phone number
        .then(res => {
          setpayload(res); // show the response in our state
          return setIsAuth(toggleAuth(payload))
        })
        .catch(err => console.log(err));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          {privateRoutes(isAuth)}
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;