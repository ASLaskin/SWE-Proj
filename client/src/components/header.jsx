import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <>
      <nav className='bg-white  w-full z-20 top-0 start-0 bg-opacity-90 fixed border border-black '>
        <div className='max-w-screen-xl flex items-center  justify-between mx-auto p-4'>
          <div className='flex items-center md:flex-1'>
            <a href='/' className='flex items-center rtl:space-x-reverse'>
              <img src='./src/assets/Craven.svg' className='h-8' alt='Craven Logo' />
              <span className='self-center text-2xl font-semibold text-secondaryColor  md:pr-5'>
                Craven
              </span>
            </a>
            <ul className='text-xl hidden md:flex flex-col  md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <Link to="/about">
                <a
                  className='block py-2 px-3 text-secondaryColor rounded md:hover:bg-transparent md:hover:text-accent md:p-0'
                >
                  About
                </a>
                </Link>
              </li>
              <li>
                <a
                  href='#'
                  className='text-secondaryColor block py-2 px-3 text-#102B3F rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-accent md:p-0  '
                >
                  OpenSource
                </a>
              </li>
            </ul>
          </div>
          <div className='md:flex space-x-2 rtl:space-x-reverse'>
            <Link to="/signup">
            <button
              type='button'
              className='text-secondaryColor py-2 text-center font-medium text-sm md:justify-center hover:text-accent'
            >
              Signup
            </button>
            </Link>
            <Link to="/login">
            <button
              type='button'
              className='text-white bg-primaryColor hover:bg-secondaryColor focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Login
            </button>
            </Link>
          </div>
          <div className='flex md:hidden items-center'>
            <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-sticky'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
