// Original: https://bl.ocks.org/mbostock/3883245
// Data from: https://www.knmi.nl/kennis-en-datacentrum/achtergrond/gehomogeniseerde-reeks-maandtemperaturen-de-bilt

// querySelector for the SVG
var svg = d3.select("svg"),
    // Append the svg to create element
    g = svg.append("g"),
    margin = 40,
    width = 1500,
    height = 500,
    parseTime = d3.timeParse('%Y%m%d');

// setAttribute for the svg
svg.attr('width', width + ( margin * 2 ) )
svg.attr('height', height + ( margin * 2 ) )

var x = d3.scaleTime()
    .rangeRound([0, width]),
    y = d3.scaleLinear()
    y = d3.scaleLinear().rangeRound( [height, 100] ),
    // Line to place where they belong
    line = d3.line() 
        // X as for the years
        .x(function(d) {x( d.date ); }) 
        // Y as for amount of temperature
        .y(function(d) {y( d.temp ); }); 

// Tell where the data has to be placed
var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temp); });

d3.csv("temperature.csv", function(d) {
    // Set parseTime of the date and temperature
    d.date = parseTime(d.date)
    d.temp = parseInt(d.temp)

return d

}, function(err, d) {

// Set the data on both Axis
// Domain determines the amount of scale the chart has to be
x.domain(d3.extent(d, function(d) { return d.date; }));
y.domain(d3.extent(d, function(d) { return d.temp; }));

g.append( 'g' ) // Maak nieuwe g (group) aan
    .attr( 'transform', `translate( ${margin}, ${height} )` )
    // X for the dates
    .call( d3.axisBottom( x ) )
    // Append text to tell what date it is
    .append( 'text' )
    .attr( 'fill', '#FFF' )
    .attr( 'y', 6 )
    .attr( 'dy', '0.71em' )
    .attr( 'text-anchor', 'end' )
    .text( 'Year' )
    .attr( 'transform', 'translate( 30, 15 )' )

// Create new group (g)
g.append( 'g' )
    .attr( 'transform', `translate( ${margin}, 0 )` )
    // Set temperature
    .call( d3.axisLeft( y ) )
    // Append text to tell what date it is
    .append( 'text' )
    .attr( 'fill', '#FFF' )
    .attr( 'y', 6 )
    .attr( 'dy', '0.71em' )
    .attr( 'text-anchor', 'end' )
    .text( 'Temperature' )
    .attr( 'transform', `rotate( -90 ) translate( ${-height + 80}, -40 )` )

// Line of the graph
g.append( 'path' )
    .datum( d )
    .attr( 'transform', `translate( ${margin}, 0 )` )
    .attr( 'fill', 'none' )
    .attr( 'stroke', '#BDBDBD' )
    .attr( 'stroke-linejoin', 'round' )
    .attr( 'stroke-linecap', 'round' )
    .attr( 'stroke-width', 1.75 )
    .attr( 'd', line )

    var t = svg.transition()
    .delay(750)
    .duration(6000)
    .ease('linear')
    .each('end', function() {
      d3.select('line.guide')
        .transition()
        .style('opacity', 0)
        .remove()
    });

  t.select('rect.curtain')
    .attr('width', 0);
  t.select('line.guide')
    .attr('transform', 'translate(' + width + ', 0)')

  d3.select("#show_guideline").on("change", function(e) {
    guideline.attr('stroke-width', this.checked ? 1 : 0);
    curtain.attr("opacity", this.checked ? 0.75 : 1);
  })

});
