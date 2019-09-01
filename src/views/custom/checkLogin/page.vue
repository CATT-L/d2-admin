
<template>
</template>

<script>

/**
 * 2019-08-16
 * Powered By CATT-L
 * 
 */

import { mapActions } from 'vuex';

export default {
  components: {
  },
  data () {
    return {
    }
  },
  created (){

    // 尝试用 Token 登录
    this.login()
    .then(() => {
      // 登录成功
      this.$router.push("/index");
    })
    .catch(() => {
      // 登录失败
      this.$router.push("/login");
    });

  },

  methods: {
    ...mapActions('d2admin/account', [
      'login'
    ])
  }
}
</script>
