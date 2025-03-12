<template>
      <label
        for="toggle-button">
        <span class="visually-hidden md:hidden">{{ modelValue ? `Close Chapters menu` : 'Open Chapters menu' }}</span>
      </label>
      <button
        class="relative md:hidden rounded text-white font-bold py-2 px-4 cursor-pointer"
        :class="{
          'bg-green-500': !modelValue,
          'bg-gray-500': modelValue,
        }" 
        id="toggle-button"       
        :aria-expanded="modelValue"
        @click="() => $emit('update:modelValue', !modelValue)">
        {{ modelValue ? `Close` : `Open` }}
      </button>
</template>

<script setup lang="ts">

  const closeIcon = `<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>`

  // get course
  const course = useCourse();
  // get route
  const route = useRoute();
  
  // get chapter by chapter slug
  const chapter = computed(() => {
    return course.chapters.find(
      (chapter) => chapter.slug === route.params.chapterSlug
    );
  });
  
  // get lesson by lesson slug
  const lesson = computed(() => {
    return chapter.value.lessons.find(
      (lesson) => lesson.slug === route.params.lessonSlug
    );
  });

  // set dynamic title
  const title = computed(() => {
    return `${lesson.value.title}`;
  })
  useHead({
    title
  })

  defineProps({
        modelValue: {
            type: Boolean,
            default: false,
        },
    });

    defineEmits(['update:modelValue']);
</script>
  
<style scoped>
    ::selection {
    display: none;
    }
</style>