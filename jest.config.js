module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    '.*\\.ts$': 'ts-jest' // Converte qualquer teste do TypeScript para o JavaScript
  },
  moduleNameMapper: {
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@helpers/(.*)": "<rootDir>/src/helpers/$1"
  }
}