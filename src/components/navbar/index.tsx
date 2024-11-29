import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import AuthContext from '../context/index'
import logo from '../../img/logo.png'
import { useNavigate } from 'react-router-dom'
import React, { useState, useContext, useEffect } from 'react';
import { AuthContextType } from '../context/provider'
import { useToaster } from "rsuite"
import Avatar from "boring-avatars";
import { useGetUserProfile } from '../../query/userQuery'
import to from "await-to-js"


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Navbar() {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType;
  const { user } = useGetUserProfile(isAuthenticated);


  const navigate = useNavigate();
  const context: any = useContext(AuthContext);

  const [navigation, setNavigation] = useState([
    { name: 'Inicio', href: '#/', current: true, navigate: () => navigate('/'), show: true },
    { name: 'Dashboard', href: '#/dashboard/race-one', current: false, navigate: () => navigate('/dashboard/race-one'), show: isAuthenticated },
    { name: 'Perfil', href: '#/profile', current: false, navigate: () => navigate('/profile'), show: false },
    { name: 'Iniciar Sesión', href: '#/login', current: false, navigate: () => navigate('/login', { replace: isAuthenticated }), show: false },
  ]);

  useEffect(() => {
    setNavigation((prev) =>
      prev.map((item) => {
        if (item.name === 'Dashboard') {
          return { ...item, show: isAuthenticated };
        }
        return item;
      })
    );
  }, [isAuthenticated]);

  const handleNavigation = (name: string) => {
    setNavigation((items) =>
      items.map((item) => ({
        ...item,
        current: item.name === name,
      }))
    );
  };

  const newNavigation = navigation.filter((item) => item.show);

  async function signOut(): Promise<any> {
    try {
      await to(context.signOut());
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Disclosure as="nav" className="bg-black top-0 w-full z-50 border-b border-gray-800 absolute">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="NightRide"
                src={logo}
                className="h-8 w-8 rounded-full"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {newNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      handleNavigation(item.name);
                      item.navigate();
                    }}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                        item.current ? 'bg-white bg-opacity-40 text-white' : 'text-gray-300 hover:bg-white hover:bg-opacity-40 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isAuthenticated ? (
            <Menu as="div" className="relative ml-3">
            <div>
              <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Menú de Usuario</span>
                <Avatar
                  size={40}
                  name={user?.data?.avatar}
                  variant={user?.data?.variant}
                />
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem>
                <a
                  href="#/profile"
                  onClick={() => {
                    handleNavigation('Perfil');
                    navigate('/profile');
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  Perfil
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  onClick={() => {
                    signOut();
                    // toaster.push(<Message type="success" message="Hasta luego" />)
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  Cerrar Sesión
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
            ) : (
              // usar el array de navegacion para mostrar el boton de iniciar sesion, validar el current
                <a
                  href="#/login"
                  onClick={() => {
                    handleNavigation('Iniciar Sesión');
                    navigate('/login', { replace: true });
                  }}
                  aria-current={navigation.find((item) => item.name === 'Iniciar Sesión')?.current ? 'page' : undefined}
                  className={classNames(
                    navigation.find((item) => item.name === 'Iniciar Sesión')?.current
                      ? 'bg-white bg-opacity-40 text-white'
                      : 'text-gray-300 hover:bg-white hover:bg-opacity-40 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  Iniciar Sesión
                </a>
              
            )}

          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {newNavigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white hover:bg-opacity-40 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbar;