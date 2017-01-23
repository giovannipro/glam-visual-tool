$(document).ready(function(){
	dataviz();
	how_to_read();
	sidebar();
})

// dataviz
// ----------------------------------------

function dataviz(){
	container = "#user_contributions_container";
	data_source = "data/user_contributions.json"; // user_contributions user_contributions_api
	
	//var w = window;
	var width = Math.round( $("#user_contributions_container").outerWidth() ),  // 900 
		height = Math.round( $("#user_contributions_container").outerHeight() / 3 - 10);  //Math.round(width - (width / 3));
	var margin = {top: 60, right: 60, bottom: 60, left: 60},
		nomargin_w = width - (margin.left + margin.right),
		nomargin_h = height - (margin.top + margin.bottom);
		//console.log(width + " " + height)

	d3.json(data_source, function(error, data) {
		if (error) throw error;

		users = data.users
		files = data.users[0].files

		var height =  300, //( $(container).height() / data.users.length);
			nomargin_h = height - (margin.top + margin.bottom);

		/*var svg = d3.select(container).selectAll("svg") 
			.data(users)
			.enter()
			.append("svg")		
			.attr("width",width)
			.attr("height",height)
			.attr("viewBox", "0 0 " + width + " " + height)
			.attr("class", function (d,i){
				return (i+1) + " " + d.user
			})
			.style("margin-bottom", "20")

		var plot = svg.append("g")
			.attr("id", "d3_plot")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")*/

		/*var parseTime = d3.timeParse("%Y/%m")

		users.forEach(function(files) {
			files = files.files;
			files.forEach(function(d) {
				d.date = parseTime(d.date);
				d.count = d.count;
				//console.log(d.date + " " + d.count)
			})
		})
		console.log(users[0].files[0].date)*/

		/*
		var max_files = d3.max(users, function(d) {
			return d3.max(d, function(e) { 
				return d3.max(e);
			});
		});
		console.log(users[0].files[0].count + " " + max_files + " 4")
		*/

		var parseTime = d3.timeParse("%Y/%m")

		users = data.users;
		test = data.users;

		/*test.forEach(function(d,i) {
			var files = user.files

			my_data[i] = {
				user: i
			}
		})
		console.log(my_data)
		*/

		users.forEach(function(user) {

			var files = user.files
			var total_files = 0
			var months = files.length

			files.forEach(function(file) {
				//console.log(file)

				for ( var i = 0; i < months; i++ ) {
					total_files += file.count
					//console.log(file.count)
				}

				user.user = user.user;
				file.count = +file.count;
				file.date = parseTime(file.date);
			})

			files.total = total_files;
		});
		users.sort(function(x,y){
			return d3.descending(x.files.total, y.files.total); // descending ascending
			//console.log(users[0].files.total)
		})
		console.log(users);

		// simplify JSON
		/*my_data = [];
		users.forEach(function(user) {
			var files = user.files;
			var user = user.user;
			total_files = 0;
			var months = files.length;
			//console.log(files)

			files.forEach(function(file) {
				console.log(months)

				for ( var i = 0; i < months; i++ ) {
					total_files += file.count
				}
				

				data = {
					user: user,
					count: file.count,
					date: parseTime(file.date),
					total_files: total_files
				}
				my_data.push(data)
			})
		})
		console.log(my_data)
		*/

		test = users;
		var nested = d3.nest()
		.key(function(d) { 
			return d.user; 
		})
		.sortValues(function(a,b) { 
			return (a - b)
		})
		.entries(test);
		//console.log(test)

		/*var max = d3.max(users, function(d) { 
			return +d.files.count
		});
		console.log(max)
		var users = (data.users)*/

		var svg = d3.select(container).selectAll("svg") 
			.data(users)
			.enter()
			.append("svg")		
			.attr("width",width)
			.attr("height",height)
			.attr("viewBox", "0 0 " + width + " " + height)

		var plot = svg.append("g")
			.attr("id", "d3_plot")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

		var user = plot.append("text")
			.text(function (d,i){
				return d.user
			})
			.attr("x",10)
			.attr("y",10)
			
		// range
		var x = d3.scaleTime()
			.rangeRound([0, nomargin_w])

		var y = d3.scaleLinear()
			.rangeRound([nomargin_h, 0]);

		x.domain([
			d3.min(users, function(file) { 
				return file.files[0].date; 
			}),
			d3.max(users, function(file) { 
				return file.files[file.files.length - 1].date; 
			})
		]);
		//console.log(users[0].files[0].date)

		var max_y = d3.max(users, function(d) {
			return d3.max(d.files, function(a) {
				return a.count; 
			})
		})
		console.log(max_y)

		// da 0 a max
		y.domain([0,max_y]);
		//console.log(users[1].files[1].count)
		
		plot.append("g")
			.attr("class", "axis axis-x")
			.attr("transform", "translate(0," + (nomargin_h) + ")") // (margin.left * 4) )
			.call(d3.axisBottom(x))
			.selectAll("text")
				.attr("y", 25)
				.attr("x", 5)
				.style("text-anchor", "start")

		// y axis
		plot.append("g")
			.attr("class", "axis axis-y")
			.call(d3.axisLeft(y))

		/*plot.append("g")
			.attr("class","bars")
			.attr("y",0)
			.attr("x",0)

		.append("rect")
			.attr("class","bars")
			.attr("y", function(d) { 
				return 0 //y(d.files[0].count)
			})
			.attr("x", function(d,i) { 
				return x(d.files[0].date)
			})
			.attr("height", function(d) { 
				return 100 // y(d.files[0].count) //nomargin_h - y(d.files[0].count)
			})
			.attr("class", function(d,i){
				return d.files[0].date + " " + d.files[0].count
			})
			.attr("width", nomargin_w / users.length)
			.style("fill", "steelblue")
		*/

		var bars = plot.append("g")
			.attr("class", function(d,i){
				return d.user 
			})
			.attr("y",0)
			.attr("x",0)

		bars.selectAll(".bar")
			//.data(users)
			//.data(nested[0].values)
			.data(function(d) { 
				return d.files;
			})
			.enter()
			.append("rect")
			.attr("class", function(d,i){
				return d.count + " bar"
			})
			.attr("width", function(d,i) {
				return nomargin_w / 12
			})
			.attr("height", function(d,i) { 
				return nomargin_h - y(d.count)
			})
			.attr("y", function(d,i) { 
				return y(d.count)
			})
			.attr("x", function(d,i) { 
				return x(d.date)
			})
			.style("fill", "steelblue")
			console.log(users[0].files)

		/*
		d3.selectAll(".tick > text")
			.style("font-family", "verdana");
		*/
	})
}

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