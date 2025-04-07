"use client"
import Link from 'next/link';
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUserAsync } from 'store/slices/auth/authActions';

export default function AdminPage() {
  const router = useRouter();
  const auth  = useAppSelector((state) => state.auth);
  const [user, setUser] = useState(null);
  const dispatch = useAppDispatch();

  // Dispatch getUserAsync khi component mount
  useEffect(() => {
    if (auth.jwt && !auth.user) {
      dispatch(getUserAsync());
    }
    
   
  }, [auth.jwt, auth.user, dispatch]);

  // Effect cập nhật local state khi auth.user thay đổi
  useEffect(() => {
    setUser(auth.user);
    console.log("user manager: ", auth.user)
    
  }, [auth.user, auth.jwt]);

  useEffect(() => {
    // Nếu đã có user và user không phải admin, chuyển hướng
    if (auth.user && !auth.user.isAdmin) {
      router.push('/villas');
    }
  }, [auth.user, auth.jwt]);
  
  redirect("/manager/villas");

  return (
    <div className="flex-1 p-6 bg-red-500">
          <h2 className="text-3xl font-bold mb-4">Welcome, Admin</h2>
          <p className="text-gray-400">Select an option from the sidebar to manage orders or villas.</p>
    </div>
  );
}
