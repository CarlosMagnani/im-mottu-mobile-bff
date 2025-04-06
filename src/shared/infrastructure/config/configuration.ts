export default () => ({
    port: parseInt(process.env.NODE_PORT ?? '3000', 10),
    catApi: {
        apiKey: process.env.CAT_API_KEY ?? '',
    },
}); 
