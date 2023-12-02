import { useMemo } from "react";

export const useCourses = (courses, query) => {
  const searchCourses = useMemo(() => {
    if (query) {
      return courses.filter((course) =>
        course.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    return courses;
  }, [query, courses]);
  return searchCourses;
};
