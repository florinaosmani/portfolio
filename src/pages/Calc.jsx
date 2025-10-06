import { useState } from "react";

import { hexToDec, decToBin, binToDec, decToHex } from "../../functions/bindec";

function Calc () {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState('');

    const handleNumChange = (e) => {
        setNumber(prev => e.target.value);
        console.log('handlenum')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setResult(decToHex(number));
        console.log('handlesubmit')
    }

    return (
        <>
            <form
            onSubmit={handleSubmit}>
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