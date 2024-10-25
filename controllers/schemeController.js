const Scheme = require('../models/Scheme');

// Adds a place in the DB
exports.addScheme = async (req, res) => {
  try {
    const adminData = req.admin;
   
    const {
      schemename,
      schemetype,
      beneficialgroup,
      addedPhotos,
      description,
      validatedate,
      documentrequired,
      maxapplicant,
      
      
    } = req.body;
   
    const scheme = await Scheme.create({
      owner: adminData.id,
      municipality:adminData.municipality.toLowerCase(),
      schemename,
      schemetype,
      photos: addedPhotos,
      description,
      beneficialgroup,
      validatedate,
      documentrequired,
      maxapplicant,
      
    });
    
    res.status(200).json({
      scheme,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

// Returns admin specific area scheme
// exports.adminAreaScheme = async (req, res) => {
//   try {
//     const Data = req.admin;
//     const id = Data.id;
//     res.status(200).json(await Scheme.find({ owner: id }));
//   } catch (err) {
//     res.status(500).json({
//       message: 'Internal serever error',
//     });
//   }
// };

// Updates a place
exports.updateScheme = async (req, res) => {
  try {
    const adminData = req.admin;
    const adminId = adminData.id;
    const {
      id,
      schemename,
      schemetype,
      beneficialgroup,
      addedPhotos,
      description,
      validatedate,
      documentrequired,
      maxapplicant,
    } = req.body;

    const scheme = await Scheme.findById(id);
    if (adminId === scheme.owner.toString()) {
      scheme.set({
        
        schemename,
        schemetype,
        photos: addedPhotos,
        description,
        beneficialgroup,
        validatedate,
        documentrequired,
        maxapplicant,
      });
      await scheme.save();
      res.status(200).json({
        message: 'Scheme updated!',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

// Returns all the places in DB
exports.getScheme = async (req, res) => {
  try {
    const municipality=req.user.municipality 
    if(!municipality){
      return res.status(400).json({
        success:false,
        message: 'login first',
      });
    }
    const scheme = await Scheme.find({municipality});
    res.status(200).json({
      scheme,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
//adminscheme
exports.getAdminScheme= async (req, res) => {
  try {
    const municipality=req.admin.municipality 
    
    const scheme = await Scheme.find({municipality});
    res.status(200).json({
      scheme,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
//delete a scheme
exports.deleteScheme = async (req,res) => {
  try{
  const {id}=req.params
  const scheme = await Scheme.findById(id)
  if (scheme) {
    const result = await Scheme.findByIdAndDelete(id)
    res.status(200).json({result,});
    
  }
  else{
    res.status(401).json({error:'error'});
  }
}
  catch(err){
    res.status(500).json({
      message: 'Internal serever error 1',
    });
  }
}
//get specific cateogric of scheme
exports.getSpecificTypeScheme = async (req, res) => {
  try {
    const {type}=req.params
    const municipality=req.query.municipality
    const scheme = await Scheme.find({municipality,schemetype:type});
    res.status(200).json({
      scheme,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Returns single place, based on passed place id
exports.singleScheme = async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = await Scheme.findById(id);
    if (!scheme) {
      return res.status(400).json({
        message: 'Scheme not found',
      });
    }
    res.status(200).json({
      scheme,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal serever error',
    });
  }
};

// Search Places in the DB
exports.usersearchScheme = async (req, res) => {
  try {
    const searchword = req.params.key;
    const userdata=req.user 
    if (searchword.length ===2 || searchword.length ===0) return res.status(200).json(await Scheme.find({municipality:userdata.municipality }))

    const searchMatches = await Scheme.find({ schemename: { $regex: searchword, $options: "i" },municipality:userdata.municipality })

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Internal serever error 1',
    });
  }
}
exports.adminsearchScheme = async (req, res) => {
  try {
    const searchword = req.params.key;
    const userdata=req.admin
    if (searchword.length ===1 || searchword.length ===0) return res.status(200).json(await Scheme.find({municipality:userdata.municipality }))

    const searchMatches = await Scheme.find({ schemename: { $regex: searchword, $options: "i" },municipality:userdata.municipality })

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Internal serever error 1',
    });
  }
}
