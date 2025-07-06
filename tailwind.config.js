/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            'h1, h2, h3, h4': {
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            'h1': {
              fontSize: '2.5rem',
            },
            'h2': {
              fontSize: '2rem',
            },
            'h3': {
              fontSize: '1.5rem',
            },
            'h4': {
              fontSize: '1.25rem',
            },
            'ul': {
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
            },
            'li': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'table': {
              marginTop: '2rem',
              marginBottom: '2rem',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              width: '100%',
            },
            'th': {
              backgroundColor: '#F9FAFB',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              color: '#374151',
              borderBottom: '1px solid #E5E7EB',
            },
            'td': {
              padding: '0.75rem 1rem',
              borderBottom: '1px solid #E5E7EB',
              color: '#6B7280',
            },
            'tr:nth-child(even)': {
              backgroundColor: '#F9FAFB',
            },
            'strong': {
              fontWeight: '700',
              color: '#111827',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

