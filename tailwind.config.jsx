export default {
    theme: {
      extend: {
        // your theme stuff
      },
    },
    future: {
      // Force Tailwind to use RGB instead of OKLCH
      cssVariablePrefix: 'tw',
    },
    experimental: {
      optimizeUniversalDefaults: true,
    },
  }
  