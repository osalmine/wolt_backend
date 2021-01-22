import { Restaurant } from './findRestaurants';
import restaurantsJson from './restaurants.json';
import { getDistance } from 'geolib';

export function getRestaurantsInRange(lat: number, lon: number): Restaurant[] {
	const restaurantsInRange: Restaurant[] = [];

	restaurantsJson.restaurants.forEach(restaurant => {
		const distanceBetweenPoints: number = getDistance({latitude: restaurant.location[1], longitude: restaurant.location[0]}, {latitude: lat, longitude: lon});
		if (distanceBetweenPoints < 1500) {
			restaurantsInRange.push(restaurant);
			restaurantsInRange[restaurantsInRange.length - 1].distanceFromCurrentLocation = distanceBetweenPoints;
		}
	});
	return restaurantsInRange;
}

export function getPopularRestaurants(restaurantsInRange: Restaurant[]): Restaurant[] {
	const popularRestaurantsInRange: Restaurant[] = [...restaurantsInRange]
		.sort((a, b): number => sortRestaurants(a, b, 'popularity'));
	const top10Popular = popularRestaurantsInRange.slice(0, 10);
	return top10Popular;
}

export function getNewestRestaurants(restaurantsInRange: Restaurant[]): Restaurant[] {
	const newestRestaurantsInRange: Restaurant[] = [...restaurantsInRange]
		.filter((el) => {
			let fourMonthsAgo = new Date();
			fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
			let launchDate = new Date(el.launch_date);
			return (fourMonthsAgo.toLocaleDateString() < launchDate.toLocaleDateString());
		})
		.sort((a, b): number => sortRestaurants(a, b, 'launch_date'));
	const top10Newest = newestRestaurantsInRange.slice(0, 10);
	return top10Newest;
}

export function getNearbyRestaurants(restaurantsInRange: Restaurant[]): Restaurant[] {
	const nearbyRestaurantsInRange: Restaurant[] = [...restaurantsInRange]
		.sort((a, b): number => sortRestaurants(a, b, 'distanceFromCurrentLocation', true));
	const top10Nearby = nearbyRestaurantsInRange.slice(0, 10);
	return top10Nearby;
}

const sortRestaurants = (a: Restaurant, b: Restaurant, sortBy: string, ascending?: boolean): number => {
	const onlineStatus = isOnline(a, b);
	if (onlineStatus !== 0)
		return onlineStatus;
	if (ascending === true)
		return sortRestaurantsAscending(a, b, sortBy as keyof Restaurant);
	return sortRestaurantsDescending(a, b, sortBy as keyof Restaurant);
}

function sortRestaurantsDescending<Restaurant, K extends keyof Restaurant>(a: Restaurant, b: Restaurant, sortBy: K): number {
	if (a[sortBy] < b[sortBy]){
		return 1;
	} else if (a[sortBy] > b[sortBy]) {
		return -1;
	}
	return 0;
}

function sortRestaurantsAscending<Restaurant, K extends keyof Restaurant>(a: Restaurant, b: Restaurant, sortBy: K): number {
	if (a[sortBy] > b[sortBy]){
		return 1;
	} else if (a[sortBy] < b[sortBy]) {
		return -1;
	}
	return 0;
}

const isOnline = (a: Restaurant, b: Restaurant): number => {
	if (a.online === false && b.online === true) {
		return 1;
	} else if (b.online === false && a.online === true) {
		return -1;
	}
	return 0;
}