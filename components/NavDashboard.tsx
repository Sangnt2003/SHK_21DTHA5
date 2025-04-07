"use client"
import React from 'react'
import Link from 'next/link';
import logo from '../public/images/logo.png'
import Image from 'next/image';
import '../public/css/nav-dashboard.css'
import { useAppDispatch } from 'store/hooks';
import { logoutAsync } from 'store/slices/auth/authActions';
import { redirect } from 'next/navigation';

const NavDashboard = () => {

  const dispatch = useAppDispatch();

  return (
    <aside className="w-[20%] bg-transparent h-screen p-4">
      <div className='m-auto border-1 w-30 h-30 rounded-[50%]'>
        <Image src={logo} alt='logo' className='h-[100%] border-1 text-center mt-auto p-auto' />
      </div>
      <h2 className='uppercase text-center font-bold mt-3 mb-[20%]'>Villas Booking Manager</h2>
      
      <nav className="p-4 rounded-2xl flex flex-col items-center gap-4 h-[500px] menu__shadow">
        <Link href="/manager/orders">
          <button className="w-[300px] uppercase font-bold p-4 text-center rounded-[13px] hover:shadow-xl transform hover:scale-105 transition duration-300 btn__shadown flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
            Manage Orders
          </button>
        </Link>
        
        <Link href="/manager/villas">
          <button className="w-[300px] uppercase font-bold p-4 mt-5 text-center rounded-[13px] shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 btn__shadown flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
            </svg>
            Manage Villas
          </button>
        </Link>

        <button className="w-[300px] uppercase font-bold p-4 mt-5 text-center rounded-[13px] shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 btn__shadown flex items-center justify-center gap-2" onClick={() => {
          dispatch(logoutAsync())
          redirect("/villas")
        }}>Đăng xuất</button>
      </nav>
    </aside>
  )
}

export default NavDashboard;
