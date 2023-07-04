import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {Vpc} from "aws-cdk-lib/aws-ec2";
import * as path from "path";

export class NeptuneQuickstartStackLambda extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const vpc = Vpc.fromLookup(this, "VPC", {
            vpcName: "NeptuneQuickstartStack/VPC",
        });

        new NodejsFunction(this, "NodejsFunction", {
            entry: path.resolve(__dirname, "./lambda/gremlin.ts"),
            vpc,
            allowPublicSubnet: true,
            bundling: {
                nodeModules: ["neptune-gremlin"],
            },
        });
    }
}
