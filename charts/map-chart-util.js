const console = require('better-console');
const Latinize = require('../misc/latinize');
const latinize = Latinize.latinize;
const provinces = Latinize.getProvincias();

/** Map charts utilities. */
class MapChartUtil {
    /**
     *
     * @param cod_province
     * @return {*}
     */
    static calculateCode(cod_province) {
        return provinces[cod_province];
    }

    /**
     *
     * @param province
     * @param conjunto
     * @return {*}
     */
    static calculateMandates(province, conjunto) {
        let regEx = new RegExp("\\s", 'g');

        if (latinize(province.split('/')[0].toLowerCase().replace(regEx, "")) === 'araba-alava') {
            return parseInt(conjunto.alava);
        }

        let keys = Object.keys(conjunto);
        for (let c of keys) {
            if (latinize(province.split('/')[0].toLowerCase().replace(regEx, "")) === latinize(c.toLowerCase().replace(regEx, ""))) {
                return parseInt(conjunto[c]);
            }
        }

        return 2;
    }

    /**
     *
     * @param global
     * @return {{}}
     */
    static groupParties(global) {
        let aux = {};
        for (let i = 0, len = global.length; i < len; i++) {

            let keys = Object.keys(global[i].parties);

            for (let key of keys) {
                if (global[i].parties[key] === 0) {
                    delete global[i].parties[key];
                } else {
                    if (typeof aux[key] === 'undefined') {
                        aux[key] = 0;
                    }
                    aux[key] += global[i].parties[key];
                }
            }
        }
        return aux;
    }

    /**
     *
     * @param community
     * @return {*}
     */
    static calculateProvinces(community) {
        let provinces;
        if (community.includes('Andalucía')) {
            provinces = ['es-co', 'es-h', 'es-ma', 'es-al', 'es-ca', 'es-j', 'es-gr', 'es-se'];
        } else if (community.includes('Aragón')) {
            provinces = ['es-te', 'es-z', 'es-hu'];
        } else if (community.includes('Canarias')) {
            provinces = ['es-tf', 'es-gc'];
        } else if (community.includes('Cantabria')) {
            provinces = ['es-s'];
        } else if (community.includes('Castilla - La Mancha')) {
            provinces = ['es-cu', 'es-gu', 'es-ab', 'es-to', 'es-cr'];
        } else if (community.includes('Castilla y León')) {
            provinces = ['es-bu', 'es-sa', 'es-za', 'es-sg', 'es-av', 'es-so', 'es-va', 'es-le', 'es-p'];
        } else if (community.includes('Cataluña')) {
            provinces = ['es-t', 'es-l', 'es-gi', 'es-b'];
        } else if (community.includes('Ciudad de Ceuta')) {
            provinces = ['es-ce'];
        } else if (community.includes('Ciudad de Melilla')) {
            provinces = ['es-me'];
        } else if (community.includes('Comunidad de Madrid')) {
            provinces = ['es-m'];
        } else if (community.includes('Comunidad Foral de Navarra')) {
            provinces = ['es-na'];
        } else if (community.includes('Comunitat Valenciana')) {
            provinces = ['es-v', 'es-a', 'es-cs'];
        } else if (community.includes('Extremadura')) {
            provinces = ['es-cc', 'es-ba'];
        } else if (community.includes('Galicia')) {
            provinces = ['es-c', 'es-po', 'es-lu', 'es-or'];
        } else if (community.includes('Illes Balears')) {
            provinces = ['es-pm'];
        } else if (community.includes('La Rioja')) {
            provinces = ['es-lo'];
        } else if (community.includes('País Vasco')) {
            provinces = ['es-vi', 'es-ss', 'es-bi'];
        } else if (community.includes('Principado de Asturias')) {
            provinces = ['es-o'];
        } else if (community.includes('Región de Murcia')) {
            provinces = ['es-mu'];
        } else {
            console.error('Error with ' + community);
        }
        return provinces;
    }
}
module.exports = MapChartUtil;
