let jwt = require("jsonwebtoken");
const reqResponse = require("./responseHandler");
const Request = require('request');
const crypto = require('crypto');

//Response when JWT is not valid.
var response401 = {
    statusCode: 401,
    statusDescription: 'Unauthorized'
};

module.exports = {
  checkToken,
};

function checkToken(req, res, next) {
  var key = "LBq12Z5TN1NEhLgAG66Uh1NvoWv3SqmQGJOwwGGK";

  // If no JWT token, then generate HTTP redirect 401 response.
  if(!req.querystring.jwt) {
      console.log("Error: No JWT in the querystring");
      return response401;
  }

  var jwtToken = request.querystring.jwt.value;

  try{ 
      jwt_decode(jwtToken, key);
  }
  catch(e) {
      console.log(e);
      return response401;
  }
}


function jwt_decode(token, key, noVerify, algorithm) {
  // check token
  if (!token) {
      throw new Error('No token supplied');
  }
  // check segments
  var segments = token.split('.');
  if (segments.length !== 3) {
      throw new Error('Not enough or too many segments');
  }

  // All segment should be base64
  var headerSeg = segments[0];
  var payloadSeg = segments[1];
  var signatureSeg = segments[2];

  // base64 decode and parse JSON
  var header = JSON.parse(_base64urlDecode(headerSeg));
  var payload = JSON.parse(_base64urlDecode(payloadSeg));

  if (!noVerify) {
      var signingMethod = 'sha256';
      var signingType = 'hmac';

      // Verify signature. `sign` will return base64 string.
      var signingInput = [headerSeg, payloadSeg].join('.');

      if (!_verify(signingInput, key, signingMethod, signingType, signatureSeg)) {
          throw new Error('Signature verification failed');
      }

      // Support for nbf and exp claims.
      // According to the RFC, they should be in seconds.
      if (payload.nbf && Date.now() < payload.nbf*1000) {
          throw new Error('Token not yet active');
      }

      if (payload.exp && Date.now() > payload.exp*1000) {
          throw new Error('Token expired');
      }
  }
  return payload;
}

function _verify(input, key, method, type, signature) {
  if(type === "hmac") {
      return (signature === _sign(input, key, method));
  }
  else {
      throw new Error('Algorithm type not recognized');
  }
}

function _sign(input, key, method) {
  return crypto.createHmac(method, key).update(input).digest('base64url');
}

function _base64urlDecode(str) {
  return String.bytesFrom(str, 'base64url');
}
