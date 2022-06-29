const rxKebab = '[a-z][a-z0-9]*(-[a-z0-9]*)*';
const rxBem = `${rxKebab}(__${rxKebab})?(--${rxKebab})?`;

const config = {
  extends: ['stylelint-config-recommended', 'stylelint-config-recommended-scss'],
  rules: {
    // formatting
    indentation: 2,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ],

    // naming conventions
    'custom-media-pattern': `^${rxBem}$`,
    'custom-property-pattern': `^${rxKebab}$`,
    'keyframes-name-pattern': `^${rxBem}$`,
    'selector-class-pattern': `^\.${rxBem}$`,
    'selector-id-pattern': `^#${rxBem}$`,
    'scss/at-function-pattern': `^(${rxBem})|_$`,
    'scss/at-mixin-pattern': `^${rxBem}$`,
    'scss/dollar-variable-pattern': `^${rxBem}$`,

    // other
    'scss/comment-no-empty': null,
    'scss/no-global-function-names': null,
    'scss/at-if-no-null': null,

    // selectors
    'no-descending-specificity': null,

    // angular specific
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep']
      }
    ],

    // project specific
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/^cc-/']
      }
    ]
  }
};

module.exports = config;
