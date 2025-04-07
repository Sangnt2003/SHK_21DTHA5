import { getVillasByCategory } from "../../../../../lib/repositories/villa-repo";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = await params;
    const cateId = id.id;
    const villas = await getVillasByCategory(cateId);
    if (!villas) {
        return new Response(JSON.stringify({ error: "Villas not found" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return new Response(JSON.stringify(villas), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}