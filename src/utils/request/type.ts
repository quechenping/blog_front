import {
	AxiosRequestHeaders,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";

/** 去除可索引签名 */
type RemoveIndexSignature<Obj extends Record<string, any>> = {
	[Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};

// 入参出参类型
export type APISchemaType = Record<
	string,
	{
		request: Record<string, any> | void;
		response: Record<string, any> | any;
	}
>;

// 请求类型
type Method =
	| "GET"
	| "POST"
	| "PUT"
	| "DELETE"
	| "HEAD"
	| "OPTIONS"
	| "CONNECT"
	| "TRACE"
	| "PATCH";

// url格式
type RequestPath = `${Uppercase<Method>} ${string}`;

// 定义api格式
export type ApiType<T extends APISchemaType> = {
	[K in keyof RemoveIndexSignature<T>]: {
		path: RequestPath;
		headers?: AxiosRequestHeaders;
	};
};

// axios基础配置config
export type CreateRequestConfig<T extends APISchemaType> = {
	baseURL: string;
	headers?: AxiosRequestHeaders;
	apis: ApiType<T>;
};

// 自定义函数
export type RequestFunc<P = Record<string, any> | void, R = any> = (
	params: P,
	...args: Options[]
) => Promise<R>;

// 客户端请求返回结构的类型约束
export type CreateRequestClient<T extends APISchemaType> = {
	[K in keyof T]: RequestFunc<
		T[K]["request"],
		{
			data: AxiosResponse<T[K]["response"]>["data"];
			error: boolean;
		}
	>;
};

// request请求config类型
export type RequestConfig = InternalAxiosRequestConfig & Options;

export type ResponseConfig = { data: any; error: boolean };

export type Options = {
	isCancel?: boolean;
	[index: string]: any;
};
