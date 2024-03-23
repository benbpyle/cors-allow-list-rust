import { Duration, Tags } from "aws-cdk-lib";
import { IFunction, Architecture } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { FuncProps } from "../../config/infra-options";
import {RustFunction} from "cargo-lambda-cdk";

export class CorsFunctionConstruct extends Construct {
    private _corsFunc: IFunction;

    get CorsFunc(): IFunction {
        return this._corsFunc;
    }

    constructor(scope: Construct, id: string, props: FuncProps) {
        super(scope, id);
        this._corsFunc = new RustFunction(scope, `CorsLambdaFunction`, {
            manifestPath: '.',
            functionName: `cors`,
            timeout: Duration.seconds(10),
            memorySize: 256,
            architecture: Architecture.ARM_64,
            environment: {
                ALLOWED_ORIGINS: "http://foo.bar"
            },
        });



        Tags.of(this._corsFunc).add("version", props.version);
    }
}
