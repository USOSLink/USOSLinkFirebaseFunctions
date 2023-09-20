import * as functions from "firebase-functions";

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const PROJECT_NAME = `projects/${PROJECT_ID}`;

import disableBillingForProject from "./disableBillingForProject";
import isBillingEnabled from "./isBillingEnabled";

const stopBilling = async (message: functions.pubsub.Message) => {
    const data = await JSON.parse(Buffer.from(message.data, "base64").toString());
    functions.logger.log(data);
    if (data.costAmount <= data.budgetAmount) {
        functions.logger.log("Billing cutoff event is below budget, ignoring");
        return `No action necessary. (Current cost: ${data.costAmount})`;
    }

    if (!PROJECT_ID) {
        functions.logger.log("No project id specified, ignoring");
        return "No project specified";
    }

    const billingEnabled = await isBillingEnabled(PROJECT_NAME);
    if (billingEnabled) {
        functions.logger.log("Billing is enabled, disabling");
        return disableBillingForProject(PROJECT_NAME);
    } else {
        functions.logger.log("Billing is already disabled, ignoring");
        return "Billing already disabled";
    }
};

export default stopBilling;
