import React, { useState } from "react";
import cardTop from "../../img/downloadCard.png";
import Avatar from "boring-avatars";
import {useGetUserProfile, useUpdateUserProfile} from "../../query/userQuery";
import Loader from "../../components/Loader";

function Profile(): JSX.Element {
    const [isModalOpen, setModalOpen] = useState(false);
    const updateUserProfile = useUpdateUserProfile();
    const { user, isFetching: isFetchingUser } = useGetUserProfile();

    if(isFetchingUser) {
        return <Loader visible={isFetchingUser} />;
    }

    const changeAvatar = async (name: string, variant: string) => {
        try {
            await updateUserProfile({ avatar: name, variant: variant });
            setModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        return <Loader visible={!isModalOpen} />;
    };

    return (
        <div className="bg-neutral-900 text-white min-h-screen">
            <section className="container mx-auto px-8 py-24">
                <div className="border border-gray-700 rounded-2xl shadow-lg bg-black overflow-hidden">
                    <div
                        className="w-full h-80 bg-cover bg-center"
                        style={{ backgroundImage: `url(${cardTop})` }}
                    ></div>
                    <div className="p-6">
                        <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Avatar size={60} name={user?.data.avatar} variant={user?.data.variant}/>
                                <div>
                                    <h6 className="text-blue-gray-900 font-semibold">
                                        {user?.data?.username}
                                    </h6>
                                    <p className="text-sm text-gray-500"> {user?.data?.email}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    onClick={openModal}
                                    className="px-4 py-2 border-2 border-white text-white font-medium text-lg rounded-lg hover:bg-white hover:text-gray-900 duration-300 focus:ring focus:ring-blue-300"
                                >
                                    Cambiar Ícono
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-6">
                            Elige un avatar que represente tu estilo y destaca en las calles
                            de NightRide.
                        </p>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-neutral-900 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-2xl overflow-y-auto max-h-[80vh]">
                        <h3 className="text-lg font-bold mb-4 text-center">
                            Selecciona tu Avatar
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6">
                            {/* Marble */}
                            <div className="border-gray-700 p-4 flex flex-col items-center">
                                <p className="text-center mb-4">Marble</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona"].map((name) => (
                                        <div
                                            key={name}
                                            className="cursor-pointer"
                                            onClick={() => changeAvatar(name, "marble")}
                                        >
                                            <Avatar
                                                size={60}
                                                name={name}
                                                variant="marble"
                                                className="hover:ring hover:ring-gray-700 hover:rounded-full cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Pixel */}
                            <div className="border-gray-700 p-4 flex flex-col items-center">
                                <p className="text-center mb-4">Pixel</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona"].map((name) => (
                                        <div
                                            key={name}
                                            className="cursor-pointer"
                                            onClick={() => changeAvatar(name, "pixel")}
                                        >
                                            <Avatar
                                                size={60}
                                                name={name}
                                                variant="pixel"
                                                className="hover:ring hover:ring-gray-700 hover:rounded-full cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Beam */}
                            <div className="border-gray-700 p-4 flex flex-col items-center">
                                <p className="text-center mb-4">Beam</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona"].map((name) => (
                                        <div
                                            key={name}
                                            className="cursor-pointer"
                                            onClick={() => changeAvatar(name, "beam")}
                                        >
                                            <Avatar
                                                size={60}
                                                name={name}
                                                variant="beam"
                                                className="hover:ring hover:ring-gray-700 hover:rounded-full cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Ring */}
                            <div className="border-gray-700 p-4 flex flex-col items-center">
                                <p className="text-center mb-4">Ring</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona"].map((name) => (
                                        <div
                                            key={name}
                                            className="cursor-pointer"
                                            onClick={() => changeAvatar(name, "ring")}
                                        >
                                            <Avatar
                                                size={60}
                                                name={name}
                                                variant="ring"
                                                className="hover:ring hover:ring-gray-700 hover:rounded-full cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className="mt-6 w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 duration-300"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;