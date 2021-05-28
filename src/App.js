import React, { Component, useState } from "react";
import './App.css';
import "./styles.scss";

const calculatorRowsTable = ["*",7,8,9,"/",4,5,6,"+",1,2,3,"-",0,"."]


const Calculator = () => {
        const [ activeInput, setActiveInput ] = useState('');
        const [ storedInput, setStoredInput ] = useState('');
        const [ whichCalc, setWhichCalc ] = useState('');

        const Display = () => {
                return (
                    <div className="display--screen">
                            {!activeInput.length && !storedInput ? '0' : activeInput || storedInput }
                    </div>
                )
        };

        const NumberButton = ({ buttonValue }) => {
                return (
                    <button className="square--button number--button" type="button" onClick={() => handleActiveInput(buttonValue)}>{buttonValue}</button>
                )
        };

        const ClearButton = () => {
                return (
                    <button className="square--button func--button" type="button" onClick={() => handleClear()}>C</button>
                )
        };

        const UndoButton = () => {
                return (
                    <button className="square--button func--button" type="button" onClick={() => handleUndo()}>&#8592;</button>
                )
        };

        const NegativeButton = () => {
                return (
                    <button className="square--button func--button" type="button" onClick={() => handleToggleNegative()}>+/-</button>
                )
        };

        const MathButton = ({ buttonValue }) => {
                return (
                    <button className="square--button math--button" type="button" onClick={() => handleMathSet(buttonValue)}>{ buttonValue }</button>
                )
        };

        const CalcButton = () => {
                return (
                    <button className="calc--button" type="button" onClick={() => handleCalculate()}>=</button>
                )
        };

        const handleClear = () => {
                setActiveInput('');
                setStoredInput('');
                setWhichCalc('');
        };

        const handleActiveInput = (input) => {
                if(!activeInput.includes(".") || input !== ".") {
                        setActiveInput(`${(activeInput + input).replace(/^0+/, '')}`);
                }
        }

        const handleStoredInput = () => {
                setStoredInput(activeInput);
                setActiveInput('');
        };

        const handleUndo = () => {
                if(activeInput !== '') {
                        const undoInput = activeInput.slice(0, activeInput.length - 1);
                        setActiveInput(undoInput);
                }
        };

        const handleCalculate = () => {
                if(activeInput && storedInput) {
                        switch (whichCalc) {
                                case"+":
                                        setStoredInput(`${Math.round(`${(parseFloat(storedInput) + parseFloat(activeInput)) * 100}`) / 100}`);
                                        break;
                                case"-":
                                        setStoredInput(`${Math.round(`${(parseFloat(storedInput) - parseFloat(activeInput)) * 100}`) / 100}`);
                                        break;
                                case"*":
                                        setStoredInput(`${Math.round(`${(parseFloat(storedInput) * parseFloat(activeInput)) * 100}`) / 100}`);
                                        break;
                                case"/":
                                        setStoredInput(`${Math.round(`${(parseFloat(storedInput) / parseFloat(activeInput)) * 100}`) / 100}`);
                                        break;
                                default:
                                        break
                        }
                        setActiveInput('');
                }
        };

        const handleMathSet = (e) => {
                if(activeInput) {
                        setWhichCalc(e);
                        handleStoredInput();
                } if(storedInput) {
                        setWhichCalc(e);
                }

        };

        const handleToggleNegative = () => {
                if(activeInput) {
                        if(activeInput > 0) {
                                setActiveInput(`-${activeInput}`)
                        } else {
                                const plusInput = activeInput.slice(1);
                                setActiveInput(plusInput);
                        }
                } else if (storedInput > 0) {
                        setStoredInput(`-${storedInput}`);
                } else {
                        const plusStored = storedInput.slice(1);
                        setStoredInput(plusStored)
                }
        };
   
return(
        <div className="calculator--container">
            <Display />
            <ClearButton />
            <UndoButton />
            <NegativeButton />
            {calculatorRowsTable.map((element, index) => (
                    typeof(element) === 'string' ?  <MathButton key={index} buttonValue={element} /> :  <NumberButton key={index} buttonValue = { element } />
                ))
            }
            <CalcButton />
        </div>
    )
};

class App extends Component {
        render() {
                return (
                    <Calculator/>
                )
        }
}

export default App;