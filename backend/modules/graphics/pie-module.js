const Graphic = require('./graphic-module'),
    fs = require('fs'),
    d3 = require('d3');

/**
 * Clase que hereda de Graphic, usada para trabajar con gráficas
 * tipo tarta(pie en inglés).
 * @returns {Pie}
 * @constructor
 */
class Pie extends Graphic{
    constructor(){
        super();
    }

    setSizes(w,h,r){
        super.setSizes(w,h);
        this.radius = Math.min(w,h) / 2;
    }

    /**
     * Genera una gráfica de tipo tarta a partir de un fichero tipo csv
     */
    pieChartExample(path){
        if(!path) path = './routes/graphics/graphic_examples/piechart.csv';
        const csvString = fs.readFileSync(path ,'UTF-8').toString();
        this.setMarkup('Pie Chart');
        this.setStyles(
            '.arc text {font: 10px sans-serif;text-anchor: middle;}' +
            ' .arc path {stroke: #fff;}'
        );

        this.setD3Node({
            selector:'#chart',
            svgStyles:this.styles,
            container:this.markup
        });

        this.setSizes(960,500);

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var arc = d3.svg.arc()
            .outerRadius(this.radius - 10)
            .innerRadius(0);

        var labelArc = d3.svg.arc()
            .outerRadius(this.radius - 40)
            .innerRadius(this.radius - 40);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {
                return d.population;
            });

        this.svg = this.d3n.createSVG()
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

        var data = d3.csv.parse(csvString);

        var g = this.svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function (d) {
                return color(d.data.age);
            });

        g.append("text")
            .attr("transform", function (d) {
                return "translate(" + labelArc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .text(function (d) {
                return d.data.age;
            });
    }
}
module.exports = Pie;
