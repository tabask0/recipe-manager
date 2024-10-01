import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  preset: "ts-jest",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["app/**/*.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};

export default createJestConfig(config);
