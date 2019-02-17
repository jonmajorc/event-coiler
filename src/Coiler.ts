import Interpolator from './Interpolator'
import logger from './logger'
import {
  ICoiler,
  ICoilerConfig,
  IInterpolator,
  ILogger,
  IEmitterParams,
} from './types'

class Coiler implements ICoiler {
  private readonly _coilerConfig: ICoilerConfig
  private readonly _logger: ILogger
  private readonly _interpolator: IInterpolator

  constructor(config: ICoilerConfig) {
    this._coilerConfig = config
    this._logger = logger.init('Coiler', { debug: config.debug })
    this._interpolator = new Interpolator(this._coilerConfig)

    return this
  }

  e(ns: string, opt: { [key: string]: string }): IEmitterParams {
    this._logger.log('warn', `method e(${ns}, ${JSON.stringify(opt)}])`)
    const strToInterp: string = this._interpolator.traverse(ns, opt)
    this._logger.log('warn', `the value is: ${strToInterp}`)
    const interpValue: string = this._interpolator.interop(strToInterp, opt)

    return this._coilerConfig.emitter({
      value: interpValue,
      ns,
      nsList: ns.split('.'),
      params: opt,
    })
  }
}

/* tslint:disable */
export default Coiler
