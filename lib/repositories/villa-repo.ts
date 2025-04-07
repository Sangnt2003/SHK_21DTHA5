import { ObjectId } from 'mongodb';
import { getDb } from "../mongodb";
import VillaModel from "../../models/VillaModel";

const collectionName = "villas";

const db = await getDb();

export default async function getAllVillas() {
  return await db.collection(collectionName).find().toArray();
}

export async function getVillaById(id: string) {
  return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
}

export async function createVilla(villa: typeof VillaModel) {
  const result = await db.collection(collectionName).insertOne(villa);
  return result;
}

export async function updateVilla(id: string, villa: any) {
  const result = await db.collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: villa });
  return result;
}

export async function deleteVilla(id: string) {
  const result = await db.collection(collectionName)
    .deleteOne({ _id: new ObjectId(id) });
  return result;
}

export async function getVillasByCategory(categoryId: string) {
  return await db.collection(collectionName)
    .find({ category: { $regex: categoryId } }).toArray();
}


export async function getVillasByLocation(location: string) {
  return await db.collection(collectionName)
    .find({ location: { $regex: location, $options: 'i' } }).toArray();
}

export async function getVillasByPriceRange(minPrice: number, maxPrice: number) {
  return await db.collection(collectionName)
    .find({ price: { $gte: minPrice, $lte: maxPrice } }).toArray();
}

export async function getVillasByAvailability(available: boolean) {
  return await db.collection(collectionName)
    .find({ available: available }).toArray();
}

export async function getVillasByMaxPeople(maxPeople: number) {
  return await db.collection(collectionName)
    .find({ maxPeople: { $gte: maxPeople } }).toArray();
}

export async function getVillasByAcreage(minAcreage: number, maxAcreage: number) {
  return await db.collection(collectionName)
    .find({ acreage: { $gte: minAcreage, $lte: maxAcreage } }).toArray();
}

export async function getVillasByPool(pool: boolean) {
  return await db.collection(collectionName)
    .find({ pool: pool }).toArray();
}

export async function getVillasByNumberOfRooms(minRooms: number, maxRooms: number) {
  return await db.collection(collectionName)
    .find({ numberOfRooms: { $gte: minRooms, $lte: maxRooms } }).toArray();
}



