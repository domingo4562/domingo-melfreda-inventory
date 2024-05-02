import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('The server is running on...');
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});
