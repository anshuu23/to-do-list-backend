function handelBodyData(req, res, next){
    try{
        JSON.parse(JSON.stringify(req.body)); 
    }
    catch(err){
        return res.status(400).json({ error: 'data is not of valid type' });
    }

    next()
}

module.exports = {handelBodyData}