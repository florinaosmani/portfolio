export const handler = async (event, context) => {
    const { id } = event.queryStringParameters;
    const url = `https://www.gutenberg.org/ebooks/${id}.html.images`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const text = await response.text();
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "https://gutenberg",
                    "Content-Type": "text/html"
                },
                body: text
            };
        }
        return {
            statusCode: 500,
            body: "Not working"
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: "Not working"
        };
    }
};