module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    '.*\\.ts$': 'ts-jest' // Converte qualquer teste do TypeScript para o JavaScript
  },
  moduleNameMapper: {
    "@config/(.*)": "<rootDir>/src/Config/$1"
  }
}