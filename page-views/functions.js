$(document).ready(function(){
	dataviz();
	how_to_read();
	sidebar();
})

// main variables
// ----------------------------------------

var w = window;
var width = 900, ///w.outerWidth,
height = Math.round(width - (width / 3));

var margin = {top: 50, right: 50, bottom: 50, left: 50},
nomargin_w = width - (margin.left + margin.right),
nomargin_h = height - (margin.top + margin.bottom);

function dataviz(){
	container = "#page_views_container"
	data_source = "data/pageviews.json"

	var svg = d3.select(container)
		.append("svg")
		.attr("viewBox", "0 0 " + width + " " + height )

	var plot = svg.append("g")
		.attr("id", "d3_plot")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// parse data
	var parseTime = d3.timeParse("%Y/%m/%d")

	d3.json(data_source, function(error, data) {
		if (error) throw error;
		console.log(data)

		/*d_1 = d.pageviews[0].pageview
		console.log(d_1)

		d_1.forEach(function(d) {
			d.date = parseTime(d.date)
			d.count = +d.count;
		});

		var max_pv = d3.max(d_1, function(d) {
			return +d.count;
		});
		//console.log(max_pv)

		// range (output)
		var x = d3.scaleTime()
			.rangeRound([0, nomargin_w]);

		var y = d3.scaleLinear()
			.rangeRound([nomargin_h, 0]);

		//domain (original data)
		var max = d3.max(d_1, function(d) {
			return +d.count;
		});

		x.domain(d3.extent(d_1, function(d) {
			return d.date; 
		}));

		y.domain([0,max]);


		//line generator
		var line = d3.line()
			.curve(d3.curveStepBefore) // curveCatmullRom
			.x(function(d_1) {
				return x(d.date);
			})
			.y(function(d_1) { 
				return y(d.count);
			});
		
		plot.append("path")
			.data([d_1]) //  [d] datum(d) 
			.attr("class", "line") // area line
			.attr("d", line) // area line
			.attr("stroke","red")
			.attr("fill","transparent")
			.attr("stroke-width","1px")

		// axis
		plot.append("g")
			//.attr("transform","translate(0,0)")
			.call(d3.axisLeft(y))

		plot.append("g")
			//.attr("transform","translate(0,0)")
			.attr("transform", "translate(0," + (height - 100) + ")")
			.call(d3.axisBottom(x)
				//.ticks(d3.timeDay.every(30))
			)
		*/
	})
};

function how_to_read(){
	button = $("#how_to_read > p");
	box = $("#how_to_read .how_to_read");
	
	button.click(function(){
		//console.log("click")
		box.toggleClass("show");
	});	
};

function sidebar(){
	
}