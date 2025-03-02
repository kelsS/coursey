<template>
    <h2>Lesson</h2>
    <p>This is a lesson</p>
    <p>{{ chapter.title }}</p>
    <p>{{ lesson.title }}</p>
  </template>
  
  <script setup>
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

  // show course data in console
  console.log(course);
  </script>