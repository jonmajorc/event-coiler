//tslint:disable
import Interpolator from './Interpolator'
import { IEmitterParams, ICoilerConfig, IInterpolator } from './types'
import logger from './logger'

jest.mock('./logger.ts')

describe('Interpolator', () => {
  describe('traverse()', () => {
    it('returns a string to interpolate', () => {
      const { interpolator, coilerConfig } = createInterpolator()

      const value = interpolator.traverse('Dropdown.open', { item: 'todo' })

      expect(logger.log).toBeCalledTimes(2)
      expect(value).toBe(coilerConfig.config.Dropdown.open)
    })

    it('throws error if its not a string returned', () => {
      const { interpolator, coilerConfig } = createInterpolator()

      expect(() => {
        interpolator.traverse('Dropdown', { item: 'todo' })
      }).toThrow()
    })
  })

  describe('interop()', () => {
    it('interpolates a string', () => {
      const { interpolator, coilerConfig } = createInterpolator()

      const value = interpolator.interop(coilerConfig.config.Dropdown.open, {
        item: 'todo',
      })

      expect(value).toBe('user opened todo dropdown')
    })

    it('interpolates a function', () => {
      const { interpolator, coilerConfig } = createInterpolator()

      const value1 = interpolator.interop(coilerConfig.config.Dropdown.update, {
        item: 'todo',
      })
      const value2 = interpolator.interop(
        coilerConfig.config.Dropdown.updateString,
        {
          item: 'todo',
        },
      )
      const value3 = interpolator.interop(
        coilerConfig.config.Dropdown.updateString2,
        {
          item: 'todo',
        },
      )

      expect(value1).toBe('todo was just updated to TODO')
      expect(value2).toBe('todo was just updated to ITEM')
      expect(value3).toBe('todo was just updated to ITEM IS NOW IN CAPS')
    })
  })
})

// tslint:disable-next-line no-any
function createInterpolator(props?: object): any {
  const coilerConfig: ICoilerConfig = {
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
        update: `{{item}} was just updated to {{capitalize(item)}}`,
        updateString: `{{item}} was just updated to {{capitalize('item')}}`,
        updateString2: `{{item}} was just updated to {{capitalize('item is now in caps')}}`,
      },
    },
    debug: false,
    ...props,
  }

  const interpolator: IInterpolator = new Interpolator(coilerConfig)

  return {
    interpolator,
    coilerConfig,
  }
}
