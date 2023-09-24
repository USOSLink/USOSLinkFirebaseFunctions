import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const registerNewUser = functions
    .region("europe-west1")
    .auth.user()
    .onCreate(async (user) => {
        functions.logger.info("registerNewUser triggered");
        if (user) {
            functions.logger.info("New user created: " + user.uid);
            await admin.firestore().collection("users").doc(user.uid).set({});
        } else functions.logger.error("No user object received");
    }
    );

export default registerNewUser;
