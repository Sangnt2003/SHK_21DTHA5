import getAllVillas, { createVilla } from "../../../lib/repositories/villa-repo";
import { errorResponse, successResponse } from "../../../lib/utils";
import { authenticateJWT } from "../../../middleware/authentication";
import VillaModel from "../../../models/VillaModel";

export async function GET(request: Request) {

  const villas = await getAllVillas();
  return successResponse("get all villas", villas)
  // return new Response(JSON.stringify(villas), {
  //   status: 200,
  //   headers: { 'Content-Type': 'application/json' }
  // });
}

export async function POST(request: Request) {
  try {
    const user = await authenticateJWT(request);
    if (!user.isAdmin) {
      return errorResponse('Bạn không có quyền truy cập tài nguyên này.', 403)
    }

    const data = await request.json();

    const newVilla = new VillaModel({
      name: data.name,
      location: data.location,
      images: data.images,
      comments: data.comments,
      category: data.category,
      description: data.description,
      phoneNumber: data.phoneNumber,
      email: data.email,
      available: data.available,
      numberOfRooms: data.numberOfRooms,
      acreage: data.acreage,
      pool: data.pool,
      price: data.price,
      maxPeople: data.maxPeople,
    });
    const createdVilla = await createVilla(newVilla);
    return successResponse('Villa created successfully', newVilla);
    
  } catch (error) {
    console.error("Error creating villa:", error);
    return errorResponse(`${error}`, 500)
  }
}

