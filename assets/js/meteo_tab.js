/**
 * @file
 *
 * Handles events on general dashboard.
 */

if (document.getElementById('meteo_tab')) {
  // Refresh all graph on the page base on start and end dates.
  var refreshMeteoGraph = function () {

    var startArray = localStorage.startDate.split('/');
    var startDate = startArray[2] + '-' + startArray[1] + '-' + startArray[0];
    var endArray = localStorage.endDate.split('/');
    var endDate = endArray[2] + '-' + endArray[1] + '-' + endArray[0];
    var frequency = localStorage.frequency;

    // Refresh temperature repartition.
    $.ajax({
      url: appRoute + 'data/temperature/repartition/year_v/' + startDate + '/' + endDate + '',
      success: function(result) {
        var data = JSON.parse(result);
        pilea.displayGlobalRepartitionV(data, 'temp-repartition', TEMP_COLOR, '°C', 1, -5, 25);
        pilea.displayLegend(data, 'temp-repartition-legend', TEMP_COLOR, '°C', 1, -5, 25);
      }
    });

    // Refresh dju evolution.
    $.ajax({
      url: appRoute + 'data/dju/evolution/' + frequency + '/' + startDate + '/' + endDate + '',
      success: function( result ) {
        var data = JSON.parse(result);
        pilea.displayGlobalEvolution(data, 'temperature-evolution', DJU_COLOR[6], 'DJU', 0, 200);
      }
    });

    // Refresh DJU total.
    $.ajax({
      url: appRoute + 'data/dju/sum/' + startDate + '/' + endDate + '',
      success: function(result) {
        var data = JSON.parse(result);
        document.getElementById('dju').innerHTML = parseFloat(data[0].value).toFixed(0);
      }
    });

    // Refresh nebulosity repartition.
    $.ajax({
      url: appRoute + 'data/nebulosity/repartition/year_v/' + startDate + '/' + endDate + '',
      success: function(result) {
        var data = JSON.parse(result);
        pilea.displayGlobalRepartitionV(data, 'neb-repartition', NEBULOSITY_COLOR, '%', 1, 0, 100);
        pilea.displayLegend(data, 'neb-repartition-legend', NEBULOSITY_COLOR, '%', 1, 0, 100);
      }
    });

    // Refresh nebulosity evolution.
    $.ajax({
      url: appRoute + 'data/nebulosity/evolution/' + frequency + '/' + startDate + '/' + endDate + '',
      success: function( result ) {
        var data = JSON.parse(result);
        pilea.displayGlobalEvolution(data, 'nebulosity-evolution', NEBULOSITY_COLOR[6], '%', 1, 200);
      }
    });

    // Refresh day without cloud.
    $.ajax({
      url: appRoute + 'data/nebulosity/inf/15/day/' + startDate + '/' + endDate + '',
      success: function(result) {
        var data = JSON.parse(result);
        document.getElementById('neb-day').innerHTML = parseFloat(data[0].value).toFixed(0);
      }
    });

    // Refresh rain repartition.
    $.ajax({
      url: appRoute + 'data/rain/repartition/year_v/' + startDate + '/' + endDate + '',
      success: function(result) {
        var data = JSON.parse(result);
        pilea.displayGlobalRepartitionV(data, 'rain-repartition', RAIN_COLOR, 'mm', 1, 0);
        pilea.displayLegend(data, 'rain-repartition-legend', RAIN_COLOR, 'mm', 1, 0);
      }
    });

    // Refresh rain evolution.
    $.ajax({
      url: appRoute + 'data/rain/evolution/' + frequency + '/' + startDate + '/' + endDate + '',
      success: function( result ) {
        var data = JSON.parse(result);
        pilea.displayGlobalEvolution(data, 'rain-evolution', RAIN_COLOR[6], 'mm', 1, 200);
      }
    });

    // Refresh day without rain.
    $.ajax({
      url: appRoute + 'data/rain/inf/0/day/' + startDate + '/' + endDate + '',
      success: function(result) {
        var data = JSON.parse(result);
        document.getElementById('rain-day').innerHTML = parseFloat(data[0].value).toFixed(0);
      }
    });

    // Refresh humidity repartition.
    $.ajax({
      url: appRoute + 'data/humidity/repartition/year_v/' + startDate + '/' + endDate + '',
      success: function(result) {
        var data = JSON.parse(result);
        pilea.displayGlobalRepartitionV(data, 'humidity-repartition', HUMIDITY_COLOR, '%', 1, 0, 100);
        pilea.displayLegend(data, 'humidity-repartition-legend', HUMIDITY_COLOR, '%', 1, 0, 100);
      }
    });

    // Refresh nebulosity evolution.
    $.ajax({
      url: appRoute + 'data/humidity/evolution/' + frequency + '/' + startDate + '/' + endDate + '',
      success: function( result ) {
        var data = JSON.parse(result);
        pilea.displayGlobalEvolution(data, 'humidity-evolution', HUMIDITY_COLOR[6], '%', 1, 200);
      }
    });

    // Refresh day at less than 70% of humidity.
    $.ajax({
      url: appRoute + 'data/humidity/inf/70/day/' + startDate + '/' + endDate + '',
      success: function(result) {
        var data = JSON.parse(result);
        document.getElementById('humidity-day').innerHTML = parseFloat(data[0].value).toFixed(0);
      }
    });

    // Refresh total of days.
    nbDay = (new Date(endDate) - new Date(startDate)) / (1000*60*60*24);
    var nbDayElement = document.getElementsByClassName('nb-day');
    for(var i = 0; i < nbDayElement.length; i++) {
      nbDayElement.item(i).innerHTML = nbDay;
    }

  }

  $(document).ready(function () {

    refreshMeteoGraph();

    document.addEventListener('selection', function() {
      refreshMeteoGraph();
    });
  });
}



