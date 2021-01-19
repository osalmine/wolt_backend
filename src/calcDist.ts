// Calculate the distance in km between two coordinates
export function distance(lat1: number, lon1: number, lat2: number, lon2: number): number {

	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}

	const R = 6371;
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);

	const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	const d = R * c;
	return d;
}

// Converts numeric degrees to radians
function toRad(Value: number): number {
	return Value * Math.PI / 180;
}