import { Suspense } from 'react';
import MyBooking from '@/components/MyBooking';
import Loading from './loadings';
export default function myOrders() {
  return (
    <Suspense fallback={<Loading />}>
      <MyBooking />
    </Suspense>
  );
}