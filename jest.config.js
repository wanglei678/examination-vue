module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.vue?$': 'vue-jest',
    '^.+\\.tsx$': 'ts-jest'
  },
  testMatch: [' **/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)']
};
