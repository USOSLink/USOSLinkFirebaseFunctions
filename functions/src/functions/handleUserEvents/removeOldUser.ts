import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const removeOldUser = functions
    .region("europe-west1")
    .auth.user()
    .onDelete(async (user) => {
        functions.logger.info("removeOldUser triggered");
        if (user) {
            functions.logger.info("User deleted: " + user.uid);
            await admin.firestore().collection("users").doc(user.uid).delete();
            await admin.storage().bucket().file(user.uid).delete();
        } else functions.logger.error("No user object received");
    });

export default removeOldUser;
