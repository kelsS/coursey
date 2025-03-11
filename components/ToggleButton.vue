<template>
    <label
      class="rounded text-white font-bold py-2 px-4 cursor-pointer relative md:hidden"
      :class="{
        'bg-green-500': !modelValue,
        'bg-gray-500': modelValue,
      }">
      <button         
        :aria-expanded="modelValue"
        @click="() => $emit('update:modelValue', !modelValue)"
        class="">
        {{ modelValue ? `Close Chapters menu` : 'Open Chapters menu' }}
      </button>
    </label>
</template>

<script setup lang="ts">
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