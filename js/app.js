var app = angular.module('reservaBus',['ngRoute']);

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when("/",{
		templateUrl:"views/intro.html",
		controller: "IntroController"
	})
	.when("/motorbook",{
		templateUrl:"views/motorBook.html",
		controller: "MotorBookController"
	})
	.otherwise({
		redirectTo: "/"
	})
}]);

app.controller('IntroController',['$scope', function($scope){
	$scope.activateFooter = false;

	$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });
     
}])

app.controller('MotorBookController',['$scope','$http', function($scope,$http){
	$http.get("json/coach.json").success (function (data){
		$scope.coachJson = data;
	});
	
}]);

app.directive('filterRight', function(){
	return {
      restrict :'C' ,
      templateUrl : "views/filterRight.html"
	}
});

app.directive('filterTop', function(){
	return {
      restrict :'C' ,
      templateUrl : "views/filterTop.html"
	}
});

app.directive('header', function() {
    return {
     restrict : 'E',
     templateUrl : "views/header.html"
    }
});

app.directive('footer', function() {
    return {
     restrict : 'E',
     templateUrl : "views/footer.html"
    }
});

app.filter('fechas', function(){
	return function(coachJson, fechas){

		var $input = $('.datePicker').pickadate();
		var picker = $input.pickadate('picker');
		var unixDate = moment(picker.$node[0].value).valueOf();

		var querySeat = $('#inputSeat')[0].valueAsNumber
		console.log(querySeat)


			if(!unixDate){
				return coachJson;
			}

			var arr = [];

			angular.forEach(coachJson, function(v){
				console.log(v)
				if(v.datai <= unixDate && v.dataf >= unixDate){		
						
						v.available = "Available";
						arr.push(v);
						
				} else {

					    v.unavailable = "You're too late";
					    arr.push(v);

				}
				if(v.seat <= querySeat){

						arr.push(v);
				} else {
						arr.push(v);
				}

			})
		return arr;
	}
})

$scope.greaterThan = function(seat) {
        return function(item) {  
        console.log(item);                        
            if ( item['seat'] > seat) {                
                return true;
            } else {                
                return false;
            }
        }
    };