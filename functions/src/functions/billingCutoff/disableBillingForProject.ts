import * as functions from "firebase-functions";

import { CloudBillingClient } from "@google-cloud/billing";
const billing = new CloudBillingClient();

const disableBillingForProject = async (projectName: string) => {
    const res = await billing.updateProjectBillingInfo({
        name: projectName,
        projectBillingInfo: {
            billingEnabled: false,
        },
    });
    functions.logger.log(`Billing disabled: ${JSON.stringify(res)}`);
    return `Billing disabled: ${JSON.stringify(res)}`;
};

export default disableBillingForProject;
