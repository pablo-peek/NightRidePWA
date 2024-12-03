import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import ErrorBoundary from "./components/error-boundary"
import { CustomProvider } from "rsuite"
import es_ES from 'rsuite/locales/es_ES';
import { AxiosError } from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          refetchOnWindowFocus: false,
          retry: false,
          staleTime: 30000,
      },
      mutations: {
          onError: (error) => {
              if (!(error instanceof AxiosError)) return;
              const statusCode = error?.response?.status
              const message = error?.response?.data?.message
              if (statusCode === 400) toast.warn('Hubo un error en la solicitud')
              else if (statusCode === 401 || statusCode === 403) toast.warn('No autorizado')
              else if (statusCode === 404) toast.warn('No se encontró el recurso')
          }
      }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <CustomProvider locale={es_ES}>
            <Router />
            </CustomProvider>
        </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
