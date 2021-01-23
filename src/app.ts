import express, { Application, Request, Response } from 'express';
import { findRestaurants } from './findRestaurants';

const port = process.env.PORT || 4200;

const app: Application = express();

app.get('/discovery', (req: Request, res: Response) => {
	const latitude = Number(req.query.lat);
	const longitude = Number(req.query.lon);
	res.status(200).json(findRestaurants(latitude, longitude));
});

app.get('/', (req: Request, res: Response) => {
	res.send('Example request: /discovery?lat=60.1709&lon=24.941');
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

export default app;