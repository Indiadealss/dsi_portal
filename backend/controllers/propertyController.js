const Property = require('../models/Property');

exports.createProperty = async (req , res) => {
    try{
        const {images,title,description,purpose,propertyType,status,area,bathroom,bedrooms,otherrooms,furnishing,balconies,floor, location,price,deposit,size,amenties,heighlights,coveredparking,uncoverdedparking,owners} = req.body;

        if(!images || !title || !description || !purpose || !propertyType || !status || !area || !furnishing || !otherrooms || !balconies || !floor ||  !bathroom ||  !bathroom || !bedrooms || !location || !price || !deposit || !size || !amenties || !heighlights || !owners){
            return res.status(400).json({error:'Data is missing'});
        }

        const newProperty = new Property({images,title,description,purpose,propertyType,status,area,bathroom,otherrooms,furnishing,balconies,floor, bedrooms,location,price,deposit,size,amenties,heighlights,coveredparking,uncoverdedparking,owners});
        const saveProperty = await newProperty.save();

        return res.status(201).json({message:'Property added Succesfully',data:saveProperty})

        
    } catch(err){
    console.log(err,'error catch');
    
    return res.send(500).json({err: "let's see"})

    }
}


exports.getProperty = async (req,res) => {
    try{
        const propertyData = await Property.find().populate('owners');
// const fullData = await Property.populate(propertyData, { path: 'owners' });
       
        return res.json(propertyData);
    } catch(err){
        console.log(err, 'Err');
        return res.status(500).json({err:'error catch'})
    }
}