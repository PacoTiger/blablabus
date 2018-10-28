$('.datepicker').pickadate({
firstDay: 1,
selectMonths: false, // Creates a dropdown to control month
selectYears: 1, // Creates a dropdown of 15 years to control year
    onSet: function (ele) {
	   if(ele.select){
	    	this.close();
		}
	}
});


