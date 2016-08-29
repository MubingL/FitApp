var express = require('express');
var OAuth = require('oauth');
var url = require('url');
var authorization = require('../config/authorization');

var router = express.Router();

// OAuth2 for Microsoft Band
var authorization_uri;
var oauth2 = new OAuth.OAuth2(
    "0000000048174F9E",
    "gi6j1N9FcgT3YACQHpUcQE1280rKuu9Y",
    "https://login.live.com/",
    "",
    "",
    null
);
var queryCode;
var accessToken;

// OAuth1.0a for Fitbit
var oauthToken;
var oauthTokenSecret;
var verifier;
var oauthAccessToken;
var oauthAccessTokenSecret;

var oauth1 = authorization.oauth1;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });


});

router.get('/blank-page', function(req, res, next) {
  res.render('blank-page');

});
router.get('/bootstrap-elements', function(req, res, next) {
  res.render('bootstrap-elements');

});
router.get('/bootstrap-grid', function(req, res, next) {
  res.render('bootstrap-grid');

});
router.get('/index-rtl', function(req, res, next) {
  res.render('index-rtl');

});
router.get('/index', function(req, res, next) {
  res.render('index');

});

router.get('/msband', function(req, res, next) {

    console.log('authr');

   authorization_uri = oauth2.getAuthorizeUrl({
       client_id: '0000000048174F9E',
       scope: 'mshealth.ReadDevices mshealth.ReadProfile mshealth.ReadActivityHistory mshealth.ReadActivityLocation',
       response_type: 'code',
       redirect_uri: 'http://localhost:3000/msbandhome'
    });
    console.log(authorization_uri);

    res.redirect(authorization_uri);

});

router.get('/msbandhome', function(req, res, next) {
    var url_parts1 = url.parse(req.url, true);
    queryCode = url_parts1.query.code;
    // console.log(queryCode);
    if(queryCode != null) {
        oauth2.getOAuthAccessToken(
            queryCode,
            {
                client_id: '0000000048174F9E',
                redirect_uri: "http://localhost:3000/msbandhome",
                client_secret: "gi6j1N9FcgT3YACQHpUcQE1280rKuu9Y",
                code: queryCode,
                grant_type: 'authorization_code'
            },
            function(e, access_token, refresh_token, results) {
                accessToken = access_token;
                  // console.log(request_arr[i]);
                  oauth2.get('https://api.microsofthealth.net/v1/me/Summaries/Daily?startTime=2015-10-30T16:04:49.8578590-07:00&endTime=2015-11-01T16:04:49.840-07:00', accessToken, function (e, result, response) {
                      var tmp_data = JSON.parse(result);
                      console.log(tmp_data);
                      var calorie = tmp_data.summaries[1].caloriesBurnedSummary.totalCalories;
                      console.log(calorie);
                      res.render('charts',tmp_data);
                      // result_arr.push(tmp_data);
                  });
        });
      }

    });



router.get('/fitbit', function(req, res, next) {
    oauth1.getOAuthRequestToken(
        "",
        function (e, oauth_token, oauth_token_secret, results) {
            oauthToken = oauth_token;
            oauthTokenSecret = oauth_token_secret;
            console.log("Oauth Token: "+ oauthToken);
            console.log("Oauth Secret Token: "+ oauthTokenSecret);
            navigation();

        }
    );

    var navigation = function() {
        res.redirect("https://fitbit.com/oauth/authorize?oauth_token=" + oauthToken);
    };
});

