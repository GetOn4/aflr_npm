import { API_BASE_URL, API_BASE_URL_STAGING } from "./constants";
import { isValidApiKeyError } from "./Errors";
import { IConfig, IInputConfig } from "./types";

interface IComponent {
  configure(config: IConfig): void;
}

class AflrClass {
  public Script: any;
  public Speech: any;
  public Voice: any;
  private config!: IConfig;
  private components: IComponent[] = [];

  public register(comp: IComponent) {
    this.components.push(comp);
  }

  /**
   * Configure the SDK before using it. Make sure you call this function
   * before any of the calls
   * @param config
   */
  public configure(config: IInputConfig) {
    if (!config || !config.apiKey) {
      return isValidApiKeyError();
    }

    const baseUrl = config.debug ? API_BASE_URL_STAGING : API_BASE_URL;

    this.config = { ...config, baseUrl };
    this.components.map(comp => {
      comp.configure(this.config);
    });

    return this.config;
  }
}

export const Aflr = new AflrClass();
