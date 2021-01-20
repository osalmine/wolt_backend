import express, { Application, Request, Response } from 'express';
import { findRestaurants } from './findRestaurants';

const port = process.env.PORT || 4200;

const app: Application = express();

app.get('/discovery', (req: Request, res: Response) => {
	console.log(req.query);
	const lat = Number(req.query.lat);
	const lon = Number(req.query.lon);
	res.json(findRestaurants(lat, lon));
})

app.get('/', (req: Request, res: Response) => {
	res.send('Example request: /discovery?lat=60.1709&lon=24.941');
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
})