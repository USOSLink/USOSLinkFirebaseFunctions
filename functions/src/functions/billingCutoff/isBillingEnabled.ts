import * as functions from "firebase-functions";
import { CloudBillingClient } from "@google-cloud/billing";
const billing = new CloudBillingClient();

const isBillingEnabled = async (projectName: string) => {
    try {
        const [res] = await billing.getProjectBillingInfo({ name: projectName });
        return res.billingEnabled;
    } catch (e) {
        functions.logger.log(
            "Unable to determine if billing is enabled on specified project, assuming billing is enabled",
        );
        return true;
    }
};

export default isBillingEnabled;
