import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import AdminPage from './Admin.tsx'

const router  = createBrowserRouter([{
  path:'/',
  element:<App/>
},{
  path:'/admin',
  element:<AdminPage/>
}])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router}/>
    </ClerkProvider>
  </StrictMode>,
)
