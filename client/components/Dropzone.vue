<template>
  <div class="dropzone-container">
    <div
      v-bind="getRootProps()"
      :class="[
        { 'dropzone-disabled': props.disabled },
        'flex items-center gap-2',
      ]"
    >
      <input v-bind="getInputProps()" :disabled="props.disabled" />
      <div class="relative">
        <img
          v-if="defaultImg && !thumbnail"
          :src="defaultImg"
          class="w-12 h-12 min-w-12 rounded-full object-cover"
          alt=""
        />
        <img
          v-if="thumbnail"
          :src="thumbnail"
          alt=""
          class="w-12 h-12 min-w-12 rounded-full object-cover"
        />
      </div>

      <p class="text-sm truncate max-w-[180px]">{{ title }}</p>
    </div>

    <span title="Remove file">
      <UButton
        v-if="thumbnail"
        variant="soft"
        size="sm"
        icon="i-material-symbols:cancel"
        @click="emits('delete')"
      >
        <span class="sr-only">Remove file</span>
      </UButton>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useDropzone } from "vue3-dropzone";
import type { FileRejectReason } from "vue3-dropzone";

const props = defineProps({
  accept: {
    type: String,
    default: ".png, .jpg, .jpeg",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  defaultImg: {
    type: [String, null],
    default: null,
  },
  thumbnail: {
    type: [String, null],
    default: null,
  },
  title: {
    type: String,
    default: "Drop your files here",
  },
});

const emits = defineEmits(["file", "file-reject", "delete"]);

function onDrop(acceptedFiles: File[], rejectReasons: FileRejectReason[]) {
  if (acceptedFiles.length > 0) {
    emits("file", acceptedFiles[0]);
  } else {
    emits("file-reject", rejectReasons);
  }
}

const options = reactive({
  multiple: props.multiple,
  onDrop,
  accept: props.accept,
  disabled: props.disabled,
});

const { getRootProps, getInputProps, open } = useDropzone(options);

defineExpose({ open });
</script>

<style scoped>
.dropzone-disabled {
  pointer-events: none;
  opacity: 1;
}

.dropzone-container {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  border-radius: 0.375rem;
  cursor: pointer;
}
</style>
