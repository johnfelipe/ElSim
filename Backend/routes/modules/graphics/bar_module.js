var Graphic = require('./graphic_module');
class BarChart extends Graphic{
    /**
     * Genera una gráfica de tipo barras a partir de un fichero tsv
     */
    barChartExample(){

        const tsvString = fs.readFileSync('./routes/graphics/graphic_examples/barchart.tsv').toString();
        this.styles = '.bar{fill: steelblue;} .bar:hover{fill: brown;} .axis{font: 10px sans-serif;} .axis path,.axis line{fill: none;stroke: #000;shape-rendering: crispEdges;} .x.axis path{display: none;}';
        const markup = '<div id="container"><h2>Bar Chart</h2><div id="chart"></div></div>';
        var options = {selector:'#chart', svgStyles:this.styles, container:markup};
        this.d3n = new D3Node(options);
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "");

        this.svg = this.d3n.createSVG()
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = d3.tsv.parse(tsvString);

        x.domain(data.map(function (d) {
            return d.partido;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.total;
        })]);

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        this.svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Escaños");

        this.svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.partido);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                return y(d.total);
            })
            .attr("height", function (d) {
                return height - y(d.total);
            });
    }
}
module.exports = BarChart;