import Vue from "vue";
import App from "./App";
import index from "./store/index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faEdit, faBan);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store: index,
  components: { App },
  template: "<App/>"
});
