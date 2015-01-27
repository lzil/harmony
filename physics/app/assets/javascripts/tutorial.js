var tutorial = function() {
	var checkitem = function() {
		var $this;
		$this = $("#tutorial-carousel");
		if ($("#tutorial-carousel .carousel-inner .item:first").hasClass("active")) {
			$this.children(".left").hide();
			$this.children(".right").show();
		} 
		else if ($("#tutorial-carousel .carousel-inner .item:last").hasClass("active")) {
    		$this.children(".right").hide();
    		$this.children(".left").show();
  		}
  		else {
    		$this.children(".carousel-control").show();
  		}
	};

	checkitem();

	$("#tutorial-carousel").on("slid.bs.carousel", "", checkitem);
};