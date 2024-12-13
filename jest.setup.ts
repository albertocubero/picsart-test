import "@testing-library/jest-dom";
import { jest } from '@jest/globals';

jest.mock("@/config", () => ({
  VITE_PEXELS_API_KEY: "mock-api-key",
}));
