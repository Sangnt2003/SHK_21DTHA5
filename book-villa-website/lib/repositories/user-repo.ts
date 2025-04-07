import UserModel from "../../models/UserModel";
import { ObjectId } from 'mongodb';
import { getDb } from "../mongodb";
const collectionName = "users";

const db = await getDb();

export default async function createUser(request: typeof UserModel) {
    const result = await db.collection(collectionName).insertOne(request);
    return result;
}

export async function getAllUsers() {
    return await db.collection(collectionName).find().toArray();
}

export async function getUserById(id: string) {
    return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
}

export async function getUserByEmailFullOtion(email: string) {
    return await db.collection(collectionName).findOne({ email: email });
}


export async function getUserProfile(email: string) {
    return await db.collection(collectionName).findOne({ email: email }, { projection: { password: 0 } });
}


