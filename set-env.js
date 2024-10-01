// set-env.ts
const fs = require("fs");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const targetPath = "./src/environments/environment.ts";

// Prepare the content for the environment.prod.ts file
const envConfigFile = `
export const environment = {
  production: true,
  firebase: {
    apiKey: '${process.env["NG_APP_FIREBASE_API_KEY"]}',
    authDomain: '${process.env["NG_APP_FIREBASE_AUTH_DOMAIN"]}',
    projectId: '${process.env["NG_APP_FIREBASE_PROJECT_ID"]}',
    storageBucket: '${process.env["NG_APP_FIREBASE_STORAGE_BUCKET"]}',
    messagingSenderId: '${process.env["NG_APP_FIREBASE_MESSAGING_SENDER_ID"]}',
    appId: '${process.env["NG_APP_FIREBASE_APP_ID"]}',
  }
};
`;

// Write the environment configuration to the target file
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`Output generated at ${targetPath}`);
  }
});
