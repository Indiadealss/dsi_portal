const Owner = require('../models/Owners');

exports.createOwner = async (req,res) => {
    try{
        const {name,mobile_no,address,owner_type} = req.body;

        if(!name || !mobile_no || !address || !owner_type){
            return res.status(400).json({error:'Data is missing'});
        }

        const newOwner = new Owner({name,mobile_no,address,owner_type});
        const saveOwner = await newOwner.save();

        return res.status(201).json({message:'Owner created successfully', data:saveOwner});
    } catch(err){
    console.log(err,'error catch');
    
    return res.send(500).json({err: "let's see"})
}
};