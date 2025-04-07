import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: String,
    description: String,
    isVisible: Boolean,
},{
    timestamps: true
});

const CategoryModel = mongoose.models.categories || mongoose.model('categories', CategorySchema);
export default CategoryModel;