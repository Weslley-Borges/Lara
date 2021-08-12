module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    '.*\\.ts$': 'ts-jest' // Converte qualquer teste do TypeScript para o JavaScript
  },
  moduleNameMapper: {
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@helpers/(.*)": "<rootDir>/src/helpers/$1",
    "@config": "<rootDir>/src/config",
    "@providers/(.*)": "<rootDir>/src/providers/implementations/$1",
    "@helpers": "<rootDir>/src/helpers",
    "@dtos": "<rootDir>/src/dtos",
    "@temp/(.*)": "<rootDir>/temp/$1",
    "@database": "<rootDir>/src/database/index.ts"
  }
}