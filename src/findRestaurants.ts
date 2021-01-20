import { getRestaurantsInRange, getPopularRestaurants, getNewestRestaurants, getNearbyRestaurants } from './getRestaurantsInArea';

export interface Restaurant {
	blurhash: string;
	launch_date: string;
	location: number[];
	name: string;
	online: boolean;
	popularity: number;
	distanceFromCurrentLocation?: number;
}

export interface Section {
	title: string
	restaurants: Restaurant[];
}

export interface Sections {
	sections: Section[]
}

function constructReturnData(popularRestaurantsInRange: Restaurant[], newestRestaurantsInRange: Restaurant[], nearbyRestaurantsInRange: Restaurant[]): Sections {
	const sectionData: Section[] = [];
	if (popularRestaurantsInRange.length !== 0) {
		sectionData.push({
			title: "Popular Restaurants",
			restaurants: popularRestaurantsInRange
		});
	}
	if (newestRestaurantsInRange.length !== 0) {
		sectionData.push({
			title: "New Restaurants",
			restaurants: newestRestaurantsInRange
		});
	}
	if (nearbyRestaurantsInRange.length !== 0) {
		sectionData.push({
			title: "Nearby Restaurants",
			restaurants: nearbyRestaurantsInRange
		});
	}
	const returnJson: Sections = {
		sections: sectionData
	}
	return returnJson;
}

export function findRestaurants(lat: number, lon: number): Sections {

	const restaurantsInRange = getRestaurantsInRange(lat, lon);

	const popularRestaurantsInRange: Restaurant[] = getPopularRestaurants(restaurantsInRange);
	const newestRestaurantsInRange: Restaurant[] = getNewestRestaurants(restaurantsInRange);
	const nearbyRestaurantsInRange: Restaurant[] = getNearbyRestaurants(restaurantsInRange);

	const returnJson: Sections = constructReturnData(popularRestaurantsInRange, newestRestaurantsInRange, nearbyRestaurantsInRange);
	return (returnJson);
}