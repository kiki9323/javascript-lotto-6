module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 'jest' is not defined 오류 방지
    jest: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'jest'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // 들여쓰기 깊이 제한
    'max-depth': ['error', 2],
    // 함수의 매개변수 개수 제한
    'max-params': ['error', 3],
    // 함수의 길이 제한
    'max-lines-per-function': ['error', { max: 10 }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // 공백 문자 호환 설정
    // 'operator-linebreak': ['error', 'before'], // 할당 연산자 줄바꿈 설정
  },
};
