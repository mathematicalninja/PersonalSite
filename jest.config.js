// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {}],
    },
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
    },
}
