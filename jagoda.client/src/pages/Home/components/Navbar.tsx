import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';
import { getUserById, logoutUser } from '../../../api';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../../store/userSlice';
import { ApplicationUser } from '../../../api/interfaces';

export default function Navbar() {
  const [navIsShown, setnavIsShown] = useState(false);
  const toggleNavIsShown = () => {
    setnavIsShown((navIsShown) => !navIsShown);
  };
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setnavIsShown(false);
    navigate('/signin');
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      localStorage.removeItem('userId');
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const [user, setUserState] = useState<ApplicationUser | null>(null);
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId && !userId) {
      dispatch(setUser({ id: storedUserId, username: null, email: null }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (id: string) => {
    try {
      const response = await getUserById(id);
      setUserState(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <nav className='flex justify-between items-center h-20 px-4 absolute top-0 left-0 z-10 w-full text-white bg-transparent'>
      <h1>Jagoda</h1>
      <ul className='hidden md:flex'>
        <li className='transition-transform transform hover:scale-125 duration-300'>
          <Link to='/'>Home</Link>
        </li>
        <li className='transition-transform transform hover:scale-125 duration-300'>
          <Link to='/travel-packages'>TravelPackages</Link>
        </li>
        <li className='transition-transform transform hover:scale-125 duration-300'>
          <Link to='/booking'>Booking</Link>
        </li>
        <li className='transition-transform transform hover:scale-125 duration-300'>
          <Link to='/profile'>Profile</Link>
        </li>
        <li className='transition-transform transform hover:scale-125 duration-300'>
          <Link to='/admin-dashboard'>AdminDashboard</Link>
        </li>
      </ul>
      {user ? (
        <div className='hidden md:flex items-center'>
          <span>{user.userName}</span>
          <button onClick={handleLogout} className='ml-4'>
            Logout
          </button>
        </div>
      ) : (
        <div className='hidden md:flex'>
          <Link to='/signin'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
              />
            </svg>
          </Link>
        </div>
      )}

      {/* Mobile style */}
      {!navIsShown && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 md:hidden'
          onClick={toggleNavIsShown}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25'
          />
        </svg>
      )}
      {navIsShown && (
        <div className='md:hidden absolute z-10 top-0 left-0 w-full bg-gray-100/90 text-black px-4 py-6'>
          <div className='flex justify-between'>
            <h1>Jagoda</h1>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
              onClick={toggleNavIsShown}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
          <ul className='space-y-4 mb-4'>
            <li className='relative hover-slide-in border-b-2'>
              <Link to="/" onClick={toggleNavIsShown} className='block py-2'>Home</Link>
            </li>
            <li className='relative hover-slide-in border-b-2'>
              <Link to="/travel-packages" onClick={toggleNavIsShown} className='block py-2'>Travel Packages</Link>
            </li>
            <li className='relative hover-slide-in border-b-2'>
              <Link to="/booking" onClick={toggleNavIsShown} className='block py-2'>Booking</Link>
            </li>
            <li className='relative hover-slide-in border-b-2'>
              <Link to="/profile" onClick={toggleNavIsShown} className='block py-2'>Profile</Link>
            </li>
            <li className='relative hover-slide-in border-b-2'>
              <Link to="/admin-dashboard" onClick={toggleNavIsShown} className='block py-2'>Admin Dashboard</Link>
            </li>
          </ul>
          {user ? (
            <div className='flex flex-row justify-between'>
            <p className="text-2xl font-bold hover:text-red-500">
              Hi, {user.userName}
            </p>
            <button onClick={handleLogout} className='mb-4 btn'>
            Sign Out
          </button>
          </div>
          ) : (
            <>
              <button className='w-full mb-4 btn' onClick={handleButtonClick}>Sign In</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
