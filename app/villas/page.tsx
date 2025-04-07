import { Suspense } from "react";
import Loadings from "./loadings";


// import "/public/css/global-tailwindcss.css"; // for global tailwindcss
import 'bootstrap/dist/css/bootstrap.css' // for bootstrap
import VillaFilter from "@/components/FilterVilla";


export default async function villas() {
  
  return (
    <div className="bg-sky-50 bg-white">
      <main>
        <Suspense fallback={<Loadings />}>
          <VillaFilter />
        </Suspense>
      </main>
    </div>
  );
}
