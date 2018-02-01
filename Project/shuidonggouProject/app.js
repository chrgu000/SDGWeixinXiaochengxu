//app.js
import { Token } from 'utils/token.js';
App({
  data: {
  },
  onLaunch: function () {
    var token = new Token();
    token.verify();
  },

})