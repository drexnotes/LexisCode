const { STSClient, GetSessionTokenCommand } = require("@aws-sdk/client-sts"); // ES Modules
const dotenv = require("dotenv");
mode = process.env.NODE_ENV || "dev";
// mode can be access anywhere in the project
const config = require("config").get(mode);

dotenv.config({ path: config.envpath });
module.exports = {
  createSessionToken: async (createSessionTokenDto) => {
    return new Promise(async (resolve, reject) => {
      // console.log(config);
      try {
        let client = new STSClient({
          region: config.elasticsearch.region,
          credentials: {
            accessKeyId: config.elasticsearch.access_key,
            secretAccessKey: config.elasticsearch.secret,
          },
        });

        const command = await new GetSessionTokenCommand(createSessionTokenDto);
        const response = await client.send(command);
        const output = {
          region: config.elasticsearch.region,
          accessKeyId: response.Credentials.AccessKeyId,
          secretAccessKey: response.Credentials.SecretAccessKey,
          sessionToken: response.Credentials.SessionToken,
          signatureVersion: "v4",
        };
        //console.log("Token", response.Credentials.SecretAccessKey);
        console.log("output--", output);
        resolve(output);
      } catch (e) {
        console.log("error--", e);
        resolve(e);
      }
    });
  },
};
