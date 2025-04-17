import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllAds = async (req, res) =>{
    //Gaunam is uzklausos kategorijos id ir paieskos teksta
    const {categoryId, search} = req.query;

    try{

        const where = {};

        //Jeigu is uzklausos gavo kategorija. Ieskom kategorijos duomenu bazeje pagal id
        if(categoryId){
            where.categoryId = parseInt(categoryId)
            const category = await prisma.category.findUnique({
                where: {id: parseInt(categoryId)}
            })
        }

        if(search){
            where.OR = [
                {title: {contains: search}},
                {content: {contains: search}}
            ]
        }
       
        //Jeigu kategorija nebuvo siusta arba kategorijos nera db. Grazinam 404
        if(!categoryId){
            return res.status(404).json({
                message: "Kategorija nerasta"
            })
        }

        //Grazinam skelbimus pagal kategorijos 
        const ads = await prisma.ad.findMany({
            where,
            include:
                {
                    user:{
                        select: {
                            email: true
                        }
                    }
                }
                }
        );
        res.status(200).json({ads})
    }catch(err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
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
