module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    '.*\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    "@config": "<rootDir>/src/config/index.ts",
    "@providers/(.*)": "<rootDir>/src/providers/implementations/$1",
    "@helpers": "<rootDir>/src/helpers/index.ts",
    "@dtos": "<rootDir>/src/dtos",
    "@temp/(.*)": "<rootDir>/temp/$1",
    "@services": "<rootDir>/src/services/index.ts",
    "@database": "<rootDir>/src/database/index.ts",
    "@actions": "<rootDir>/src/actions/index.ts"
  }
}
