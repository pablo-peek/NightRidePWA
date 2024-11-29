import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getUserProfile, updateUserProfile } from '../services/user.service';

function useGetUserProfile(isAuthenticated = false) {
    const { data, error, ...restQuery } = useQuery({
        queryKey: ['raceTime'],
        queryFn: async () => {
            if(isAuthenticated) {
                const response = await getUserProfile();
                return response;
            }
            return { data: { avatar: '', variant: '' } };
        },
        placeholderData: [],
    });

    if (error) {
        toast.error('Ocurrió un error al obtener el perfil');
    }

    return {
        ...restQuery,
        user: data,
    };
}

function useUpdateUserProfile() {
    const queryClient = useQueryClient();

    const updateUser = async ({ avatar = "", variant = ""} = {}) => {
        try {
            const response = await updateUserProfile(avatar, variant);
            queryClient.setQueryData(['raceTime', avatar, variant], response);
            return response;
        } catch (error) {
            toast.error('Ocurrió un error al actualizar el perfil');
            throw error;
        }
    };

    return updateUser;
}


export { useGetUserProfile, useUpdateUserProfile };