import { ObjectId } from 'mongodb';
import { getDb } from "../mongodb";
import CategoryModel from '../../models/CategoryModel';
const collectionName = "categories";

const db = await getDb();

export async function getAllCategories() {
  return await db.collection(collectionName).find().toArray();
}

export async function getCategoryById(id: string) {
  return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
}

export async function createCategory(category: typeof CategoryModel) {
  const result = await db.collection(collectionName).insertOne(category);
  return result;
}

export async function updateCategory(id: string, category: typeof CategoryModel) {
  const result = await db.collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: category });
  return result;
}

export async function deleteCategory(id: string) {
  const result = await db.collection(collectionName)
    .deleteOne({ _id: new ObjectId(id) });
  return result;
}

export async function getCategoriesByVisibility(isVisible: boolean) {
  return await db.collection(collectionName)
    .find({ isVisible: isVisible }).toArray();
}

export async function getCategoriesByName(name: string) {
  return await db.collection(collectionName)
    .find({ name: { $regex: name, $options: 'i' } }).toArray();
}

