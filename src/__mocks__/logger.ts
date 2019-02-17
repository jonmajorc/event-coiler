//tslint:disable
export const mockLog = jest.fn()
export const mockCreate = jest.fn().mockReturnValue({ log: mockLog })
export const mockInit = jest.fn()
const mock = jest.fn().mockImplementation(() => {
  return {
    create: mockCreate,
    log: mockLog,
    init: mockInit,
  }
})
export default mock()
