import { Suspense } from 'react';
import PaymentSuccess from "@/components/PaymentSuccess";
import Loading from './loading';
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentSuccess />
    </Suspense>
  );
}