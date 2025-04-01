export const handler = async (event, context)  => {
    try {
        const apiKey = process.env.MY_KEY;
        const { type } = event.queryStringParameters;
        const url = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=${type}&api_key=${apiKey}`;
        
        const response = await fetch(url);

        if (response.ok) {
            const jsonResponse = await response.json();
            return {
                statusCode: 200,
                body: JSON.stringify({
                    data: jsonResponse
                })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Failed to fetch data!'
                })
            };
        } 

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Something went wrong in the netlify function',
                error: error.message
            })
        };
    }
}