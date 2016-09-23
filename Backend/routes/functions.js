/**
 * Ruta para el index de la web.
 * @param req
 * @param res
 */
exports.index = function(req, res) {
	res.render('index',{
		title: 'Ohh!'
	});
};