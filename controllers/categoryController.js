import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategories = async (req, res)=>{
    const categories = await prisma.category.findMany();
    res.status(200).json(categories)
}

export const createCategory = async (req, res)=>{
    const {name} = req.body;
    const category = await prisma.category.create({data: {name}})
    res.status(201).json(category)
}