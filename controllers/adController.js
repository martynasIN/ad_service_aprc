import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllAds = async (req, res) =>{
    const ads = await prisma.ad.findMany(
        {include:
            {
                category: true, 
                user:{
                    select: {
                        email: true
                    }
                }
            }
            }
    );
    res.status(200).json({ads})
}

export const createAd = async (req, res,)=>{
    const {title, content, categoryId} = req.body;
    try{
        const ad = await prisma.ad.create({
            data: {
                title,
                content,
                categoryId: parseInt(categoryId),
                userId: req.user.id
            }
        });
        res.status(201).json(ad);
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

export const updateAd = async (req, res) =>{
    const {id} = req.params;
    const ad = await prisma.ad.findUnique({where: {id: parseInt(id)}});

    if(!ad || ad.userId !== req.user.id){
        return res.status(403).json({message: "Nerastas skelbimas arba neesate sio skelbimo savininkas"})
    }

    const updated = await prisma.ad.update({
        where: {id: parseInt(id)},
        data: req.body
    });

    res.status(201).json(updated)
}

export const deleteAd = async (req, res) =>{
    const {id} = req.params;
    const ad = await prisma.ad.findUnique({where: {id: parseInt(id)}});

    if(!ad || ad.userId !== req.user.id){
        return res.status(403).json({message: "Nerastas skelbimas arba neesate sio skelbimo savininkas"})
    }

    await prisma.ad.delete({where: {id: parseInt(id)}})
    res.status(204).json({message: "Istrinta"})
}
