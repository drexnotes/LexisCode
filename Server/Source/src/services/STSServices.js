const { STSClient, GetSessionTokenCommand } = require("@aws-sdk/client-sts"); // ES Modules
const dotenv = require("dotenv");
mode = process.env.NODE_ENV || "dev";
// mode can be access anywhere in the project
const config = require("config").get(mode);

dotenv.config({ path: config.envpath });
module.exports = {

  /****Create temporary session : Inputs are accesskeyid and secretkey of IAM user */
  createSessionToken: async (createSessionTokenDto) => {
    return new Promise(async (resolve, reject) => {
      try {
        let client = new STSClient({
          region: config.elasticsearch.region,
          credentials: {
            accessKeyId: config.elasticsearch.access_key,//accesskey id of IAM user(dont use temporary key)
            secretAccessKey: config.elasticsearch.secret,//secretkey of IAM user(dont use temporary secret)
          },
        });

        const command = await new GetSessionTokenCommand(createSessionTokenDto);
        let response = await client.send(command);

        const output = {
          accessKeyId: response.Credentials.AccessKeyId,//temporary session key
          secretAccessKey: response.Credentials.SecretAccessKey,//temporary session secret
          sessionToken: response.Credentials.SessionToken,//temporary session token
          Expiration: response.Credentials.Expiration,//temporary session expiration
        };
        //console.log(response);
        resolve(output);
      } catch (e) {
        console.log("error--", e);
        resolve(e);
      }
    });
  },
};
