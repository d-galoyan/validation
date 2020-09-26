module.exports = {
    transform                : {'^.+\\.ts?$': 'ts-jest'},
    testEnvironment          : 'node',
    testRegex                : '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions     : ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    modulePathIgnorePatterns : ["<rootDir>/dist/"],
    collectCoverageFrom      : ["src/**/*.{ts,js}"]
}