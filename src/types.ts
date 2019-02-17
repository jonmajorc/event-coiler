export interface IInteropFunc {
  //tslint:disable-next-line no-any
  (value: any): string
  name?: string
}

export type IEmitterParams = {
  value: string
  ns: string
  nsList: string[]
  params: object
}

export interface ICoilerConfig {
  config: object
  interpolation?: {
    [key: string]: IInteropFunc
  }
  debug?: boolean
  //tslint:disable-next-line no-any
  emitter(args: IEmitterParams): IEmitterParams
}

export interface IEventEmitter {
  /**
   * Emit events to the defined emitter in the configuration
   * @param events - list of events that should be passed to the emitter
   */
  emit(events: []): void
}

export interface ICoiler {
  /**
   * emit events
   * @param args - array of events that coiler will translate
   */
  e(ns: string, opt: { [key: string]: string }): void
}

export interface ILoggerOptions {
  debug: boolean
}

export interface IInterpolator {
  traverse(ns: string, opt: { [key: string]: string }): string
  interop(strToInterp: string, opt: { [key: string]: string }): string
}

export interface ILogger {
  readonly debug: boolean
  init(namespace: string, options: ILoggerOptions): ILogger
  //tslint:disable-next-line no-any
  log(level: string, args: any): void
  create(namespace: string): ILogger
}
