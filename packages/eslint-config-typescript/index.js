module.exports = {
    extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2024,
    },
    plugins: ['@typescript-eslint'],
    rules: {
        /**
         * fancy typescript types often require explicit any
         */
        '@typescript-eslint/no-explicit-any': 'off',

        /**
         * allow unused variables starting with _
         */
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],

        /**
         * this is sometimes useful for registering global types,
         * e.g.
         *
         * ```ts
         * import { UnrealBloomPass } from 'three/addons'
         * import { Object3DNode, extend } from '@react-three/fiber'
         *
         * extend({ UnrealBloomPass })
         *
         * declare global {
         *     namespace React.JSX {
         *         interface IntrinsicElements {
         *             unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>
         *         }
         *     }
         * }
         * ```
         */
        '@typescript-eslint/no-namespace': 'off',

        /**
         * rules I disagree with
         * "... great power comes with great responsibility ..."
         */
        '@typescript-eslint/no-this-alias': 'off',
    },
}
