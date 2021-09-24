module.exports = {
  roots: [ '<rootDir>'],
  testEnvironment: 'node',
  transform: {
    '.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@config': '<rootDir>/src/config/index.ts',
    '@helpers': '<rootDir>/src/helpers/index.ts',
    '@dtos': '<rootDir>/src/dtos',
    '@services': '<rootDir>/src/services/index.ts',
    '@database': '<rootDir>/src/database/index.ts',
    '@commands': '<rootDir>/src/commands',
    '@src/(.*)': '<rootDir>/src/$1',

  },
  modulePaths: [
    '<rootDir>'
  ],
  moduleDirectories: [
    'node_modules',
    'src'
  ],
}
