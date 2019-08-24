import { Context } from '@nuxt/vue-app';
import { Store } from 'vuex';

export default <T = any, K = any>(store?: Store<T, K>) => {
    const Mock = jest.fn<Context, any>().mockImplementation(() => ({
        store,
    } as any));
    return new Mock();
};
