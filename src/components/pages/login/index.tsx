import {useContext, useState} from "react"
import Navbar from "../../navbar";
import { Controller, useForm } from "react-hook-form"
import AuthContext from "../../context";
import { Message, useToaster } from "rsuite"
import to from "await-to-js"

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

  
  watch()

  const [load, setLoad] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const context:any = useContext(AuthContext);
  const toaster = useToaster();

  const customToastMessage = (message: string) => {
    const customMessage = (
        <Message showIcon type={"error"} closable>{message}</Message>
    )
    return customMessage;
}

  async function onSubmit(): Promise<any> {
    const {email, password} = getValues();

    setLoad(true)
    try {   
        const [error, user]: any = await to(context.signIn(email, password));
        
        if(error) throw error
        
        if(!user) {
            toaster.push(customToastMessage('Ocurrio un error al iniciar sesion, intente mas tarde'), { placement: 'topCenter', duration: 5000})
            return;
        }
        
    } catch (error) {
        toaster.push(customToastMessage('Ocurrio un error al iniciar sesion, intente mas tarde'), { placement: 'topCenter', duration: 5000})

    }finally{
        setLoad(false);

    }

}

return (
  <>
  <Navbar />
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
);
};


export default Login;
