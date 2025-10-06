function binToDec(binNum) {
    const binArr = binNum.split('');

    let dec = 0;

    binArr.forEach((char, i) => {
        const power = binArr.length - 1 - i;
        dec += Number(char)*(2**power);
        
    })

    return dec;
}

function decToBin (decNum) {
    /* 64/2 = 32 div 0 mod, 32/2 = 16 div 0 mod 16/2= 8 div 0 mod 8/2=4 div 0 mod 4/2=2 div 0 mod 2/2=1 div mod 0 1/2= 0 mod 1 _>
    1 0 0 0 0 0 0 */
    let num = decNum;
    let binArr = [];

    while (num != 0) {
        binArr.push((num % 2).toString());
        num = Math.floor(num/2);
    }
    
    const binArrReversed = binArr.reverse();
    const binString = binArrReversed.join('');

    return binString;

}

function decToHex (decNum) {
    const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

    let num = decNum;
    let hexArr = [];

    while (num != 0) {
        hexArr.push((num % 16).toString());
        num = Math.floor(num/16);
    }

    const hexArrReversed = hexArr.reverse();
    
    const hexInHex = hexArrReversed.map((char,i) => {
        return hexChars[char];
    })

    return hexInHex.join('');
}


function hexToDec (hexNum) {

}

export { binToDec, decToBin, decToHex, hexToDec };