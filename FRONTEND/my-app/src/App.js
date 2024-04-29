import React from 'react'
import {useState} from "react"
import "./App.css"

const App = () => {

    const [principal,setPrincipal] = useState("")
    const [interest,setInterest] = useState("")
    const [time,setTime] = useState("")
    const [simpleInterest, setSimpleInterest] = useState("")
    const [showResult,setShowResult] = useState(false)
    const [errorMesg,showErrorMesg] = useState(false)
    const [errorText,setErrorText] = useState("")
    

    const handlePrincipal = (event) => {
      setPrincipal(event.target.value)
      setShowResult(false)
      showErrorMesg(false)
    }

    const handleInterest = (event) => {
      setInterest(event.target.value)
      setShowResult(false)
      showErrorMesg(false)
    }

    const handleTime = (event) => {
      setTime(event.target.value)
      setShowResult(false)
      showErrorMesg(false)
    }


    const dpApiCall = async () => {
      const url = "http://localhost:3001/api/interest-calculation"
      const data = {
        principal,
        interest,
        time
      }
      const options = {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      }

      const response = await fetch(url,options)
      const result = await response.json()
      
      if (response.ok === true){
        const {simpleInterest} = result
        setSimpleInterest(simpleInterest)
        setShowResult(true)
        
      }
      else {
        const {errorMsg} = result
        showErrorMesg(true)
        setErrorText(errorMsg)
      }
   
    } 

    const handleSubmit = (event) => {
      event.preventDefault()
      dpApiCall()
    }

    const handleClearData = () => {
      
    setPrincipal("")
    setInterest("")
    setTime("")
    setShowResult(false)
    showErrorMesg(false)
    setErrorText("")
    }

  return (
    <div className="container">

      <div className="inner-container">
        <h2 className="heading">SIMPLE INTEREST CALCULATOR</h2>

      <form className="form-container" >
        <div className="form-group">
        <label className="label-element"  htmlFor="principal">Principal Amount:</label>
        <br/>
        <input value={principal} onChange={handlePrincipal} className="input-element" type="number" id="principal" />
        </div>
        <div className="form-group">
        <label  className="label-element" htmlFor="interest">Interest Rate (%):</label>
        <br/>
        <input value={interest} onChange={handleInterest} className="input-element" type="number" id="interest" />
        </div>
        <div className="form-group">
          
        <label  className="label-element" htmlFor="time">Time Period in Years:</label>
        <br/>
        <input value={time} onChange={handleTime} className="input-element" type="number" id="time" />
        </div>
        

        <div className="button-container">
        <button onClick={handleSubmit}  className="button-element" type="submit">Result</button>
        <button onClick={handleClearData}  className="button-element" type="submit">Clear Data</button>
        </div>
    </form>

    { showResult ?  <h2 className="heading">Simple Interest for a Principal Amount {principal} after {time} years with an interest of {interest}% is {simpleInterest}.</h2>:
        (<div></div>)
      }
      {errorMesg ? <h2 className="heading">{errorText}</h2> : <></>}
      </div>



    </div>
  )
}

export default App