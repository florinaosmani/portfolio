function binToDec(binNum) {
    const binArr = binNum.split('');

    let dec = 0;

    binArr.forEach((char, i) => {
        const power = binArr.length - 1 - i;
        dec += Number(char)*(2**power);
    })

    return dec;
};


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

};


const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

function decToHex (decNum) {
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
};


function hexToDec (hexNum) {
    
    const hexArr = hexNum.toUpperCase().split('');
    
    let dec = 0;

    hexArr.forEach((char, i) => {
        const hexId = hexChars.indexOf(char);
        console.log(hexId);
        const power = hexArr.length - 1 - i;
        dec += Number(hexId)*(16**power);
    })

    return dec;
};

function octToDec(octNum) {
    const octArr = octNum.split('');

    let dec = 0;

    octArr.forEach((char, i) => {
        const power = octArr.length - 1 - i;
        dec += Number(char)*(8**power);
    })

    return dec;
};

function decToOct (decNum) {
    let num = decNum;
    let octArr = [];

    while (num != 0) {
        octArr.push((num % 8).toString());
        num = Math.floor(num/8);
    }
    
    const octArrReversed = octArr.reverse();
    const octString = octArrReversed.join('');

    return octString;
};

function binToHex (binNum) {
    return decToHex(binToDec(binNum));
};

function hexToBin (hexNum) {
    return decToBin(hexToDec(hexNum));
};

function binToOct (binNum) {
    return decToOct(binToDec(binNum));
};

function hexToOct (hexNum) {
    return decToOct(hexToDec(hexNum));
};

function octToBin (octNum) {
    return decToBin(octToDec(octNum));
};

function octToHex (octNum) {
    return decToHex(octToDec(octNum))
};

export { hexToOct, binToOct, binToDec, decToBin, decToHex, hexToDec, octToDec, decToOct, binToHex, hexToBin, octToBin, octToHex };