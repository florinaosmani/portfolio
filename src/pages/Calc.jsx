import { useState } from "react";
import classes from '../resources/css/pages/calc.module.css';

import { binToOct, hexToDec, decToBin, binToDec, decToHex, binToHex, hexToBin, octToDec, decToOct, hexToOct, octToBin, octToHex } from "../utility/bindec";

function Calc () {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState(false);

    const handleNumChange = (e) => {
        if (error) {
            setError(false);
        }
        setResult('');
        setNumber(e.target.value);
    }

    const options = ['Bin', 'Dec', 'Hex', 'Oct'];

    const [fromSystem, setFromSystem] = useState(0);
    const [toSystem, setToSystem] = useState(0);

    const handleOnChangeFor = (e) => {
        if (error) {
            setError(false);
        }
        setResult('');
        setFromSystem(e.target.value);
    }

    const handleOnChangeTo = (e) => {
        if (error) {
            setError(false);
        }
        setResult('');
        setToSystem(e.target.value);
    }

    const functionId = {
        '00': null, //binToBin
        '01': binToDec,
        '02': binToHex,
        '03': binToOct,
        '10': decToBin,
        '11': null, //decToDec
        '12': decToHex,
        '13': decToOct, 
        '20': hexToBin,
        '21': hexToDec,
        '22': null, //hexToHex
        '23': hexToOct,
        '30': octToBin,
        '31': octToDec,
        '32': octToHex, //octToHex
        '33': null, //octToOct
    }

    const regExpBin = /^[0-1]+$/g;
    const regExpOct = /^[0-7]+$/g;
    const regExpDex = /^[0-9]+$/g;
    const regExpHex = /^[a-fA-F0-9]+$/g;

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((fromSystem == 0 && number.match(regExpBin))
        || fromSystem == 1 && number.match(regExpDex)
        || fromSystem == 2 && number.match(regExpHex)
        || fromSystem == 3 && number.match(regExpOct)) {
            if (fromSystem != toSystem) {
                const convertId = "" + fromSystem + toSystem;
                const convertFunction = functionId[convertId];
                setResult(convertFunction(number));
            } else {
                setResult(number);
            }
        } else {
            setError(true);
        }
        
    }
/* !!!!!!!!!CHANGE FONT WE ARE NOT BEING LEGAL WITH DATA STUFF
USING GOOGLE FONT GIVE IP ADRESS TO GOOGLE THOSE FUCKERSSSSS */
    return (
        <>
            <form
            className={classes.form}
            onSubmit={handleSubmit}>
                <div className={classes.options}>
                    <legend>From:</legend>
                    {options.map((option, i) => {
                        return (
                            <div
                            key={`fromKey_${i}`}>
                                <input
                                type='radio'
                                id={`from_${i}`}
                                name='from'
                                value={`${i}`}
                                onChange={handleOnChangeFor}
                                checked={fromSystem == i}/>
                                <label
                                htmlFor={`from_${i}`}>
                                    {option}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div className={classes.options}>
                    <legend>To:</legend>
                    {options.map((option, i) => {
                        return (
                            <div
                            key={`toKey_${i}`}>
                                <input
                                type='radio'
                                id={`to_${i}`}
                                name='to'
                                value={`${i}`}
                                onChange={handleOnChangeTo}
                                checked={toSystem == i}/>
                                <label
                                htmlFor={`to_${i}`}>
                                    {option}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div className={classes.num}>
                    <div>
                        <label htmlFor="num">Number:</label>
                        <input 
                        type='text'
                        id='num'
                        name='num'
                        required
                        minLength='1'
                        maxLength='100'
                        value={number}
                        onChange={handleNumChange}/>
                    </div>
                    <button
                    type='submit'>
                        Convert
                    </button>
                </div>
            </form>
            <p className={classes.result}>
                {error ? `That's not a valid number` : result}
            </p>
        </>
    )
};

export default Calc;