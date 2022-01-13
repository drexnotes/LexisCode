const { HttpRequest} = require("@aws-sdk/protocol-http");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { NodeHttpHandler } = require("@aws-sdk/node-http-handler");
const { Sha256 } = require("@aws-crypto/sha256-browser")
const dotenv = require('dotenv');
mode = process.env.NODE_ENV || "dev";
// mode can be access anywhere in the project
const config = require("config").get(mode);
dotenv.config({ path: config.envpath });

module.exports = {
  /** opensearch search fuction** */
  searchES: async (body, params, query, session) => {
  
    return new Promise(async (resolve, reject) => {

      
      // create request with search squer and search domain
      let request = new HttpRequest({
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'host': config.elasticsearch.domain,
        },
        hostname: config.elasticsearch.domain,
        method: 'POST',
        path: '_search'
    
      })

      // Sign the request using signature V4 : inpits are "temporary session values and region"
      const  signer = new SignatureV4({
        credentials:session,// contains temporary session with( session acccessky, sessionsecret, session token)
        region: config.elasticsearch.region,
        service: 'es',
        sha256: Sha256
      });

      //create signedRequest with signature 
      let signedRequest = await signer.sign(request);
  
     

      // Send the request signedRequest
      var client = new NodeHttpHandler();
      var { response } =  await client.handle(signedRequest)
      //console.log(response.statusCode + ' ' + response.body.statusMessage);
      var responseBody = '';
      await new Promise(() => {
        response.body.on('data', (chunk) => {
          responseBody += chunk;
        });
        response.body.on('end', () => {
          console.log('Response body: ' + responseBody);
          resolve(JSON.parse(responseBody));
        });
      }, (error) => {
          console.log('Error: ' + error);
      });

     
    });
  }
};