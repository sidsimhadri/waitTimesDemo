export type Client = {
  name: string;
  id: string;
};

export type Ping = {
    clientId: string;
    id: string;
    value: number;
    timestamp: Date;
}