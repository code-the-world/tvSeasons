/**
 * Created with JetBrains WebStorm.
 * User: Abdelkrim
 * Date: 2013/08/21
 * Time: 00:00
 * Copyright (c) 2013 ALT-F1, We believe in the projects we work on™
 */
/*
 * GET home page.
 */
'use strict';

function mostRecent(series) {
  //recibimos un array de series, organizamos por fecha y elegimos la más moderna
    console.log('starting from here');
    for (var i = 0; i < series.length; i++) {
        //var FirstAired = series[i].FirstAired;
        //var ano = moment().format(FirstAired, 'YYYY').format();
        //console.log('La fecha de emisión es ' + FirstAired);
        //console.log('El año de emisión es ' + ano);
        //for (var property in serie) {
        //    console.log('item ' + i + ': ' + property + '=' + serie[property]);
        //}
        // If property names are known beforehand, you can also just do e.g.
        // alert(object.id + ',' + object.Title);
    }
    console.log('ending here');
    //console.log(JSON.stringify(series, null, 4));
}

//two functions
// get popular shows and put a random backgroud
// get data from when starts a new season;
// Could be = Finished | give us a date | already broadcasting
var tvDB = require('thetvdb-api'), key = '0FF3A19AFCC1AA8E';

function getShowDate(name) {
    tvDB(key).getSeries(name, function (err, res) {
    //  var id = '';
        if (!err) {
            //console.log(res);
            //because is an asynchronous call, we need to work inside that
            var series = res.Data.Series;
            mostRecent(series);
            // seleccionamos la serie más reciente
            var id = res.Data.Series[0].seriesid;
            //console.log(JSON.stringify(res, null, 4));
            //console.log('Inside tvDB getSeries, seriesID = ' + id);
            tvDB(key).getSeriesAllById(id, function (err, res) {
                if (!err) {
                  //console.log ('inside');
                    console.log(JSON.stringify(res, null, 4));
                }
                else {
                  //console.log(err);
                }
            });
        }
    });
}
/*
function getBroadcastDate(name){
  // find shows that match the name. Order the array on newest one, ignore the others
  // Ask information for this show and get the date of broadcast. Compare with today and if is > 0 create a countdown
  var seriesId = 'a';
  var tvDB = require('thetvdb-api'), key = '0FF3A19AFCC1AA8E';


  console.log ('antes de preguntar por la serie dando el id ' + seriesId);
  tvDB(key).getSeriesAllById(seriesId, function(err,res){
    if (!err){
      console.log ('inside');
      console.log(JSON.stringify(res, null, 4));
    }
    else{
      console.log(err);
    }
  });
}
*/
module.exports = function (app) {
    app.get('/', function (req, res) {
        getShowDate('The Flash');
        res.render('index', {
            show: 'lalao'
        });
    });
    app.get('/about', function (req, res) {
        res.redirect('http://www.alt-f1.be');
    });
    app.get('/contact', function (req, res) {
        res.redirect('http://www.alt-f1.be/contact-us.html');
    });
    app.get('/template/:selectedTemplate', function (req, res) {
        res.render('bootstrap3-templates/' + req.params.selectedTemplate, {
            'pathToAssets': '/bootstrap-3.3.1',
            'pathToSelectedTemplateWithinBootstrap' : '/bootstrap-3.3.1/docs/examples/' + req.params.selectedTemplate
        });
    });
};
