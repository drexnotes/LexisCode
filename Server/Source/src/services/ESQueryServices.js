const { HttpRequest} = require("@aws-sdk/protocol-http");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { NodeHttpHandler } = require("@aws-sdk/node-http-handler");
const { Sha256 } = require("@aws-crypto/sha256-browser")

module.exports = {
  searchES: async (body, params, query, session) => {
    console.log("test", process.env.NODE_ENV);
    return new Promise(async (resolve, reject) => {

      const clientn = new NodeHttpHandler(session);
      let request = new HttpRequest({
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'host': process.env.AWS_DOMAIN,
        },
        hostname: process.env.AWS_DOMAIN,
        method: 'POST',
        path: '_search'
    
      })
      // Sign the request
      const  signer = new SignatureV4({
        credentials: defaultProvider(),
        region: process.env.AWS_REGION,
        service: 'es',
        sha256: Sha256
      });
      let signedRequest = await signer.sign(request);
      //console.log(signedRequest);
     

      // Send the request
      var client = new NodeHttpHandler();
      var { response } =  await client.handle(signedRequest)
      //console.log(response.statusCode + ' ' + response.body.statusMessage);
      var responseBody = '';
      await new Promise(() => {
        response.body.on('data', (chunk) => {
          responseBody += chunk;
        });
        response.body.on('end', () => {
          //console.log('Response body: ' + responseBody);
          resolve(JSON.parse(responseBody));
        });
      }, (error) => {
          console.log('Error: ' + error);
      });

     
    });
  }
};