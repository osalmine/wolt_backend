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

function combineReturnData(restaurantsList: Restaurant[][]): Sections {
	const sectionData: Section[] = [];
	const sectionTitles = [ "Popular Restaurants", "New Restaurants", "Nearby Restaurants" ];

	restaurantsList.forEach((restaurants: Restaurant[], i: number) => {
		if (restaurants.length !== 0) {
			restaurants.forEach(restaurant => delete restaurant.distanceFromCurrentLocation);
			sectionData.push({
				title: sectionTitles[i],
				restaurants: restaurants
			});
		}
	});
	return { sections: sectionData };
}

export function findRestaurants(lat: number, lon: number): Sections {

	const restaurantsInRange = getRestaurantsInRange(lat, lon);

	const popularRestaurantsInRange: Restaurant[] = getPopularRestaurants(restaurantsInRange);
	const newestRestaurantsInRange: Restaurant[] = getNewestRestaurants(restaurantsInRange);
	const nearbyRestaurantsInRange: Restaurant[] = getNearbyRestaurants(restaurantsInRange);

	const returnJson: Sections = combineReturnData([ popularRestaurantsInRange, newestRestaurantsInRange, nearbyRestaurantsInRange ]);
	return returnJson;
}