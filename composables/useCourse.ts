// get course data
import courseData  from "./courseData"

// export course data
export const useCourse = () => {
  return {
    // map out the course chapters and course data then spread the chapters to chapter param and spread the lessons within chapters to lesson param
    ...courseData,
    chapters:  courseData.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => ({
        ...lesson,
        path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
      }))
    }))
  }
}
