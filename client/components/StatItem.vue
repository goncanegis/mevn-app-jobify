<script setup lang="ts">
const props = defineProps<{
  title: string;
  count: number;
  icon: string;
  color: string;
  bcg: string;
}>();

const style = computed(() => {
  if (!props.color || !props.bcg) {
    return {
      color: "#000",
      bcg: "#fff",
    };
  }

  return {
    color: props.color,
    bcg: props.bcg,
  };
});
</script>

<template>
  <article>
    <header>
      <span class="count">{{ props.count }}</span>
      <div class="icon">
        <UIcon
          v-if="props.icon"
          class="text-[64px]"
          :name="props.icon"
          :style="{ backgroundColor: style.color }"
        />
      </div>
    </header>
    <h5 class="title">{{ props.title }}</h5>
  </article>
</template>

<style scoped>
article {
  padding: 2rem;
  background: var(--background-secondary-color);
  border-bottom: 5px solid v-bind("style.color");
  border-radius: var(--border-radius);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;

    line-height: 2;
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: left;
    margin-top: 0.5rem;
    font-size: 1.25rem;
  }
  .icon {
    width: 70px;
    height: 70px;
    background: v-bind("style.bcg");
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
