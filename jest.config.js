module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    '.*\\.ts$': 'ts-jest' // Converte qualquer teste do TypeScript para o JavaScript
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    "@data/(.*)": "<rootDir>/src/data/$1"
  }
}