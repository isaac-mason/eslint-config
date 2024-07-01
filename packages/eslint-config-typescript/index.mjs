import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
})

export default [
    ...fixupConfigRules(
        compat.extends(
            'plugin:import/typescript',
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended'
        )
    ),
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2024,
            sourceType: 'module',
        },

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
    },
]
