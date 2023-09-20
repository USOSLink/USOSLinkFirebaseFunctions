import * as functions from "firebase-functions";

import stopBilling from "./stopBilling";

const billingCutoff = functions
    .region("europe-west1")
    .pubsub.topic("billing")
    .onPublish(async (message) => {
        functions.logger.info("billingCutoff triggered");
        if (message) stopBilling(message);
        else functions.logger.error("No message received");
    });

export default billingCutoff;
