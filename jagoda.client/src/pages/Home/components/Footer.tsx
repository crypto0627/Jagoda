import React from 'react';

export default function Footer() {
  return (
    <footer className='bg-gray-200 py-8'>
      <div className='container px-4 sm:flex justify-between items-center'>
        <h1 className='px-2'>Jagoda</h1>
        <ul className='flex flex-wrap'>
          <li className='p-0 px-2 text-blue-500 hover:text-black'>
            <a href=''>Privacy Policy</a>
          </li>
          <li className='p-0 px-2 text-blue-500 hover:text-black'>
            <a href=''>About us</a>
          </li>
        </ul>
        <p className="text-black font-bold">&copy; {new Date().getFullYear()} My First DApp. All rights reserved by JakeKuo.</p>
      </div>
    </footer>
  );
};
