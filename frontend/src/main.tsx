import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom';
import { routes } from './router/routes.tsx';
import { ThemeProvider } from './components/ui/theme-provider.tsx';
import { Provider } from 'react-redux'
import { store } from './store/store.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={routes} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
