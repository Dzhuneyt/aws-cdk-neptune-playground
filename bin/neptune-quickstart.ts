#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {NeptuneQuickstartStack} from "../lib/NeptuneQuickstartStack";
import {NeptuneQuickstartStackLambda} from "../lib/NeptuneQuickstartStackLambda";

const app = new cdk.App();
new NeptuneQuickstartStack(app, "NeptuneQuickstartStack", {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});


new NeptuneQuickstartStackLambda(app, "NeptuneQuickstartStackLambda", {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});
