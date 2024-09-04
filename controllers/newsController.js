const News = require("../models/News");

exports.getUserNews= async (req, res) => {
    try {
      const userData = req.user;
     
      if (!userData) {
        return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
      }
  
      const news = await News.find({municipality: userData.municipality })
  
      res
        .status(200).json({ news, success: true })
  
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Internal server error',
        error: err,
      });
    }
  };

  exports.getAdminNews = async (req, res) => {
    try {
      const adminData = req.admin;
      if (!adminData) {
        return res
          .status(401)
          .json({ error: 'You are not authorized to access this page!' });
      }
  
      const news = await News.find({municipality: adminData.municipality }) 
      res
        .status(200).json({ news, success: true })
  
  
    } catch (err) {
      
      res.status(500).json({
        message: 'Internal server error',
        error: err,
      });
    }
  };

  

  exports.AddNews = async (req, res) => {
    try {
      const adminData = req.admin;
      console.log('admina',adminData.id)
      const {
        newstitle,
        newsdescription,

      } = req.body;
      
      const news = await News.create({
        owner: adminData.id,
        municipality:adminData.municipality.toLowerCase(),
        newstitle,
        newsdescription,
        
        
      });
      
      res.status(200).json({
        news,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        error: err,
      });
    }
  };

  exports.singleNews = async (req, res) => {
    try {
      const { id } = req.params;
      const news = await News.findById(id);
      if (!news) {
        return res.status(400).json({
          message: 'Scheme not found',
        });
      }
      res.status(200).json({
        news,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal serever error',
      });
    }
  };


  exports.updateNews = async (req, res) => {
    try {
      const adminData = req.admin;
      const adminId = adminData.id;
      const {
        id,
        newstitle,
        newsdescription,
      } = req.body;
  
      const news = await News.findById(id);
      if (adminId === news.owner.toString()) {
        news.set({
          
            newstitle,
            newsdescription,
        });
        await news.save();
        res.status(200).json({
          message: 'News updated!',
        });
      }
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        error: err,
      });
    }
  };
  exports.deleteNews = async (req,res) => {
    try{
        if(!req.admin){
            return res.status(401).json({error:'error'});
        }
    const {id}=req.params
    const news = await News.findById(id)
    if (news) {
      const result = await News.findByIdAndDelete(id)
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

  //all news
  exports.getAllNews = async (req, res) => {
    try {
      
      const news = await News.find() 
      res
        .status(200).json({ news, success: true })
  
  
    } catch (err) {
      
      res.status(500).json({
        message: 'Internal server error',
        error: err,
      });
    }
  };

  