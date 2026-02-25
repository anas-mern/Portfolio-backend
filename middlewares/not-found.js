const NotFound = (req,res,next) => res.status(404).json({success:false,msg:"No Route Found"})

module.exports = NotFound