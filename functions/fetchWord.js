export const handler = async (event, context)  => {
    try {
        const apiKey = process.env.MY_KEY;
        const { type } = event.queryStringParameters;
        const url = `https://api.api-ninjas.com/v1/randomword?type=${type}`;
        
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