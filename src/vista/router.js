const electron = require('electron');
const router = electron.router;

router.get ('/', (req, res)=>{
    res.send('');
})

module.exports = router;