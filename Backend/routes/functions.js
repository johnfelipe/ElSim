/**
 * Ruta para el index de la web.
 * @param req
 * @param res
 * @param next
 */
exports.index = function(req, res, next) {
	res.render('index',{
		title: 'Ohh!'
	});
};