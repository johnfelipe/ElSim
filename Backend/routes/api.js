/**
 *
 * @param req
 * @param res
 */
exports.alive = function(req, res) {
    res.send(
        {
            response:'api is alive, v0.0.1'
        }
    );
};
/**
 *
 * @param req
 * @param res
 */
exports.hareExample = function(req,res){
    var Hare = require('./modules/hare_module.js');
    var object = new Hare();
    object.initExample();
    object.compute();
    res.send(
        {
            response:'/api/hare/example calculated',
            result: object.partidos,
            cociente: object.cociente,
            total: object.totalVotos()
        });
};

/**
 *
 * @param req
 * @param res
 */
exports.add = function(req,res) {
    if(req.method === 'POST') {
        if (req.body.num1 === undefined || req.body.num2 === undefined) {
            res.send(
                {
                    response: 'Operation a + b',
                    result: 'Error, parameters num1 and/or num2 are not found'
                }
            );
        }
        var n1 = req.body.num1;
        var n2 = req.body.num2;
        res.send(
            {
                response: 'Operation a + b',
                result: n1 + n2
            }
        );
    } else {
        res.send(
            {
                response: 'This method must be called with POST'
            }
        );
    }
};

/**
 * Devuelve una gráfica de barras en SVG
 * @param req
 * @param res
 */
exports.barChartExample = function(req,res){
    var Graphic = require('./modules/graphic_module.js');
    var object = new Graphic();
    object.barChartExample();
    //res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.send(object.d3n.svgString());
};

/**
 * Devuelve un JSON con el raw del svg de la gráfica
 * @param req
 * @param res
 */
exports.rawBarChartExample = function(req,res){
    var Graphic = require('./modules/graphic_module.js');
    var object = new Graphic();
    object.barChartExample();
    //res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.send({raw: object.d3n.svgString()});
};

/**
 * Devuelve una gráfica de tarta en SVG
 * @param req
 * @param res
 */
exports.pieChartExample = function(req,res){
    var Graphic = require('./modules/graphic_module.js');
    var object = new Graphic();
    object.pieChartExample();
    //res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.send(object.d3n.svgString());
};

/**
 * Devuelve un mapa/gráfica de EEUU en SVG
 * @param req
 * @param res
 */
exports.jsonExample = function(req,res){
    var Graphic = require('./modules/graphic_module.js');
    var object = new Graphic();
    object.jsonExample();
    //res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.send(object.d3n.svgString());
};