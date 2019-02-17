import { ILogger, ILoggerOptions } from './types'

export class Logger implements ILogger {
  private _options: ILoggerOptions
  private _namespace: string

  constructor(namespace?: string, options?: ILoggerOptions) {
    this._namespace = namespace
    this._options = options
  }

  /**
   * init logger
   * @param options - options to setup the logger
   */
  init(namespace: string, options: ILoggerOptions): ILogger {
    this._namespace = namespace
    this._options = options

    return this
  }

  /**
   * log to console arguments
   * @param level - console log level
   * @param args - args to log out
   */
  log(level: string, args: []): void {
    if (!this.debug) return
    if (console && console[level]) {
      const namespace: string = this._namespace
      // tslint:disable-next-line
      console[level](`${namespace} {`, ...args, ' }')
    }
  }

  get debug(): boolean {
    return this._options.debug
  }

  create(namespace: string): ILogger {
    return new Logger(namespace, this._options)
  }
}

/* tslint:disable */
export default new Logger()
