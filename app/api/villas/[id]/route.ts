import { deleteVilla, getVillaById, updateVilla } from "../../../../lib/repositories/villa-repo";
import { errorResponse, successResponse } from "../../../../lib/utils";
import { authenticateJWT } from "../../../../middleware/authentication";
import VillaModel from "../../../../models/VillaModel";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        const id = await params;
        const villaId = id.id;
        const villa = await getVillaById(villaId);
        if (!villa) {
            return new Response(JSON.stringify({ error: "Villa not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return successResponse('Get villa successfully', villa);

    } catch (error) {
        return errorResponse(`${error}`, 500)
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await authenticateJWT(request);
        if (!user.isAdmin) {
            return errorResponse('Bạn không có quyền truy cập tài nguyên này.', 403)
        }
        const id = await params;
        const villaId = id.id;
        const currentVilla = await getVillaById(villaId);
        const body = await request.json();

        if (!currentVilla) {
            return new Response(JSON.stringify({ error: "Villa not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (body.name !== currentVilla.name) {
            currentVilla.name = body.name;
        }

        if (body.location !== currentVilla.location) {
            currentVilla.location = body.location;
        }

        if (body.images !== currentVilla.images) {
            currentVilla.images = body.images;
        }

        if (body.comments !== currentVilla.comments) {
            currentVilla.comments = body.comments;
        }

        if (body.category !== currentVilla.category) {
            currentVilla.category = body.category;
        }

        if (body.description !== currentVilla.description) {
            currentVilla.description = body.description;
        }

        if (body.phoneNumbeupdatedr !== currentVilla.phoneNumber) {
            currentVilla.phoneNumber = body.phoneNumber;
        }

        if (body.email !== currentVilla.email) {
            currentVilla.email = body.email;
        }

        if (body.available !== currentVilla.available) {
            currentVilla.available = body.available;
        }

        if (body.numberOfRooms !== currentVilla.numberOfRooms) {
            currentVilla.numberOfRooms = body.numberOfRooms;
        }

        if (body.acreage !== currentVilla.acreage) {
            currentVilla.acreage = body.acreage;
        }

        if (body.pool !== currentVilla.pool) {
            currentVilla.pool = body.pool;
        }

        if (body.price !== currentVilla.price) {
            currentVilla.price = body.price;
        }

        if (body.maxPeople !== currentVilla.maxPeople) {
            currentVilla.maxPeople = body.maxPeople;
        }

        const updated = await updateVilla(villaId, currentVilla);
        return successResponse('Update villa successfully', currentVilla);

    } catch (error) {
        return errorResponse(`${error}`, 500)
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await authenticateJWT(request);
        if (!user.isAdmin) {
            return errorResponse('Bạn không có quyền truy cập tài nguyên này.', 403)
        }
        const id = await params;
        const villaId = id.id;
        const currentVilla = await getVillaById(villaId);
        if (!currentVilla) {
            return new Response(JSON.stringify({ error: "Villa not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const deleted = await deleteVilla(villaId);
        return successResponse('Delete villa successfully', deleted);
    } catch (error) {
        return errorResponse(`${error}`, 500)
    }
}