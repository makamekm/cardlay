import vuex from 'vuex'
import { AxiosStatic } from 'axios';
import veeValidate from "vee-validate";
import Buefy from 'buefy';

declare module 'vuex' {
  interface Store<T> {
    $axios: AxiosStatic;
  }
}