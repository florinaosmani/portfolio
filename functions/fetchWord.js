import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MY_KEY);
export const handler = async (event, context)  => {

    console.log(process.env.MY_KEY);
    
    try {
        const apiKey = process.env.MY_KEY;
        const url = 'https://api.api-ninjas.com/v1/randomword';
        const type = 'noun';
        
        const response = await fetch(url, {
            headers: {
            'X-Api-Key': apiKey
        }});

        if (response.ok) {
            const jsonResponse = await response.json();
            return {
                statusCode: 200,
                body: JSON.stringify({
                    data: jsonResponse
                })
            };
        }

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to fetch data!'
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Something went wrong!',
                error: error.message
            })
        };
    }
}

handler();