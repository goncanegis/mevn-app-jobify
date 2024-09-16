<script setup lang="ts">
import Logo from "~/assets/images/logo.svg?component";
</script>

<template>
  <Logo class="logo" />
</template>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  display: block;
}

@media screen and (min-width: 992px) {
  .logo {
    width: 140px;
    height: 40px;
    margin: 0;
  }
}
</style>
