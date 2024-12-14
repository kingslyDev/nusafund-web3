// src/routers/AppRouter.jsx
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import About from '../pages/About.jsx';
import DonationList from '../pages/DonationList.jsx';
import Homepage from '../pages/Homepage.jsx';
import DetailDonation from '../pages/Detail/DetailDonation.jsx';
import Test from '../pages/Test.jsx';
import AddCampaign from '@/pages/Campign/AddCampign.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/addcampaign',
    element: <AddCampaign />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/donationlist',
    element: <DonationList />,
  },
  // Route dinamis untuk Detail Donasi
  {
    path: '/detaildonation/:id',
    element: <DetailDonation />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);

export default router;
