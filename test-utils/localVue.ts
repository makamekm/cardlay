import { createLocalVue } from '@vue/test-utils';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import Buefy from 'buefy';

export default () => {
    const vue = createLocalVue();
    vue.use(VeeValidate);
    vue.use(Vuex);
    vue.use(Buefy);
    return vue;
};
