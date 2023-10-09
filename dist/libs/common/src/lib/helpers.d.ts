export declare const randomId: (length?: number) => string;
export declare const delay: (ms: number) => Promise<unknown>;
export declare const isProduction: () => boolean;
export declare const getEnvFile: () => ".prod.env" | ".dev.env";
