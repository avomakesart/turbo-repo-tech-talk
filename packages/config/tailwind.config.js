module.exports = {
    content: [
        '../../packages/ui/src/components/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    corePlugins: {
        aspectRatio: false,
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
};
