import { useState } from "react";

import { hexToDec, decToBin, binToDec, decToHex, binToHex, hexToBin } from "../../functions/bindec";

function Calc () {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState('');

    const handleNumChange = (e) => {
        setNumber(e.target.value);
    }

    const options = ['Bin', 'Dec', 'Hex'];

    const [fromSystem, setFromSystem] = useState(0);
    const [toSystem, setToSystem] = useState(0);

    const handleOnChangeFor = (e) => {
        setFromSystem(e.target.value);
    }

    const handleOnChangeTo = (e) => {
        setToSystem(e.target.value);
    }

    const functionId = {
        '00': null, //binToBin
        '01': binToDec,
        '02': binToHex, //binToHex
        '10': decToBin,
        '11': null, //decToDec
        '12': decToHex,
        '20': hexToBin, //hextoBin
        '21': hexToDec, //hexToDec
        '22': null, //hexToHex
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fromSystem != toSystem) {
            const convertId = "" + fromSystem + toSystem;
            const convertFunction = functionId[convertId];
            setResult(convertFunction(number));
        } else {
            setResult(number);
        }
    }

    return (
        <>
            <form
            onSubmit={handleSubmit}>
                <label htmlFor="from">From</label>
                <select
                name='from'
                id='from'
                onChange={handleOnChangeFor}
                value={fromSystem}>
                    {options.map((option, i) => { 
                        return (
                            <option
                            value={i}
                            key={`f_${i}`}>
                                {option}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor="to">To</label>
                <select
                name='to'
                id='to'
                onChange={handleOnChangeTo}
                value={toSystem}>
                    {options.map((option, i) => { 
                        return (
                            <option
                            value={i}
                            key={`t_${i}`}>
                                {option}
                            </option>
                        )
                    })}
                </select>
                <input 
                type='text'
                id='num'
                name='num'
                required
                minLength='1'
                maxLength='100'
                value={number}
                onChange={handleNumChange}/>
                <button
                type='submit'>
                    Convert
                </button>
            </form>
            <div>
                <p>
                    {result}
                </p>
            </div>
        </>
    )
};

export default Calc;