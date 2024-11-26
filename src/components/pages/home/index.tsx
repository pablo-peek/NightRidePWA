import heroImage from "../../../img/hero.png";
import historyImage from "../../../img/history.png";
import tipography from "../../../img/tipography.png";
import logo from "../../../img/logo.png";
import ESBRLogo from "../../../img/esbr.png";
import cardTop from "../../../img/downloadCard.png";
import featureOne from "../../../img/feature_1.png";
import featureTwo from "../../../img/feature_2.png";
import featureThree from "../../../img/feature_3.png";
import featureFour from "../../../img/feature_4.png";
import flutterSection from "../../../img/flutterSection.png";

function Home(): JSX.Element {

    const scrollToDownload = () => {
        const downloadSection = document.getElementById("download-section");
        if (downloadSection) {
            downloadSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const goToYoutube = () => {
        window.open("https://youtu.be/rvjPxhOfS40?si=2gU-Z-G-F-k3lMDz", "_blank");
    };

    const downloadAPK = () => {
        // window.open("https://drive.google.com/uc?export=download&id=1g7GzrZl9l9VJ0c3Jv2k0tZuH8r5CJv3N", "_blank");
        console.log("Descargando APK...");
    }

    const downloadFlutterApp = () => {
        console.log("Descargando Flutter...");
    }

    return (
        <div className="bg-gray-900 text-white">
            <section
                className="flex items-center min-h-screen px-6 bg-cover text-left bg-center opacity-0 animate-fade-in-fast"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="text-center opacity-0 transform translate-y-10 animate-delay-hero">
                    <img
                        src={logo}
                        alt="NightRide Logo"
                        className="mb-6 w-24 md:w-28 opacity-0 transform translate-y-10 animate-logo rounded-full mx-auto"
                    />
                    <h1 className="text-3xl md:text-5xl font-bold text-white opacity-0 transform translate-y-10 animate-text">
                        Ya disponible en PC
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl opacity-0 transform translate-y-10 animate-text">
                        Sumérgete en el mundo de carreras más emocionante, diseñado para ofrecerte adrenalina pura y una experiencia inolvidable.
                    </p>
                    <div className="mt-6 flex justify-center space-x-4 opacity-0 transform translate-y-10 animate-buttons">
                        <button
                            onClick={goToYoutube}
                            className="px-6 py-3 border-2 border-white text-white font-medium text-lg rounded-lg hover:bg-white hover:text-gray-900 duration-300 focus:ring focus:ring-blue-300"
                        >
                            Ver Trailer
                        </button>
                        <button
                            onClick={scrollToDownload}
                            className="px-6 py-3 border-2 border-white text-white font-medium text-lg rounded-lg hover:bg-white hover:text-gray-900 duration-300 focus:ring focus:ring-green-300"
                        >
                            Descargar
                        </button>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section
                className="flex items-center min-h-screen px-6 bg-cover text-left bg-center"
                style={{ backgroundImage: `url(${historyImage})` }}
            >
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between gap-24 mb-6">
                    {/* cambiar por foto del garage */}
                    <div className="md:w-1/2 flex justify-center items-center">
                        <img
                            src={featureOne}
                            alt="NightRide History"
                            className="mt-24 md:mt-0 md:w-450 rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="max-w-md text-center md:text-left">
                        <img
                            src={tipography}
                            alt="NightRide Logo"
                            className="w-36 md:w-40 md:align-left mx-auto md:mx-0"
                        />
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Bienvenidos a Eclipse City</h2>
                        <p className="mt-4 text-gray-300 text-justify">
                            En una ciudad donde las luces iluminan las calles y la oscuridad esconde secretos,
                            las carreras ilegales son el corazón de la vida nocturna. Este mundo no es solo de velocidad;
                            es un campo de batalla donde los mejores compiten no solo por dinero, sino por respeto y dominio
                            en las sombras.
                        </p>
                        <p className="mt-4 text-gray-300 text-justify">
                            Axel, un joven prodigio del volante con un pasado misterioso, llega decidido a convertirse en el mejor
                            piloto de la ciudad. Pero su camino no será fácil. Para alcanzar la cúspide, deberá enfrentarse a los
                            corredores más temidos y respetados, cada uno con su propia reputación y estilo único.
                        </p>
                        <p className="mt-4 text-gray-300 text-justify">
                            Mientras las rivalidades se intensifican y las líneas entre aliados y enemigos se desdibujan,
                            Axel descubrirá que las carreras no son solo un juego de velocidad, sino una prueba de carácter,
                            lealtad y determinación.
                        </p>
                    </div>
                </div>
            </section>

            {/* flutter app */}
            <section 
                className="flex flex-col md:flex-row items-center min-h-screen px-6 bg-cover text-left bg-center"
                style={{ backgroundImage: `url(${flutterSection})` }}
            >
                <div className="max-w-5xl mx-auto md:w-1/2 p-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        ¡Lleva NightRide contigo donde vayas!
                    </h2>
                    <p className="mt-4 text-gray-300">
                        ¡Prepárate para tener el control total de tus estadísticas y avances en NightRide con nuestra aplicación para móviles! 📱🚗
                    </p>
                    <p className="mt-4 text-gray-300">
                        El app te permite seguir tus logros en tiempo real. Consulta tus tiempos, clasificaciones y estadísticas personales en cualquier momento, estés donde estés.
                    </p>
                </div>
                <div className="mt-12 md:mt-0 md:w-1/2 bg-neutral-800 bg-opacity-35 p-6 rounded-2xl shadow-2xl">
                    <h3 className="text-2xl font-semibold text-white">Características principales:</h3>
                    <ul className="mt-4 text-gray-300 space-y-4 text-left">
                        <li className="flex items-center">
                            <span className="mr-2 text-yellow-400">📊</span>
                            Estadísticas detalladas de cada carrera: tiempos, posición, y más.
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2 text-yellow-400">🏁</span>
                            Clasificaciones en vivo: mantente actualizado sobre tu posición en el ranking de la ciudad.
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2 text-yellow-400">🚦</span>
                            Notificaciones de eventos y torneos especiales para que no te pierdas de nada.
                        </li>
                    </ul>
                    <div className="mt-8 text-center">
                        <button
                            onClick={downloadFlutterApp}
                            className="px-6 py-3 border-2 border-white text-white font-medium text-lg rounded-lg hover:bg-white hover:text-gray-900 duration-300 focus:ring focus:ring-green-300"
                        >
                            Descargar Aplicación Móvil
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-8 px-6 bg-neutral-900 flex flex-col">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between gap-24 mb-6">
                    <div className="md:w-1/2 flex justify-center items-center order-1 md:order-2">
                        <img
                            src={featureOne}
                            alt="NightRide History"
                            className="mt-24 md:mt-0 md:w-96 rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="max-w-md text-center md:text-left order-2 md:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Tu compañero en la velocidad.</h2>
                        <p className="mt-4 text-gray-300 text-justify">
                            Conoce el auto principal de NightRide, diseñado para dominar las calles con estilo, potencia y precisión.
                            Este vehículo será tu arma en la batalla por la cima en el mundo de las carreras nocturnas.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-8 px-6 bg-neutral-900 flex flex-col">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between gap-24 mb-6">
                    <div className="md:w-1/2 flex justify-center items-center order-1">
                        <img
                            src={featureTwo}
                            alt="NightRide History"
                            className="mt-24 md:mt-0 md:w-96 rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="max-w-md text-center md:text-left order-2 md:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Siente la intensidad de la competencia.</h2>
                        <p className="mt-4 text-gray-300 text-justify">
                            Sumérgete en la emoción de las carreras callejeras. Desde el rugir de los motores hasta el brillo de las luces de neón,
                            cada carrera te desafiará a superar tus límites.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-8 px-6 bg-neutral-900 flex flex-col">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between gap-24 mb-6">
                    <div className="md:w-1/2 flex justify-center items-center order-1 md:order-2">
                        <img
                            src={featureThree}
                            alt="NightRide History"
                            className="mt-24 md:mt-0 md:w-96 rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="max-w-md text-center md:text-left order-2 md:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Vive la velocidad desde dentro.</h2>
                        <p className="mt-4 text-gray-300 text-justify">
                            Experimenta la adrenalina de la conducción a través de los ojos de un corredor callejero. Cada curva,
                            cada derrape y cada destello de luz nocturna te pondrán al límite.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-8 px-6 bg-neutral-900 flex flex-col">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between gap-24 mb-6">
                    <div className="md:w-1/2 flex justify-center items-center order-1">
                        <img
                            src={featureFour}
                            alt="NightRide History"
                            className="mt-24 md:mt-0 md:w-96 rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="max-w-md text-center md:text-left order-2 md:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Hazlo único. Hazlo tuyo.</h2>
                        <p className="mt-4 text-gray-300 text-justify">
                            En NightRide, tu auto no solo es tu herramienta, es tu identidad. Personaliza cada detalle, desde la pintura hasta los accesorios,
                            y crea un vehículo que refleje tu estilo y domine las calles.
                        </p>
                    </div>
                </div>
            </section>

            <section
                id="download-section"
                className="py-8 px-6 bg-neutral-900 flex flex-col min-h-screen"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white text-left mb-8">Descargar Juego</h2>

                <div className="flex justify-center items-center flex-1">
                    <div className="bg-black max-w-md w-full rounded-2xl shadow-lg overflow-hidden border border-gray-700">
                        <div className="w-full h-80 bg-cover bg-center" style={{ backgroundImage: `url(${cardTop})` }}>
                            <div className="flex justify-center items-center h-full">
                            <img
                                    src={logo}
                                    alt="NightRide Logo"
                                    className="w-40 mt-24 rounded-2xl"
                                />
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-300 mb-4">NightRide</h3>
                            <p className="text-gray-200 mb-6">
                                ¡Hazte con el juego más emocionante de carreras urbanas! ¡Descarga ahora y vive la adrenalina!
                            </p>
                            <button
                                onClick={downloadAPK}
                                className="w-full px-6 py-3 border-2 border-white text-white font-medium text-lg rounded-lg hover:bg-white hover:text-gray-900 duration-300 focus:ring focus:ring-green-300"
                            >
                                Descargar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="p-4 rounded-xl border border-gray-700 bg-black mt-8">
                        <p className="text-center">
                            Las mejoras y actualizaciones más recientes solo disponibles para PC
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="p-4 rounded-xl border border-gray-700 bg-black mt-8 flex">
                        <div className="w-1/2 flex justify-center items-center">
                            <img src={ESBRLogo} alt="ESBR Logo" className="w-24 rounded-lg" />
                        </div>
                        <div className="w-1/2 flex justify-center items-center">
                            <p className="text-gray-300 text-center">
                                Violencia leve, Temas sugerentes, Lenguaje moderado.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="py-6 bg-black text-center">
                <p className="text-gray-400">© {new Date().getFullYear()} NightRide. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default Home;
