var router = require('express').Router();

// const { api } = require('../modules');
var apiroute = require('./api')

router.use('/api', apiroute)

router.param('empresa', function (req, res, next, empresa) {
    console.log({empresa})
    if (empresa === 'api')
        empresa = ''
    req.empresa = empresa
    return next()
})

router.use('/:empresa/api', apiroute)

module.exports = router
