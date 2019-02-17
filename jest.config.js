module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
