var express = require('express');

var router = express.Router();

const Categorie=require("../models/categorie");

// ****************afficher la liste des categories.*****************

router.get('/', async (req, res )=> {
    try {
    const cat = await Categorie.find();
    res.status(200).json(cat);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    

// ******************créer un nouvelle catégorie******************
router.post('/', async (req, res) => {
    const { nomcategorie, imagecategorie} = req.body;
    const newCategorie = new Categorie({nomcategorie:nomcategorie,imagecategorie:imagecategorie})
try {
    await newCategorie.save();   // await: permet d'inserer la new catégorie
         res.status(200).json(newCategorie );   //verifier si la catégorie déjà enregister ou non
    } 
    catch (error) {     // ou cas ou la catégorie n'enregistre rien, le systeme s'affiche un message d'erruer
        res.status(404).json({ message: error.message });
                }
});

//************************** * chercher une catégorie****************

    router.get('/:categorieId',async(req, res)=>{
        try {
        const cat = await Categorie.findById(req.params.categorieId);
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });
    

   
    // *****************modifier une catégorie*****************

    router.put('/:categorieId', async (req, res)=> {
            const { nomcategorie, imagecategorie} = req.body;
            const id = req.params.categorieId;
            try {
                const cat = await Categorie.findByIdAndUpdate(req.params.categorieId,
                    {$set: req.body
                    });
            res.json(cat);} 
            catch (error) {
            res.status(404).json({ message: error.message });
            }
            });

 // ****************Supprimer une catégorie*****************
 
 router.delete('/:categorieId', async (req, res)=> {
    const id = req.params.categorieId;
    await Categorie.findByIdAndDelete(id);
    res.json({ message: "categorie deleted successfully." });
    });


module.exports = router;
