'use strict';
const D3Node = require('d3-node');
/**
 * Clase para manejar gráficas en el lado servidor apoyándose en la librería D3.
 * @returns {Graphic}
 * @constructor
 */
class Graphic{
    constructor() {

    }

    /**
     * Inicializa el título del trozo de código html que se montará
     * automáticamente.
     * @param title{String}
     */
    setMarkup(title){
        this.markup = '<div id="container"><h2>'+ title + '</h2><div id="'+new Date().getSeconds()+'"></div></div>';
    }

    /**
     * Método para inicializar el objeto interno de tipo D3Node.
     * @param options{Object}
     */
    setD3Node(options){
        this.d3n = new D3Node(options);
    }

    /**
     * Método para fijar los estilos css.
     * @param s{String}
     */
    setStyles(s){
        this.styles = s;
    }

    /**
     * Método para fijar ancho y alto del objeto.
     * @param w{number}
     * @param h{number}
     */
    setSizes(w,h){
        this.width = w;
        this.height = h;
    }
}
module.exports = Graphic;
