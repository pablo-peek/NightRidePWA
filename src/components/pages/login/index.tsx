import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AuthContext from "../../context";
import { Message, useToaster } from "rsuite";
import to from "await-to-js";
import downloadCard from "../../../img/downloadCard.png";
import tipography from "../../../img/tipography.png";
import Input from "../../Input";
import PasswordInput from "../../PasswordInput";
import Loader from "../../Loader";

import { motion } from "framer-motion";
import { AuroraBackground } from "../../ui/AuroraBackground";

function Login(): JSX.Element {
  const loginDTO = { email: "", password: "" };
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch,
  } = useForm<typeof loginDTO>({ defaultValues: loginDTO });

  watch();

  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const context: any = useContext(AuthContext);
  const toaster = useToaster();

  const customToastMessage = (message: string) => {
    const customMessage = (
      <Message showIcon type={"error"} closable>
        {message}
      </Message>
    );
    return customMessage;
  };

  async function onSubmit(): Promise<any> {
    const { email, password } = getValues();

    setLoad(true);
    try {
      const [error, user]: any = await to(context.signIn(email, password));

      if (error) throw error;

      if (!user) {
        console.log(user);
        toaster.push(
          customToastMessage(
            "Ocurrió un error al iniciar sesión, intente más tarde"
          ),
          { placement: "topCenter", duration: 5000 }
        );
        return;
      }
    } catch (error) {
      console.log(error);
      toaster.push(
        customToastMessage(
          "Ocurrió un error al iniciar sesión, intente más tarde"
        ),
        { placement: "topCenter", duration: 5000 }
      );
    } finally {
      setLoad(false);
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <AuroraBackground>
        <motion.div className="relative flex flex-col items-center justify-center h-full">
          <section className="text-white w-full h-full">
            <div className="lg:grid lg:grid-cols-12 h-full">
              <section className="relative flex h-full items-end bg-gray-900 lg:col-span-5 xl:col-span-6 lg:block hidden">
                <img
                  alt=""
                  src={downloadCard}
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
                <div className="lg:p-12 lg:inset-0 lg:flex lg:flex-col relative z-10 lg:justify-end lg:h-full lg:w-full">
                  <h2 className="text-2xl mt-24 font-bold text-white sm:text-3xl md:text-4xl">
                    Bienvenido a NightRide
                  </h2>

                  <p className="mt-4 leading-relaxed text-white/90">
                    Donde las calles son tu pista de pruebas. Inicia sesión para
                    comenzar tu viaje hacia la cima y desafiar a los mejores
                    pilotos de la ciudad. ¡Que la velocidad esté de tu lado!
                  </p>
                </div>
              </section>

              <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 h-full">
                <div className="max-w-xl lg:max-w-3xl">
                  <img
                    src={tipography}
                    alt="NightRide Logo"
                    className="w-36 md:w-60 mx-auto block"
                  />
                  <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400 relative -mt-16 block lg:hidden">
                    Donde las calles son tu pista de pruebas. Inicia sesión para
                    comenzar tu viaje hacia la cima y desafiar a los mejores
                    pilotos de la ciudad. ¡Que la velocidad esté de tu lado!
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label htmlFor="Email" className="block text-sm font-medium text-gray-200">
                        Correo
                      </label>
                      <Controller
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            onChange={(value) => {
                              onChange(value)
                              setError(false)
                            }}
                            value={value}
                            type="email"
                            name="email"
                            placeholder="ejemplo@correo.com"
                            error={errors?.email || error ? true : false}
                            className="mt-3 w-full rounded-md text-sm shadow-sm border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-0 pl-3"
                            style={{ height: '45px' }}
                          />
                        )}
                      />
                      {(Object.keys(errors).includes("email") || error) && (
                        <p className="text-sm text-red-600">
                          {errors?.email?.type === "pattern" || error ? "Datos inválidos" : errors?.email?.type === 'invalid_login' ? errors.email.message : "Ingresa un correo"}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="Password"
                        className="block text-sm font-medium text-gray-200"
                      >
                        Contraseña
                      </label>
                      <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <PasswordInput
                            onChange={(value) => {
                              const noSpaceValue = value.replace(/\s/g, '');
                              onChange(noSpaceValue)
                              setError(false)
                            }}
                            value={value}
                            placeholder="Escribe tu contraseña"
                            error={errors?.password || error ? true : false}
                            className="mt-3 w-full rounded-md text-sm shadow-sm border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-0 pl-3"
                            style={{ height: '45px' }}
                          />
                        )}
                      />
                      {(Object.keys(errors).includes("password") || error) && (
                        <p className="text-sm text-red-600">
                          {error ? "Datos inválidos" : "Ingresa una contraseña"}
                        </p>
                      )}
                    </div>
                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button
                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-transparent px-12 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-blue-500"
                        type="submit"
                      >
                        Iniciar sesión
                      </button>

                      <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                        No tienes una cuenta?{' '}
                        <a href="#/register"
                        className="text-gray-700 underline dark:text-gray-200">Crea una cuenta</a>.
                      </p>
                    </div>
                  </form>
                </div>
              </main>
            </div>
            <Loader visible={load} />
          </section>
        </motion.div>
      </AuroraBackground>
    </div>
  );
}

export default Login;