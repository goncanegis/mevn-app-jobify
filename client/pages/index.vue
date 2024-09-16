<script setup lang="ts">
import main from "~/assets/images/main.svg?inline";
</script>

<template>
  <section>
    <div class="container page">
      <div class="info">
        <h1>job <span>tracking</span> app</h1>
        <p>
          I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
          bottle single-origin coffee chia. Aesthetic post-ironic venmo, quinoa
          lo-fi tote bag adaptogen everyday carry meggings +1 brunch narwhal.
        </p>
        <ULink to="/register" class="btn register-link me-4 mb-4 sm:mb-0">
          Register
        </ULink>
        <ULink to="/login" class="btn"> Login / Demo User </ULink>
      </div>
      <img :src="main" alt="job hunt" class="img main-img" />
    </div>
  </section>
</template>

<style scoped>
nav {
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  height: var(--nav-height);
  display: flex;
  align-items: center;
}
.page {
  min-height: calc(100vh - var(--nav-height));
  display: grid;
  align-items: center;
  margin-top: -3rem;
}
h1 {
  font-weight: 700;
  span {
    color: var(--primary-500);
  }
  margin-bottom: 1.5rem;
}
p {
  line-height: 2;
  color: var(--text-secondary-color);
  margin-bottom: 1.5rem;
  max-width: 35em;
}
.register-link {
  margin-right: 1rem;
}
.main-img {
  display: none;
}
.btn {
  padding: 0.75rem 1rem;
}
@media (min-width: 992px) {
  .page {
    grid-template-columns: 1fr 400px;
    column-gap: 3rem;
  }
  .main-img {
    display: block;
  }
}
</style>
