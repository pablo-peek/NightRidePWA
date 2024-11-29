import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AuthContext from "../../components/context";
import { toast } from "react-toastify";
import to from "await-to-js";
import downloadCard from "../../img/downloadCard.png";
import tipography from "../../img/tipography.png";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import Loader from "../../components/Loader";

import { motion } from "framer-motion";
import { AuroraBackground } from "../../components/ui/AuroraBackground";

function Register(): JSX.Element {
  const registerDTO = { username: "", email: "", password: "", passwordConfirm: "" };
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch,
  } = useForm<typeof registerDTO>({ defaultValues: registerDTO });

  watch();

  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

  const context: any = useContext(AuthContext);

  async function onSubmit(): Promise<any> {
    const { username, email, password, passwordConfirm } = getValues();

    if (password !== passwordConfirm) {
      setPasswordMismatch(true);
      return;
    }

    setLoad(true);
    try {
      const [error, user]: any = await to(context.register(username, email, password));

      if (error) throw error;

      if (!user) {
        toast.error("Ocurrió un error al registrarse, intentelo más tarde");
        return;
      }
      toast.success("¡Registro exitoso, bienvenido!");
    } catch (error) {
      console.error(error);
      toast.error("Hubo un problema, inténtalo de nuevo");
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
                  
                  <img
                    src={tipography}
                    alt="NightRide Logo"
                    className="w-36 md:w-60 mx-auto block"
                  />
                  
                  <h2 className="text-2xl mt-24 font-bold text-white sm:text-3xl md:text-4xl">
                    Bienvenido a NightRide
                  </h2>

                  <p className="mt-4 leading-relaxed text-white/90">
                    Donde las calles son tu pista de pruebas. Regístrate para
                    comenzar tu viaje hacia la cima y desafiar a los mejores
                    pilotos de la ciudad. ¡Que la velocidad esté de tu lado!
                  </p>
                </div>
              </section>

              <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 h-full">
                <div className="max-w-xl lg:max-w-3xl">
                  

                  <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 gap-6">
                    <div className="col-span-12">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-200">
                        Usuario
                      </label>
                      <Controller
                        name="username"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            onChange={(value) => {
                              onChange(value)
                              setError(false)
                            }}
                            value={value}
                            type="text"
                            name="username"
                            placeholder="Escribe tu usuario"
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
                    <div className="col-span-12">
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

                    <div className="col-span-12">
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
                              setPasswordMismatch(false)
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
                    <div className="col-span-12">
                      <label
                        htmlFor="PasswordConfirm"
                        className="block text-sm font-medium text-gray-200"
                      >
                        Repetir Contraseña
                      </label>
                      <Controller
                        name="passwordConfirm"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <PasswordInput
                            onChange={(value) => {
                              const noSpaceValue = value.replace(/\s/g, '');
                              onChange(noSpaceValue)
                              setError(false)
                              setPasswordMismatch(false)
                            }}
                            value={value}
                            placeholder="Repite tu contraseña"
                            error={errors?.passwordConfirm || passwordMismatch ? true : false}
                            className="mt-3 w-full rounded-md text-sm shadow-sm border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-0 pl-3"
                            style={{ height: '45px' }}
                          />
                        )}
                      />
                      {(Object.keys(errors).includes("passwordConfirm") || passwordMismatch) && (
                        <p className="text-sm text-red-600">
                          {passwordMismatch ? "Las contraseñas no coinciden" : "Repite tu contraseña"}
                        </p>
                      )}
                    </div>
                    <div className="col-span-12 sm:flex sm:items-center sm:gap-4">
                      <button
                        className="w-full inline-block shrink-0 rounded-md border border-blue-600 bg-transparent px-12 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-blue-500"
                        type="submit"
                      >
                        Registrarse
                      </button>
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

export default Register;