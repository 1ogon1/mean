module.exports = (response, e) =>{
    response.status(500).json({
        success: false,
        message: e.message ? e.message : e
    });
};