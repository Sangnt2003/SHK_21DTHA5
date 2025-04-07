import Link from "next/link";
import getAllVillas from "../lib/repositories/villa-repo";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default async function VillaList() {
    const dispatch = useAppDispatch();
    const {villas} = useAppSelector((state) => state);

    return (
      <div>
        <h2>Villa List</h2>
        <ul>
          {villas?.villas.map((villa: any) => (
            <Link key={`${villa._id}`} href={`/product/${villa._id}`}>{villa.name}</Link>
          ))}
        </ul>
      </div>
    );
  }