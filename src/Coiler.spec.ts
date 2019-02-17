import Coiler from './Coiler'
import { IEmitterParams } from './types'
// tslint:disable-next-line match-default-export-name
import mockConsole from 'jest-mock-console'

mockConsole()

describe('Coiler System Tests', () => {
  it('It performs basic interpolation', () => {
    const item: string = 'todo'
    const ns: string = 'Dropdown.open'
    const coiler: Coiler = createCoiler()
    const result: IEmitterParams = coiler.e(ns, { item })

    expect(result.value).toBe(`user opened ${item} dropdown`)
    expect(result.ns).toBe(ns)
    expect(result.nsList).toEqual(ns.split('.'))
  })

  it('It performs advance interpolation', () => {
    const item: string = 'todo'
    const ns: string = 'Dropdown.update'
    const coiler: Coiler = createCoiler()
    const result: IEmitterParams = coiler.e(ns, { item })

    expect(result.value).toBe(`value was just updated to ${item.toUpperCase()}`)
    expect(result.ns).toBe(ns)
    expect(result.nsList).toEqual(ns.split('.'))
  })

  it('It fails traversing the config for a string value', () => {
    const item: string = 'todo'
    const ns: string = 'Dropdown.update'
    const coiler: Coiler = createCoiler({
      config: { Dropdown: { update: {} } },
    })
    expect(() => {
      coiler.e(ns, { item })
    }).toThrowError(/[S|s]tring/)
  })

  it('It fails traversing the config for a string value', () => {
    const item: string = 'todo'
    const ns: string = 'Dropdown.update'
    const coiler: Coiler = createCoiler({
      debug: true,
    })
    coiler.e(ns, { item })
  })
})

function createCoiler(props?: object): Coiler {
  return new Coiler({
    emitter: (args: IEmitterParams): IEmitterParams => {
      return args
    },
    interpolation: {
      capitalize(value: string): string {
        return value.toUpperCase()
      },
      lowercase(value: string): string {
        return value.toLowerCase()
      },
    },
    config: {
      Dropdown: {
        open: `user opened {{item}} dropdown`,
        click: `user selected {{sel}}`,
        close: `user opened {{item}} dropdown`,
        update: `value was just updated to {{capitalize(item)}}`,
      },
    },
    debug: false,
    ...props,
  })
}
