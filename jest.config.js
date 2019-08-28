const projects = (process.env.JEST_PROJECT || "unit,int").split(",");

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
      "testRegex": "\\.(spec).(t|j)s$",
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
      "displayName": "int",
      "moduleFileExtensions": [
        "js",
        "json",
        "ts",
        "vue",
      ],
      "rootDir": ".",
      "testRegex": "\\.(int-spec).(t|j)s$",
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
    {
      "displayName": "p2p",
      "moduleFileExtensions": [
        "js",
        "json",
        "ts",
        "vue",
      ],
      "preset": "jest-puppeteer",
      "rootDir": ".",
      "testRegex": "\\.p2p-spec.(t|j)s$",
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
  ].filter(p => projects.includes(p.displayName)),
  "collectCoverage": true,
  "coverageDirectory": "./coverage",
  "collectCoverageFrom": [
    "<rootDir>/**/*.vue",
    "<rootDir>/**/*.ts",
  ],
  "reporters": ["default",  "jest-sonar"],
};
