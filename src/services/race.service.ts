
import nightRideInstance from '../utils/axios';

export function getAllUsersTime(raceNumber: number, page: number, limit: number) {
    return nightRideInstance
        .get(`/user/all-users-races?raceNumber=${raceNumber}&page=${page}&limit=${limit}`)
        .then((response) => response.data);
}