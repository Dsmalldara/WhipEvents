'use server'
 import { CreateCategoryParams } from "@/constants/types";
import { connectToDatabase } from "@/lib/database";
import Category from "@/lib/database/models/categoryModel";
import { handleError } from "@/lib/utils";

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
  try {
    await connectToDatabase();
    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error)
    console.log(error)
  }
}

export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error)
    // console.log(error)
  }
}
export const getCategoriesByName = async (category:string)=>{
  try {
    connectToDatabase()
    const categories = await Category.find({name:category})
    return JSON.parse(JSON.stringify(categories))
  } catch (error) {
    handleError(error)
  }
}