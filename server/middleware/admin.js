let admin = (req,res,next) => {
  if(req.user.role === 0){
    return res.send('Action not authorised!')
  }
  next();
}

module.exports = { admin }