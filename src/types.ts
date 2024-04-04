export type Client = {
    id: string;
    name: string;
    configuration: string;
    type: string;
};

export type Ping = {
    clientId: string;
    id: string;
    value: number;
    timestamp: Date;
}