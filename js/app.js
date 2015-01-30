App = Ember.Application.create();

App.UNITS = {"symbol":[{"units":"kWh"},{"units":"Hours-Running"},{"units":"GWh"},{"units":"Lbs-of-Coal"},{"units":"Reheated-Cups-of-Coffee"},{"units":"Cal"},{"units":"Lbs-CO2-from-Coal"},{"units":"Gallons-of-Gas"},{"units":"Trees-to-Sequester"},{"units":"Hours-Hula-Hooping"},{"units":"Tacos"}]}



jQuery.getJSON("http://alchemy.spruce.mgmt:8080/energy/units", function(json) {
	console.log(json);
	Ember.set(App.UNITS, 'symbol', json.symbol);
});

App.Router.map(function() {
	this.resource('units', {path: '/:units'});
  // put your routes here
});

App.UnitsRoute = Ember.Route.extend({
	model: function (params) {

		var url = "http://alchemy.spruce.mgmt:8080/energy/" + App.KWCHART[0].kwh + "/kWh/to/" + params.units; 

		jQuery.getJSON(url, function(json) {
			Ember.set(App.KWCHART[0], 'value', json.quantity.value.toFixed(2));
			Ember.set(App.KWCHART[0], 'units', json.quantity.units);
		});

		var url = "http://alchemy.spruce.mgmt:8080/energy/" + App.KWCHART[1].kwh + "/kWh/to/" + params.units; 

		jQuery.getJSON(url, function(json) {
			Ember.set(App.KWCHART[1], 'value', json.quantity.value.toFixed(2));
			Ember.set(App.KWCHART[1], 'units', json.quantity.units);
		});

		var url = "http://alchemy.spruce.mgmt:8080/energy/" + App.KWCHART[2].kwh + "/kWh/to/" + params.units; 

		jQuery.getJSON(url, function(json) {
			Ember.set(App.KWCHART[2], 'value', json.quantity.value.toFixed(2));
			Ember.set(App.KWCHART[2], 'units', json.quantity.units);
		});				
		
		return App.UNITS.symbol.findBy('units', params.units);
	}
});

App.IndexRoute = Ember.Route.extend({
	symbol: "",
	
  	model: function () {
  		console.log(this.get("symbol"));
  		for (var i = App.KWCHART.length - 1; i >= 0; i--) {
  			Ember.set(App.KWCHART[i], 'height', "height:" + App.KWCHART[i].kwh + "px");
  		};

    	return App.KWCHART;
  	},

});

App.KWCHART = [
	{
		label: "Efficient Neighbors",
		kwh: 461,
		value: 461,
		units: "kWh",
		template: "you"
	},
	{
		label: "Your Home",
		kwh: 737,
		value: 737,
		units: "kWh",
		template: "you"
	},
	{
		label: "Average Neighbors",
		kwh: 624,
		value: 624,
		units: "kWh",
		template: "you"
	}
];

App.EfficientneighborController = Ember.ObjectController.extend({
	value: function () {
		return App.KWCHART[0].value;
	}.property('units')
});

App.YouController = Ember.ObjectController.extend({
	value: function () {
		return App.KWCHART[1].value;
	}.property('units')
});

App.AverageneighborController = Ember.ObjectController.extend({
	value: function () {
		return App.KWCHART[2].value;
	}.property('units')
});

App.ApplicationController = Ember.ObjectController.extend({


	efficientneighbors: function() {

		Ember.set(App.KWCHART[0], 'height', "height:" + App.KWCHART[0].value/3 + "px");
		return App.KWCHART[0];
	}.property("model.@each.value"), // model is App.KWCHART, computation depends on the value

	you: function() {
		Ember.set(App.KWCHART[1], 'height', "height:" + App.KWCHART[1].value/3 + "px");
		return App.KWCHART[1];
	}.property(),

	averageneighbors: function() {
		Ember.set(App.KWCHART[2], 'height', "height:" + App.KWCHART[2].value/3 + "px");
		return App.KWCHART[2];
	}.property(),

	units: function(){
		return App.UNITS.symbol;
	}.property('App.UNITS.symbol'),

	testunits: function () {
		return App.Testunits.findBy('symbol');
	}.property(),

});