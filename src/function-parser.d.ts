declare module FunctionParser{
	export function parse(str : string) : FunctionCall;
	export interface FunctionCall{
		name : string ,
		args : any[]
	}
}
export = FunctionParser;