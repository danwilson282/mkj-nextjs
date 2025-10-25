export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@faker-js/faker)/)', // 👈 let Jest transform faker
  ],
  setupFiles: ['./jest.setup.ts'],
  setupFilesAfterEnv: ['./test/setup-prisma.ts'],
};
