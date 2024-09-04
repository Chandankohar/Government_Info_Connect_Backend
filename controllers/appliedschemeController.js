const AppliedScheme = require("../models/AppliedScheme");


// Books a place
exports.applyOnScheme = async (req, res) => {
  try {
    const userData = req.user; 
    const { schemeid, schemename, schemetype, addedPhotos, username, usercitizenid, phone,address } =req.body;
    const userscheme=await AppliedScheme.find({ user:userData.id,scheme:schemeid,});
    if (userscheme.length==0){
    const appliedscheme = await AppliedScheme.create({
      user: userData.id,
      scheme:schemeid, 
      schemename, 
      schemetype, 
      document:addedPhotos, 
      username, 
      usercitizenid, 
      phone,
      address,
    });
    res.status(200).json({
      appliedscheme,
    });
    return 
    }
      res.status(201).json({result:true,});

  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

// Returns user specific bookings
exports.getUserAppliedScheme = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }

    const appliedscheme = await AppliedScheme.find({user: userData.id }).populate('scheme')

    res
      .status(200).json({ appliedscheme, success: true })


  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

//single user applied scheme
exports.SingleAppliedScheme = async (req, res) => {
  try {
    const id = req.params.id;
    const singleappliedscheme = await AppliedScheme.findById(id).populate('scheme')

    res
      .status(200).json({ singleappliedscheme, success: true })


  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};


//get the all user applied on specific scheme
exports.getAllUserSchemeApplication = async (req, res) => {
  try {
    const userData = req.admin;
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }

    const applieduser = await AppliedScheme.find({scheme:req.params.id }).populate('scheme')

    res
      .status(200).json({ applieduser, success: true })


  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

//for approval
exports.statusOfAppliedScheme = async (req, res) => {
  try {
    const userData = req.admin;
    const {status,rejectreason}=req.body
    const id=req.params.id
    
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }
   await AppliedScheme.findByIdAndUpdate({_id:id},{status:status,rejectreason:rejectreason}).populate('scheme')
    res
      .status(200).json({ success: true })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

//get the users scheme by admin
exports.getUserScheme = async (req, res) => {
  try {
    const id=req.params.id
    const userData = req.admin;
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }
    
    const appliedscheme = await AppliedScheme.find({user: id}).populate('scheme')

    res
      .status(200).json({ appliedscheme, success: true })


  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getSearchUserAppliedScheme = async (req, res) => {
  try {
    
    const searchword = req.params.key;
  const id=req.params.id
    if (searchword.length ===1 || searchword.length ===0) return res.status(200).json(await AppliedScheme.find({scheme:id }))

    const searchMatches = await AppliedScheme.find({ usercitizenid: { $regex: searchword, $options: "i" },scheme:id })

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Internal serever error 1',
    });
  }
}
//delete appliedscheme of user by itself
exports.deleteUserAppliedScheme = async (req,res) => {
  try{
    const userinfo=req.user
   
  const {id}=req.params
  const appliedscheme = await AppliedScheme.find({id,user:userinfo._id})
   
  if (appliedscheme ) {
    const result = await AppliedScheme.findByIdAndDelete(id)
    
    res.status(200).json({result,message:'Successfully delete this applied scheme'});
    return
    
  }
  else{
    res.status(401).json({message:'cant able to delete this applied scheme please check authorization'});
  }
}
  catch(err){
   
    res.status(500).json({
      message: 'Internal serever error 1',
    });
  }
}
