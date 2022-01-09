const { STSClient, GetSessionTokenCommand } = require("@aws-sdk/client-sts"); // ES Modules 
module.exports = {
    createSessionToken: async (createSessionTokenDto) => {
      return new Promise(async (resolve, reject) => {
        try{
        let client = new STSClient({ 
            region: process.env.AWS_REGION, 
            credentials : {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        });
     
        const command = await new GetSessionTokenCommand(createSessionTokenDto);
      
      
          const response = await client.send(command);
            const output = {
            region: process.env.AWS_REGION,
            accessKeyId: response.Credentials.AccessKeyId,
            secretAccessKey: response.Credentials.SecretAccessKey,
            sessionToken: response.Credentials.SessionToken,
            signatureVersion: 'v4', 
          }
        
          resolve((output));
         
      
      }catch(e){
        resolve(e)
      }
      });
    }
  };