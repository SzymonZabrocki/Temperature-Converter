import './App.css';
import React, { useState, useEffect } from 'react'
import Button from './Components/Buttons/Button/Button';
import ButtonsGroup from './Components/Buttons/ButtonsGroup';
import History from './Components/History/History.js';
import axios from 'axios'

function App() {

  const [initialValue, setInitial] = useState('')
  const [calcValue, setCalcValue] = useState('')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [result, setResult] = useState('')
  const [visible, setVisible] = useState(false)
  const [history] = useState([])

  const convert = (event) => {
    event.preventDefault(); //stops page refresh after form submittion
    if (!checkInput()) { //form validation
      return
    }
    switch (fromUnit) { 
      case 'celsius': { //convert from celsius
        if (toUnit === 'celsius') { //from celsius to celsius
          setCalcValue(+initialValue);
        } else if (toUnit === 'kelvin') { //from celsius to kelvin
          setCalcValue(+initialValue + 273.15)
        } else if (toUnit === 'fahrenheit') { //from celsius to fahrenheit
          setCalcValue((+initialValue * 1.8) + 32)
        }
        break
      }
      case 'kelvin': { //conver from kelvin
        if (toUnit === 'kelvin') {  //from kelvin to kelvin
          setCalcValue(+initialValue)
        } else if (toUnit === 'celsius') { //from kelvin to celsius
          setCalcValue(+initialValue - 273.15)
        } else if (toUnit === 'fahrenheit') { //from kelvin to fahrenheit
          setCalcValue((+initialValue - 273.15) * 1.8 + 32) 
        }
        break
      }
      case 'fahrenheit': { //convert from fahrenheit
        if (toUnit === 'fahrenheit') { //from fahrenheit to fahrenheit
          setCalcValue(+initialValue)
        } else if (toUnit === 'celsius') { //from fahrenheit to celsius
          setCalcValue((+initialValue - 32) * 5 / 9)
        } else if (toUnit === 'kelvin') { //from fahrenheit to kelvin
          setCalcValue((+initialValue + 459.67) * 5 / 9)
        }
        break
      }
      default: {
        break
      }
    }
  }

  const checkInput = () => {
    if (!initialValue) { //check if input is not empty 
      alert('You need to input initial value')
      return false
    } else if (isNaN(initialValue)) { //check if imput is not a number
      alert('Input value must be a number')
      return false
    } else if (!fromUnit && !toUnit) { //check if both units are selected
      alert('You need to select both units')
      return false
    } else if (!fromUnit && toUnit) { //check if input units are selecred
      alert('You need to select input unit')
      return false
    } else if (fromUnit && !toUnit) { //check if output units are selected
      alert('You need to select output unit')
      return false
    } else {
      return true //return true if all data is correct
    }
  }

  const saveData = () => {
    const conversionData = { //creating an object to upload to firebase database
      initVal: initialValue,
      calVal: calcValue,
      fromUnit: fromUnit,
      toUnit: toUnit
    }
    if (initialValue && calcValue && fromUnit && toUnit && !null) { //check to stop posting empty or incomplete object to database
      history.push(initialValue + ' ' + fromUnit + ' = ' + calcValue.toFixed(2) + ' ' + toUnit) //saving conversion result into array
      display()

      axios.post('https://reacttemperaturecalculator-default-rtdb.europe-west1.firebasedatabase.app/conversionHistory.json', conversionData) //posting conversion result object to database
        .then(response => {
          console.log(response);
        })
    }
  }

  useEffect(() => {
    saveData(); // update object and histry when the state changes
  }, [calcValue]);

  const display = () => {
    setResult(initialValue + ' ' + fromUnit + ' = ' + calcValue.toFixed(2) + ' ' + toUnit) //set result 
  }

  const handleSetInitial = (e) => {
    setInitial(e.target.value) //set initial value state
  }

  const handleSetFromUnit = (e) => {
    setFromUnit(e.target.value) //set state of initial value unit
  }

  const handleSetToUnit = (e) => {
    setToUnit(e.target.value) //set state of converted value unit
  }

  return (
    <div className="App">
       <form onSubmit={convert}>  {/* call convert function of form submition  */}
        <div className='container mt-4'>
          <div className='row justify-content-center'>
            <div className='col-xl-6'>
              <div className='card '>
                <div className='card-header'>
                  <label>Temperature from {fromUnit} to {toUnit}</label>  
                </div>
                <div className='card-body'>
                  <div>
                    <div>
                      <input className='form-control text-center' type="text" value={initialValue} onChange={handleSetInitial} />  {/* user value input  */}
                    </div>
                    <ButtonsGroup onSelect={fromUnit} selectedHandler={handleSetFromUnit}></ButtonsGroup> {/* component with button group  */}
                  </div>
                  <div>
                    <div>
                      <input className='form-control text-center' value={result} readOnly />
                    </div>
                    <ButtonsGroup onSelect={toUnit} selectedHandler={handleSetToUnit}></ButtonsGroup>  {/* component with button group  */}
                  </div>
                </div>
                <div className='card-footer'>
                  <div className='row'>
                    <div className='col'>
                      <Button styling={'btn btn-success'} type="submit" onSelect={''} name="Convert"></Button>  {/* submittion button  */}
                    </div>
                    <div className='col'>
                      <Button styling={'btn btn-warning'} type="button" onSelect={''} name="Show History" onBtnClicked={() => setVisible(!visible)}></Button>  {/* show History button  */}
                    </div>
                  </div>
                </div>
              </div>
              <div className='my-2'>
                <History isVisible={visible} history={history} /> {/* history component */}
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default App;
