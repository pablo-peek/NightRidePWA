import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getAllUsersTime } from '../services/race.service';

function useGetUserTime({ raceNumber = 1, page = 1, limit = 10 } = {}) {
    const { data, error, ...restQuery } = useQuery({
        queryKey: ['raceTime', raceNumber, page, limit],
        queryFn: async () => {
            const response = await getAllUsersTime(raceNumber, page, limit);
            return response;
        },
        placeholderData: [],
    });

    if (error) {
        toast.error('Ocurrió un error al obtener los tiempos de las carreras');
    }

    return {
        ...restQuery,
        racesTime: data,
    };
}

export default useGetUserTime;