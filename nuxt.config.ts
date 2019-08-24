import NuxtConfiguration from '@nuxt/config';

delete process.env.http_proxy;
delete process.env.HTTP_PROXY;
delete process.env.https_proxy;
delete process.env.HTTPS_PROXY;

const config: NuxtConfiguration = {
  head: {
    title: 'Cardlay | Grid',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: `Cardlay | Grid | The grid system, provided by Cardlay, is the best tool for you to invest you money` },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
        integrity: 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay',
        crossorigin: 'anonymous',
      },
    ],
  },
  plugins: [
    '~/plugins/vee-validate',
    '~/plugins/buefy',
    '~/plugins/portal-vue',
    '~/plugins/vue-dom-portal',
    '~/plugins/rxjs',
    { src: '~/plugins/vuex-shared-mutations', ssr: false },
  ],
  css: [
    '~/assets/scss/main.scss',
  ],
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
    ],
  },
  manifest: {
    name: 'Cardlay | Grid',
    short_name: 'Cardlay | Grid',
    description: `Cardlay | Grid | The grid system, provided by Cardlay, is the best tool for you to invest you money`,
    lang: 'en',
    theme_color: '#0072E1',
    start_url: '/',
  },
  modules: [
    '@nuxtjs/pwa',
    ['@nuxtjs/axios', {
      credentials: false,
      proxyHeaders: false,
      prefix: '/api',
      browserBaseURL: '/api',
    }],
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    'nuxt-vuex-localstorage',
  ],
  loading: '~/components/loading.vue',
  axios: {},
  ignore: [
    '**/sw*.js',
    'api/**/*',
    '**/*.spec.*',
    '**/*.*-spec.*',
    'test-utils/**/*',
  ],
  build: {
    extend(configExtended, { isClient }) {
      if (isClient) {
        configExtended.devtool = '#source-map';
      }
    },
    watch: process.env.IS_SEPARATE ? [] : ['api/**/*'],
  },
  serverMiddleware: process.env.IS_SEPARATE ? [] : [
    { path: '/api', handler: '~/api/main.ts'},
  ],
  router: {
    middleware: ['fwdcookies', 'auth'],
  },
  proxy: process.env.IS_SEPARATE ? {
    '/api': 'http://localhost:4000',
  } : {},
};

export default config;
