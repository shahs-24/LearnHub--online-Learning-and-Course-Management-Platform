import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/fetchUser";
import Styles from "./_createCourse.module.css";

const CourseList = () => {
  const {
    getAllCoursesApi,
    getLmsCategoriesApi,
    searchLmsCoursesApi,
  } = useAuth();

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  // Get all courses
  const getCourses = async () => {
    try {
      const data = await getAllCoursesApi();
      setCourses(data?.courses || []);
    } catch (error) {
      console.log("Error while fetching courses:", error);
    }
  };

  // Get course categories
  const getCategories = async () => {
    try {
      const data = await getLmsCategoriesApi();

      if (data?.success) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.log("Error while fetching categories:", error);
    }
  };

  // Search courses
  const searchCourses = async () => {
    if (!search.trim()) {
      getCourses();
      return;
    }

    try {
      const data = await searchLmsCoursesApi(search.trim());

      if (data?.success) {
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.log("Error while searching courses:", error);
    }
  };

  useEffect(() => {
    getCourses();
    getCategories();
  }, []);

  return (
    <section className={Styles.coursePage}>

      {/* Header */}
      <div className={Styles.courseHeader}>
        <h1>All Courses</h1>

        <p>Explore our available courses</p>

        {/* Search Bar */}
        <div className={Styles.searchBox}>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchCourses();
              }
            }}
          />

          <button
            type="button"
            onClick={searchCourses}
            className={Styles.searchButton}
          >
            Search
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className={Styles.categorySection}>
        <h2>Categories</h2>

        <div className={Styles.categoryList}>

          {/* All Courses */}
          <div className={Styles.categoryCard}>
            <span className={Styles.categoryTitle}>
              All Courses
            </span>

            <span className={Styles.categoryCount}>
              {courses.length}
            </span>
          </div>

          {/* Categories */}
          {categories.map((category) => (
            <div
              className={Styles.categoryCard}
              key={category.title}
            >
              <span className={Styles.categoryTitle}>
                {category.title}
              </span>

              <span className={Styles.categoryCount}>
                {category.count}
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* Courses */}
      <div className={Styles.courseGrid}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              className={Styles.courseCard}
              key={course._id}
            >
              <div className={Styles.courseImage}>
                <img
                  src={course.thumbnail?.url}
                  alt={course.name}
                />
              </div>

              <div className={Styles.courseInfo}>
                <h2>{course.name}</h2>

                <p>{course.description}</p>

                <div className={Styles.courseDetails}>
                  <span>₹{course.price}</span>
                  <span>{course.level}</span>
                </div>

                <Link to={`/courses/${course._id}`}>
                  <button className={Styles.editButton}>
                    View Course
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className={Styles.noCourses}>
            <h2>No courses found</h2>
            <p>Try searching with a different course name.</p>
          </div>
        )}
      </div>

    </section>
  );
};

export default CourseList;