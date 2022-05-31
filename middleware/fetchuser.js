const jwt = require('jsonwebtoken');
const JWT_DECRET = "mdshoaibakhtar1234";

const fetchuser=(req,res,next)=>{

    //get the user from the jwt tokem and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"plz authenticate using valid token"});
    }

  try {
    const data = jwt.verify(token,JWT_DECRET);
    req.user = data.user ;
    next();
  } catch (error) {
    res.status(401).send({error:"plz authenticate using valid token"});
  }
}

module.exports = fetchuser;