exports.handler = async (event, context)  => {
    try {
        const apiKey = process.env.MY_KEY;
        const url = 'https://api.api-ninjas.com/v1/randomword';
        const type = 'noun';
        console.log(apiKey);
        const response = await fetch(url, headers = {
            'X-Api-Key': apiKey
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        }

        throw new Error ('Request failed!');

    } catch (error) {
        return error;
    }
}
