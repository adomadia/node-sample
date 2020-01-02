import express from 'express';
const routers = express.Router();

routers.get('/dfsummary', (request, response) => {
    response.send('multi df-summary page.');
});

export default routers;
