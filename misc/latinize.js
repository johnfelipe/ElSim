const latinMap = require('./../misc/latinize-map');

/** Utility to handle with typical spanish grammar problems. */
class Latinize {
    /**
     *
     * @return {Array}
     */
    static getProvincias() {
        return [
            'es-NULL', 'es-vi', 'es-ab', 'es-a', 'es-al', 'es-av', 'es-ba', 'es-pm',
            'es-b', 'es-bu', 'es-cc', 'es-ca', 'es-cs', 'es-cr', 'es-co', 'es-c',
            'es-cu', 'es-gi', 'es-gr', 'es-gu', 'es-ss', 'es-h', 'es-hu', 'es-j',
            'es-le', 'es-l', 'es-lo', 'es-lu', 'es-m', 'es-ma', 'es-mu', 'es-na',
            'es-or', 'es-o', 'es-p', 'es-gc', 'es-po', 'es-sa', 'es-tf', 'es-s',
            'es-sg', 'es-se', 'es-so', 'es-t', 'es-te', 'es-to', 'es-v', 'es-va',
            'es-bi', 'es-za', 'es-z', 'es-ce', 'es-ml'
        ];
    }

    /**
     *
     * @param s
     * @return {string|*|void|ILocationService|XML}
     */
    static latinize(s) {
        let latinise       = {};
        latinise.latin_map = latinMap;
        let regEx          = new RegExp(/[^A-Za-z0-9\[\] ]/g);

        return s.replace(regEx, (a) => latinise.latin_map[a] || a);
    }

}
module.exports = Latinize;
