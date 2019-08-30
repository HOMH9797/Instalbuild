const express = require('express');
const router = express.Router();

const Construccion = require('../models/construccion');

router.get('/', async (req,res)=>{
    const construccion = await Construccion.find();
    res.json(construccion);
})

router.get('/:id', async(req,res)=>{
    const construccion = await Construccion.findById(req.params.id);
    res.json(construccion);
})

router.post('/', async(req,res)=>{
    let pricetotalMt = 0 
    // pricetotalMt = req.body.areaMt * req.body.priceMt
    const {typeApartment, apartmentNumber, areaMt, priceMt} = req.body;
    pricetotalMt = areaMt * priceMt;
    const construccion = new Construccion({typeApartment, apartmentNumber, areaMt, priceMt, pricetotalMt});
    await construccion.save();
    res.json({Status: `Registro Ok`});
}) 

router.put('/:id', async(req,res)=>{
    let pricetotalMt = 0 
    // pricetotalMt = req.body.areaMt * req.body.priceMt
    const {typeApartment, apartmentNumber, areaMt, priceMt} = req.body;
    pricetotalMt = areaMt * priceMt;
    const newConstruccion = {typeApartment, apartmentNumber, areaMt, priceMt,pricetotalMt};

    await Construccion.findByIdAndUpdate(req.params.id, newConstruccion);
    res.json({Status: 'Construccion actualizada'});
})

router.delete('/:id', async(req,res)=>{
    await Construccion.findByIdAndRemove(req.params.id);
    res.json({Status: 'Construccion eliminada'});
})

module.exports = router; 