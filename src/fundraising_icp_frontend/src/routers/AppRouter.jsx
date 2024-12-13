import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import About from '../pages/About.jsx';
import DonationList from '../pages/DonationList.jsx';
import Homepage from '../pages/Homepage.jsx';
import Detail from '../pages/Detail/DetailDonation.jsx';
import Test from '../pages/Test.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
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
    path: '/DonationList',
    element: <DonationList />,
  },
  {
    path: '/Detail',
    element: <Detail />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);

export default router;
