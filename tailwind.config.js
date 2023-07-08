/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary50': '#E6F0F9',
        'primary100': '#CDE0F3',
        'primary200': '#9BC0E7',
        'primary300': '#68A1DA',
        'primary400': '#3681CE',
        'primary500': '#0462C2',
        'primary600': '#034A92',
        'primary700': '#023161',
        'primary800': '#011931',
        'primary900': '#000A13',

        'secondary50': '#F9FBFD',
        'secondary100': '#F1F6FA',
        'secondary200': '#E4EDF6',
        'secondary300': '#D6E5F1',
        'secondary400': '#C9DCED',
        'secondary500': '#BBD3E8',
        'secondary600': '#8C9EAE',
        'secondary700': '#5E6A74',
        'secondary800': '#2F353A',
        'secondary900': '#131517',

        'variant50': '#E8F0E9',
        'variant100': '#D1E1D1',
        'variant200': '#A3C2A3',
        'variant300': '#74A476',
        'variant400': '#468548',
        'variant500': '#18671A',
        'variant600': '#124D14',
        'variant700': '#0C340D',
        'variant800': '#061A07',
        'variant900': '#020A03',

        'error50': '#FFEAEC',
        'error100': '#FFD3D8',
        'error200': '#FFA7B0',
        'error300': '#FF7C89',
        'error400': '#FF5061',
        'error500': '#FF243A',
        'error600': '#BF1B2C',
        'error700': '#80121D',
        'error800': '#40090F',
        'error900': '#1A0406',

        'success50': '#F3FFF3',
        'success100': '#E6FFE6',
        'success200': '#CCFECC',
        'success300': '#B3FEB3',
        'success400': '#99FD99',
        'success500': '#80FD80',
        'success600': '#60BE60',
        'success700': '#407F40',
        'success800': '#203F20',
        'success900': '#0D190D'
      }
    },
  },
  plugins: [],
}
