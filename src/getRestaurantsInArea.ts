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
	const top10Popular = popularRestaurantsInRange.slice(0, 10);
	top10Popular.forEach(el => {
		delete el.distanceFromCurrentLocation;
	});
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
	const top10Newest = newestRestaurantsInRange.slice(0, 10);
	top10Newest.forEach(el => {
		delete el.distanceFromCurrentLocation;
	});
	return top10Newest;
}

export function getNearbyRestaurants(restaurantsInRange: Restaurant[]): Restaurant[] {
	const nearbyRestaurantsInRange: Restaurant[] = [...restaurantsInRange]
		.sort((a, b): number => {
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
	return top10Nearby;
}
