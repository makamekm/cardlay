module.exports = {
  projects: [
    {
      "displayName": "unit",
      "moduleFileExtensions": [
        "js",
        "json",
        "ts",
        "vue",
      ],
      "rootDir": ".",
      "testRegex": "\\.(spec|int-spec).(t|j)s$",
      "moduleNameMapper": {
        "^~/(.*)$": "<rootDir>/$1",
        "^~~/(.*)$": "<rootDir>/$1",
      },
      "transform": {
        "^.+\\.(t|j)s$": "ts-jest",
        ".*\\.(vue)$": "vue-jest",
      },
      "snapshotSerializers": [
        "jest-serializer-vue",
      ],
      "testURL": "http://localhost:3000/",
      "testEnvironment": "jsdom",
    },
    {
      "displayName": "e2e",
      "moduleFileExtensions": [
        "js",
        "json",
        "ts",
        "vue",
      ],
      "preset": "jest-puppeteer",
      "rootDir": ".",
      "testRegex": "\\.e2e-spec.(t|j)s$",
      "moduleNameMapper": {
        "^~/(.*)$": "<rootDir>/$1",
        "^~~/(.*)$": "<rootDir>/$1",
      },
      "transform": {
        "^.+\\.(t|j)s$": "ts-jest",
        ".*\\.(vue)$": "vue-jest",
      },
      "snapshotSerializers": [
        "jest-serializer-vue",
      ],
      "testURL": "http://localhost:3000/",
    },
  ],
  "collectCoverage": true,
  "coverageDirectory": "./coverage",
  "collectCoverageFrom": [
    "<rootDir>/**/*.vue",
    "<rootDir>/**/*.ts",
  ],
};
