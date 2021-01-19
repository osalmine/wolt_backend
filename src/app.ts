import express, { Application, Request, Response, NextFunction, query } from 'express';
import restaurantsJson from './restaurants.json'
import { distance } from './calcDist'

const app: Application = express();

interface Restaurant {
	blurhash: string;
	launch_date: string;
	location: number[];
	name: string;
	online: boolean;
	popularity: number;
	distanceFromCurrentLocation?: number;
}

interface Section {
	title: string
	restaurants: Restaurant[];
}

interface Sections {
	sections: Section[]
}

const restaurantsInRange: Restaurant[] = [];

function getNearbyRestaurants(lat: number, lon: number): Sections {
	restaurantsJson.restaurants.forEach(restaurant => {
		const distanceBetweenPoints: number = distance(restaurant.location[1], restaurant.location[0], lat, lon);
		if (distanceBetweenPoints.toFixed(1) <= "1.5") {
			console.log(restaurant);
			console.log(distanceBetweenPoints);
			restaurantsInRange.push(restaurant);
			// console.log(restaurantsInRange.length);
			restaurantsInRange[restaurantsInRange.length - 1].distanceFromCurrentLocation = distanceBetweenPoints;
		}
	});

	const popularRestaurantsInRange: Restaurant[] = [...restaurantsInRange]
		.sort((a, b): number => {
			if (a.online == false && b.online == true) {
				return 1;
			} else if (b.online == false && a.online == true) {
				return -1;
			}

			if (a.popularity < b.popularity) {
				return 1;
			} else if (a.popularity > b.popularity) {
				return -1;
			}
			return 0;
		});

	const newestRestaurantsInRange: Restaurant[] = [...restaurantsInRange]
		.filter((el) => {
			let fourMonthsAgo = new Date();
			fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
			let launchDate = new Date(el.launch_date);
			return (fourMonthsAgo.toLocaleDateString() < launchDate.toLocaleDateString());
		})
		.sort((a, b): number => {
			if (a.online == false && b.online == true) {
				return 1;
			} else if (b.online == false && a.online == true) {
				return -1;
			}

			if (a.launch_date < b.launch_date) {
				return 1;
			} else if (a.launch_date > b.launch_date) {
				return -1;
			}
			return 0;
		});

	const nearbyRestaurantsInRange: Restaurant[] = [...restaurantsInRange].sort((a, b): number => {
		if (a.distanceFromCurrentLocation && b.distanceFromCurrentLocation) {
			if (a.online == false && b.online == true) {
				return 1;
			} else if (b.online == false && a.online == true) {
				return -1;
			}

			if (a.distanceFromCurrentLocation < b.distanceFromCurrentLocation) {
				return 1;
			} else if (a.distanceFromCurrentLocation > b.distanceFromCurrentLocation) {
				return -1;
			}
		}
		return 0;
	});
	
	const top10Nearby = nearbyRestaurantsInRange.slice(0, 10);
	top10Nearby.forEach(el => {
		delete el.distanceFromCurrentLocation;
	});
	const top10Newest = newestRestaurantsInRange.slice(0, 10);
	top10Newest.forEach(el => {
		delete el.distanceFromCurrentLocation;
	});
	const top10Popular = popularRestaurantsInRange.slice(0, 10);
	top10Popular.forEach(el => {
		delete el.distanceFromCurrentLocation;
	});


	const sectionData: Section[] = [];
	sectionData.push({
		title: "Popular Restaurants",
		restaurants: top10Popular
	});
	sectionData.push({
		title: "New Restaurants",
		restaurants: top10Newest
	});
	sectionData.push({
		title: "Nearby Restaurants",
		restaurants: top10Nearby
	});
	const returnJson: Sections = {
		sections: sectionData
	}
	console.log(restaurantsInRange);
	return (returnJson);
}


// console.log(popularRestaurantsInRange);
// console.log(newestRestaurantsInRange);
// console.log(nearbyRestaurantsInRange);

app.get('/distance', (req: Request, res: Response) => {
	console.log(req.query);
	const lat = Number(req.query.lat);
	const lon = Number(req.query.lon);
	res.json(getNearbyRestaurants(lat, lon));
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('Hello');
});

app.listen(5000, () => {
	console.log('Server running');
})