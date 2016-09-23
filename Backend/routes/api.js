exports.alive = function(req, res, next) {
    res.send(
        {
            response:'api is alive, v0.0.1'
        }
    );
};
exports.hareExample = function(req,res,next){
    var Hare = require('./hare_module.js');
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

exports.add = function(req,res,next) {
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

exports.barChartExample = function(req,res,next){
    var Graphic = require('./graphic_module.js');
    var object = new Graphic();
    object.barChartExample();
    //res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.send(object.d3n.svgString());
};

exports.pieChartExample = function(req,res,next){
    var Graphic = require('./graphic_module.js');
    var object = new Graphic();
    object.pieChartExample();
    //res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.send(object.d3n.svgString());
};

exports.jsonExample = function(req,res,next){
    var Graphic = require('./graphic_module.js');
    var object = new Graphic();
    object.jsonExample();
    //res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.send(object.d3n.svgString());
};