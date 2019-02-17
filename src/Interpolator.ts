import logger from './logger'
import { IInterpolator, ILogger, ICoilerConfig, IInteropFunc } from './types'

class Interpolator implements IInterpolator {
  private readonly _logger: ILogger
  private readonly _config: ICoilerConfig

  constructor(coilerConfig: ICoilerConfig) {
    this._logger = logger.create('Interpolator')
    this._config = coilerConfig
  }

  traverse(ns: string, opt: { [key: string]: string }): string {
    this._logger.log('warn', `method traverse(${ns}, ${JSON.stringify(opt)})`)
    let value: object | string = this._config.config
    ns.split('.').forEach((name: string) => {
      // tslint:disable-next-line
      value = value[name]
    })

    if (typeof value === 'string') {
      this._logger.log('warn', `"${ns}" found value: "${value}"`)

      return value
    } else {
      this._logger.log('warn', `"${ns}" found value: ${JSON.stringify(value)}`)

      throw new Error('Please return a String')
    }
  }

  interop(strToInterp: string, opt: object): string {
    const strInterop: RegExp = /({{(\s+|\s?)(\w+)(\s+|\s?)}})/gm
    const funcInterop: RegExp = /{{(\s+|\s?)(\w+)\(([^\s"']+|"([^"]*)"|'([^']*)')\)(\s+|\s?)}}/gm

    return strToInterp
      .replace(
        funcInterop,
        (...match: []): string => this._interopFunc(match, opt),
      )
      .replace(
        strInterop,
        (...match: []): string => this._interopStr(match, opt),
      )
  }

  _interopStr(match: [] | string, opt: object): string {
    let m: [] | string = match
    if (Array.isArray(m)) {
      m = match[3]
    }
    this._logger.log('warn', `interop toooooo ${opt[m]}`)

    return opt[m] as string
  }

  _interopFunc(match: [] | string, opt: object): string {
    const strInterp: string = this._interopStr(match[3], opt)
    const interopFunc: IInteropFunc = this._config.interpolation[match[2]]
    const interopValue: string = interopFunc(strInterp || match[4] || match[5])

    const functionName: string = interopFunc.name

    this._logger.log(
      'warn',
      `interop method ${functionName}() interpolated value to ${interopValue}`,
    )

    return interopValue
  }
}

/* tslint:disable */
export default Interpolator
