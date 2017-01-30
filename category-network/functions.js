$(document).ready(function(){
	//get_data();
	dataviz();
	how_to_read();
	sidebar("desc_order");
	//download();
})

// main variables
// ----------------------------------------

var w = window;
var width = 900, ///w.outerWidth,
height = Math.round(width - (width / 3));

var margin = {top: 50, right: 50, bottom: 50, left: 50},
nomargin_w = width - (margin.left + margin.right),
nomargin_h = height - (margin.top + margin.bottom);

// get data
// ----------------------------------------

function get_data(){
	data_source = "../assets/scripts/credentials.json";
	var url = "http://cassandra.synapta.io/api/ETH/";
	var user = "";
	var pass = "";
	var api = "category"

	$.getJSON(data_source, function(data) {
		//console.log(data)
		var user = data.user;
		var pass = data.pass;
	})

	$.getJSON({
		type: "GET",
		url: url + api,
		dataType: "JSONP",
		jsonpCallback: "callback",
		data: {
			username: user, 
			password: pass
		},
		header:"Access-Control-Allow-Origin: *",
		async: true,
		success: function (data){
			var a = jQuery.parseJSON(data)
			//JSON.parse(" " + data + ""); 
			//data //parseJSON(data)
			//var newData = data;
			//a = JSON.stringify(data); // parse
			console.log(data[0])
		},
		error: function(x){
			console.log(x)
		}
	})
	console.log(7)
}

// dataviz
// ----------------------------------------

