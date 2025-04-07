import { error } from "console";
import { createCategory, getAllCategories } from "../../../lib/repositories/category-repo";
import { authenticateJWT } from "../../../middleware/authentication";
import CategoryModel from "../../../models/CategoryModel";
import { errorResponse, successResponse } from "../../../lib/utils";

export async function GET(request: Request) {
  try{
    const categories = await getAllCategories();
    return successResponse("get all categories", categories)
  }catch(error){
    return errorResponse(`${error}`, 500)
  }
}

export async function POST(request: Request) {
    try {
        const user = await authenticateJWT(request);
        if (!user.isAdmin) {
            return errorResponse('Bạn không có quyền truy cập tài nguyên này.', 403)
        }

        const data = await request.json();

        const newCategory = new CategoryModel({
            name: data.name,
            description: data.description,
            isVisible: data.isVisible,
        });

        const createdCategory = await createCategory(newCategory);
        return successResponse('Category created successfully', newCategory);
    }catch (error) {
        return errorResponse(`Failed to create category: ${error}`, 500)
    }
}