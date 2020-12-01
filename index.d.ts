declare module 'greenlock-proxy' {
  import { ClientRequest, ServerResponse } from 'http';
  import ProxyServer from 'http-proxy';

  export default class GreenlockProxy {
    maintainerEmail: string;

    rules: Array<{
      domains: string[];
      targets: string[];
    }>;

    proxy: ProxyServer | null;

    greenlock: object;

    constructor(options: {
      maintainerEmail: string;

      /**
       * true for testing, false for production
       */
      staging?: boolean;
    });

    register(domains: string[], targets: string[]): void;

    start(): void;

    httpsWorker(glx: object): void;

    serveFcn(req: ClientRequest, res: ServerResponse): void;

    bindTarget(req: ClientRequest, res: ServerResponse, proxy: ProxyServer, domains: string[], targets: string[]): void;
  }
}