function dataviz(){

	var container = "#category_network_container";
	var data_source = "data/category_network.json"; 
	
	var width = $("#category_network_container").width(), //1000, //document.getElementById("#dataviz").width,
		height = $("#category_network_container").height(); //height = 1000; 
		//console.log(width)

	var svg = d3.select(container)
		.append("svg")
		//.attr("width",width)
		//.attr("height",height)
		.attr("viewBox", "0 0 " + width + " " + height)

	var plot = svg.append("g")
		.attr("id", "d3_plot")
		//.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var parseTime = d3.timeParse("%Y/%m/%d");
	var color = d3.scaleOrdinal(d3.schemeCategory20);
	
	d3.json(data_source, function(error, data) {
		if (error) throw error;

		var files = [];
  		data.nodes.forEach(function(node) {
    		files.push(
    			node.files
    		);
    	})
    	
    	// replace "_" with " "
    	$.each(data.nodes, function(i,v) {
    		v.id = v.id//.replace(/_/g," ")
    		//console.log(id)
    		//return id
    	})

    	var max_file = d3.max(files),
    		node_lenght = data.nodes.length,
    		circle_size = ((width / (max_file * 2)) / (node_lenght * 0.5) );
    		//console.log(circle_size)

		var simulation = d3.forceSimulation()
			.force("link", d3.forceLink().id(function(d) { 
					return d.id; 
				})
				.distance(function(d,i){
					return ( (max_file * circle_size) + 20)
				})
				.strength(0.5)
			)
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(width / 2, height / 2))
			.force("collide",d3.forceCollide( (circle_size * max_file) + 5 ))
		
		var edges = plot.append("g")
			.attr("class", "edges")
			.selectAll("line")
			.data(data.edges)
			.enter()
			.append("line")
			.attr("class","line")

		var nodes = plot.append("g")
	  		.attr("class", "nodes")
			.selectAll(".nodes")
			.data(data.nodes)
			.enter()
			.append("g")
			.attr("class",function(d,i){
				return d.id + " node" //.replace(/_/g," ")
			})  	
	  		.call(d3.drag()
			  	.on("start", dragstarted)
			  	.on("drag", dragged)
			  	.on("end", dragended)
			)

	  	var node_circle = nodes.append("circle")
			.attr("r", function(d,i){
				if (d.files == 0 || d.files == undefined ){
					return 10
				}
				else {
					if (d.files < 200) {
						return (d.files * circle_size) * 5
					}
					else {
						return (d.files  * circle_size) * 1.5
					}
				}	
			})
			.attr("fill", function(d) { 
				return  color(d.group); 
			})
			.attr("class", function (d,i){
				return "circle " + d.files
			})

	  	var label = nodes.append("text")
	  		.attr("class", "labels")
	  		.text(function(d) { 
	  			return d.id;
	  		})
	  		.attr("text-anchor", "middle") // left

		simulation
			.nodes(data.nodes)
			.on("tick", ticked);

		simulation.force("link")
			.links(data.edges);

		function ticked() {
			var x = 1
			edges
				.attr("x1", function(d) { return d.source.x * x; }) 
				.attr("y1", function(d) { return d.source.y * x; }) 
				.attr("x2", function(d) { return d.target.x * x; })
				.attr("y2", function(d) { return d.target.y * x; });

			nodes
				.attr("transform", function(d,i){
					return "translate(" + (d.x * x) + "," + (d.y* x) + ")"
				})

			var q = d3.quadtree(nodes),
	  			i = 0,
	  			n = nodes.length;
		}

		function dragstarted(d) {
			if (!d3.event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(d) {
		  	d.fx = d3.event.x;
		  	d.fy = d3.event.y;
		}

		function dragended(d) {
		  	if (!d3.event.active) simulation.alphaTarget(0);
		  	d.fx = null;
		  	d.fy = null;
		}
	})
}

function how_to_read(){
	box = $("#how_to_read .how_to_read")
	button = $("#how_to_read > p")
	
	button.click(function(){
		//console.log("click")
		box.toggleClass("show");
	});
 	
}

function sorting_sidebar(){
	$("#asc_order").on("click", function(){
		//console.log("asc_order");
		var button = $("#asc_order");

		if ($("#asc_order").hasClass("underline") ) {
			$("#asc_order").removeClass("underline");
			$("#desc_order").toggleClass("underline");
			$(".list > li").removeClass("selected_list_item");
			$("#category_network_container").find(".circle").removeClass("selected_circle");
			//console.log("già selezionato")
		}
		else{
			//console.log("non selezionato")
		}
		sidebar("asc_order")
	})

	$("#desc_order").on("click", function(){
		//console.log("asc_order");
		var button = $("#asc_order");

		if ($("#desc_order").hasClass("underline") ) {
			$("#desc_order").removeClass("underline");
			$("#asc_order").toggleClass("underline");
			$(".list > li").removeClass("selected_list_item");
			$("#category_network_container").find(".circle").removeClass("selected_circle");
			//console.log("già selezionato")
		}
		else{
			//console.log("non selezionato")
		}
		sidebar("desc_order")
	})
}

function sidebar(order) {

	var template_source = "tpl/category-network.tpl";
	var data_source = "data/category_network.json";
	var target = "#sidebar";

	Handlebars.registerHelper('replace', function(str, a, b) {
  		if (str && typeof str === 'string') {
			if (!a || typeof a !== 'string') return str;
			if (!b || typeof b !== 'string') b = '';
			return str.split(a).join(b);
  		}
	});

	function highlight(){

		// from Sidebar to Dataviz
		$(".list").on("click", "li" , function(){
			element = $(this).find(".id").attr("id"); //.text() //.toString();
			//console.log(element);

			// reset Sidebar - Dataviz
			$("#sidebar .id").removeClass("selected_list_item"); // .list > li
			$("#category_network_container").find(".circle").removeClass("selected_circle");
			
			// highlight Dataviz
			node_selected = $("#category_network_container").find("." + element).children(".circle")
			node_selected.toggleClass("selected_circle");

			// highlight Sidebar
			selected = $(this).find(".id");
			selected.toggleClass("selected_list_item");
			//console.log("." + element)
		});

		// from Dataviz to Graph 
		$(".node").on("click", function(){
			e = $(this).attr("class");
			element = e.split(" ",1)//.toString();
			//console.log(element)
			
			// reset Sidebar - Dataviz
			$("#sidebar .id").removeClass("selected_list_item");
			$("#category_network_container").find(".circle").removeClass("selected_circle");
			
			// highlight Dataviz
			node_selected = $(this).children(".circle")
			node_selected.toggleClass("selected_circle");
			//console.log(element)
			
			// highlight Sidebar
			selected = $("#sidebar").find("#" + element)
			selected.toggleClass("selected_list_item");
			//console.log(selected)
		})
	}

	$.get( template_source , function(tpl) {
		$.getJSON( data_source , function(d) {

			if (order == "desc_order"){
				d.nodes.sort( function(a,b) { 
					return b.files - a.files; 
				});				
			}
			else if (order == "asc_order") {
				d.nodes.sort( function(a,b) { 
					return a.files - b.files; 
				});					
			}
			//console.log(d);

			/*
			$.each(d.nodes, function(i,v) {
	    		v.id = v.id.replace(/_/g," ")
    		})
			//console.log(d);
			*/

			var template = Handlebars.compile(tpl); 
			$(target).html(template(d));

			sorting_sidebar();
			highlight();
			
		});
	});
}
/*
function download(){
	$("#download").click(function () {
		
		var dataviz = $("#category_network_container").html();
		download(dataviz, "category_network.svg", "text/plain");
		console.log(dataviz);
		
		var getBlob = function() {
			return window.Blob || window.WebKitBlob || window.MozBlob;
		}

		var BB = getBlob();
		var dataviz = $("#category_network_container").html();
		filename = "category_network.svg"

		download(dataviz);
		console.log("test")
	})

		//var isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
}
*/

/*
function download(){
	$("#download").click(function () {
		
		var dataviz = $("#category_network_container").html();
		download(dataviz, "category_network.svg", "text/plain");
		console.log(dataviz);
		
		var getBlob = function() {
			return window.Blob || window.WebKitBlob || window.MozBlob;
		}

		var BB = getBlob();
		var dataviz = $("#category_network_container").html();
		filename = "category_network.svg"

		download(dataviz);
		console.log("test")

		//var isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);


		/*if (isSafari) {
			var img = "data:image/svg+xml;utf8," + html;
			var newWindow = window.open(img, 'download');
		}
		else {
			var blob = new BB( 
				dataviz, { type: "data:image/svg+xml" }
			);
			saveAs(blob, (element.find('input').val() || element.find('input').attr("placeholder")) + ".svg")
		}

	});
}*/
