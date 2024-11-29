import nightRideInstance from '../utils/axios';

export function getUserProfile() {
    return nightRideInstance
        .get(`/user/user-get-profile`)
        .then((response) => response.data);
}

export function updateUserProfile(avatar: string, variant: string) {
    return nightRideInstance
        .put(`/user/user-update-profile`, { avatar, variant })
        .then((response) => response.data);
}