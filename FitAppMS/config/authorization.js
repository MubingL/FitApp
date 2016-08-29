/**
 * Created by liuye on 10/26/15.
 */
//var oauth = OAuth.OAuth2;
var OAuth = require('oauth');
//var fitbitClientId = '229RF5';
var fitbitConsumerKey = 'a972d0b78d0cc6134f6409dac578e787';
var fitbitConsumerSecret = 'b33a548d7626d40c3eef65e4f111a44f';

exports.oauth1 = new OAuth.OAuth(
    'https://api.fitbit.com/oauth/request_token',
    'https://api.fitbit.com/oauth/access_token',
    fitbitConsumerKey,
    fitbitConsumerSecret,
    "1.0",
    "http://localhost:3000/fitbithome",
    "HMAC-SHA1",
    null,
    null
);
