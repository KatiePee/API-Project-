const express = require('express');
const router = express.Router();

//maybe it needs function declaration....?
router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF_TOKEN", csrfToken);
    res.status(200).json({'XSRF_Token': csrfToken})
});
module.exports = router; 
//