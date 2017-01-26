function how_to_read(){
	button = $("#how_to_read_button");
	box = $(".how_to_read");
	
	button.click(function(){
		box.toggleClass("show");
		console.log("click")
	});	
};