router.get('/fitbithome', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    verifier = url_parts.query.oauth_verifier;
    var results = [];
    if(verifier != null) {
        console.log("verifier:" + verifier);
        oauth1.getOAuthAccessToken(oauthToken, oauthTokenSecret, verifier, function (e, oauth_access_token, oauth_access_token_secret, results ) {
            console.log("access token: " + oauth_access_token);
            console.log("access token secret: " + oauth_access_token_secret);
            oauthAccessToken = oauth_access_token;
            oauthAccessTokenSecret = oauth_access_token_secret;

            oauth1.get('https://api.fitbit.com/1/user/-/sleep/minutesAsleep/date/today/7d.json', oauthAccessToken, oauthAccessTokenSecret,
                function(e, data, response) {
                    //JSON.parse(data).toArray()

                    var profile = JSON.parse(data);
                    console.log(profile);
                    var sleep = [];
                    if(profile.hasOwnProperty("sleep-minutesAsleep")) {
                        console.log("has this one");
                        for(var i = profile["sleep-minutesAsleep"].length - 1; i >= 0; i--) {
                            sleep.push(profile["sleep-minutesAsleep"][i].dateTime);
                            sleep.push(profile["sleep-minutesAsleep"][i].value)
                        }
                    }

                    var steps = [];
                    oauth1.get('https://api.fitbit.com/1/user/-/activities/steps/date/today/7d.json', oauthAccessToken, oauthAccessTokenSecret,
                        function(e, data, response) {
                            var result = JSON.parse(data);
                            for(var i = result["activities-steps"].length-1; i>=0; i--) {
                                steps.push(result["activities-steps"][i].dateTime);
                                steps.push(result["activities-steps"][i].value);
                            }

                            var distance = [];
                            oauth1.get('https://api.fitbit.com/1/user/-/activities/distance/date/today/7d.json', oauthAccessToken, oauthAccessTokenSecret,
                                function(e, data, response) {
                                    var result = JSON.parse(data);
                                    for(var i = result["activities-distance"].length-1; i>=0; i--) {
                                        distance.push(result["activities-distance"][i].dateTime);
                                        distance.push(result["activities-distance"][i].value);
                                    }


                                    oauth1.get('https://api.fitbit.com/1/user/-/profile.json', oauthAccessToken, oauthAccessTokenSecret,
                                        function(e, data, response) {
                                            var result = JSON.parse(data);
                                            var name = result.user.displayName;
                                            console.log("username: " + result.user.displayName)

                                            var calories = [];
                                            oauth1.get('https://api.fitbit.com/1/user/-/activities/calories/date/today/7d.json', oauthAccessToken, oauthAccessTokenSecret,
                                                function(e, data, response) {
                                                    var result = JSON.parse(data);

                                                    for(var i = result["activities-calories"].length-1; i>=0; i--) {
                                                        calories.push(result["activities-calories"][i].dateTime);
                                                        calories.push(result["activities-calories"][i].value);
                                                    }
                                                    res.render('flotcharts',
                                                        {
                                                            sleep: sleep,
                                                            steps: steps,
                                                            distance: distance,
                                                            username: name,
                                                            calories: calories
                                                        });
                                                })

                                        }
                                    )

                                })

                        });

                });
        });
    }
});

router.get('/personinfo', function(req, res, next) {
    console.log("access token: " + oauthAccessToken);
    oauth1.get('https://api.fitbit.com/1/user/-/profile.json', oauthAccessToken, oauthAccessTokenSecret,
        function(e, data, response) {
            var result = JSON.parse(data);
            var name = result.user.displayName;
            var dateofbirth = result.user.dateOfBirth;
            var persongender = result.user.gender;
            var pWeight = result.user.weight;
            var pHeight = result.user.height;
            var pFullName = result.user.fullName;
            console.log("username: " + result)
            res.render('personinfo',
                {
                    username: name,
                    birthdate: dateofbirth,
                    gender: persongender,
                    weight: pWeight,
                    height: pHeight,
                    fullname: pFullName
                });
        });

});

router.get('/mspersoninfo', function(req, res, next) {
    oauth2.get('https://api.microsofthealth.net/v1/me/Profile', accessToken, function (e, result, response) {
        var tmp_data = JSON.parse(result);
        console.log(tmp_data);
        //var calorie = tmp_data.summaries[1].caloriesBurnedSummary.totalCalories;
        //console.log(calorie);
        res.render('mspersoninfo',
            {
                username: tmp_data.firstName,
                fullname: tmp_data.firstName + " " + tmp_data.lastName,
                gender: tmp_data.gender,
                height: (tmp_data.height/10),
                weight: (tmp_data.weight/1000),
                birthdate: tmp_data.birthdate
            });
    });
});

module.exports = router;
