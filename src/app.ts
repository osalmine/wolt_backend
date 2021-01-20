import express, { Application, Request, Response } from 'express';
import { findRestaurants } from './findRestaurants';

const app: Application = express();

app.get('/distance', (req: Request, res: Response) => {
	console.log(req.query);
	const lat = Number(req.query.lat);
	const lon = Number(req.query.lon);
	res.json(findRestaurants(lat, lon));
})

app.get('/', (req: Request, res: Response) => {
	res.send('Hello');
});

app.listen(5000, () => {
	console.log('Server running');
})