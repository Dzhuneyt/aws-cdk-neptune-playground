import * as cdk from "aws-cdk-lib";
import {Construct} from "constructs";
import * as neptune from "@aws-cdk/aws-neptune-alpha";
import {InstanceType, NatProvider, Port, SecurityGroup, Vpc,} from "aws-cdk-lib/aws-ec2";
import {ParameterGroupFamily} from "@aws-cdk/aws-neptune-alpha/lib/parameter-group";

export class NeptuneQuickstartStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const natGatewayProvider = NatProvider.instance({
            instanceType: new InstanceType("t3.small"),
        });

        const vpc = new Vpc(this, "VPC", {
            natGatewayProvider,
            natGateways: 1,
        });

        const securityGroup = new SecurityGroup(this, "SecurityGroup", {
            vpc,
            description: "Security Group of Neptune",
        })
        const parameterGroup = new neptune.ParameterGroup(this, "ParameterGroup", {
            family: ParameterGroupFamily.NEPTUNE_1_2,
            parameters: {
                neptune_query_timeout: "10000", // timeout on 10s, default is 2m
            },
        })
        const cluster = new neptune.DatabaseCluster(this, "Database", {
            vpc,
            instanceType: neptune.InstanceType.T3_MEDIUM,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            securityGroups: [securityGroup],
            parameterGroup,
            iamAuthentication: false,
        });
        cluster.connections.allowFrom(securityGroup, Port.allTraffic(), "Allow from SG");

        // VPC is a limiting boundary anyway, so we can open to the world
        cluster.connections.allowDefaultPortFromAnyIpv4("Open to the world");
    }
}
