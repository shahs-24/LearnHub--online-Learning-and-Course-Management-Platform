
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/fetchUser";
import Styles from "./_home.module.css";

const HomePage = () => {
  const { user, getLmsHomeApi } = useAuth();

  const [featured, setFeatured] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [newest, setNewest] = useState([]);

  const [loading, setLoading] = useState(true);

  const getHomeCourses = async () => {
    try {
      const data = await getLmsHomeApi();

      if (data?.success) {
        setFeatured(data.featured || []);
        setTopRated(data.topRated || []);
        setNewest(data.newest || []);
      }
    } catch (error) {
      console.log("Error while fetching home courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHomeCourses();
  }, []);

  const CourseCard = ({ course }) => {
    return (
      <div className={Styles.courseCard}>

        <div className={Styles.courseImage}>
          {course.thumbnail?.url ? (
            <img
              src={course.thumbnail.url}
              alt={course.name}
            />
          ) : (
            <div className={Styles.noImage}>
              No Image
            </div>
          )}
        </div>

        <div className={Styles.courseContent}>

          <span className={Styles.category}>
            {course.category}
          </span>

          <h3>{course.name}</h3>

          <div className={Styles.courseStats}>
            <span>⭐ {course.ratings}</span>
            <span>👥 {course.purchased} enrolled</span>
          </div>

          <div className={Styles.courseBottom}>

            <span className={Styles.price}>
              ${course.price}
            </span>

            <Link to={`/courses/${course._id}`}>
              <button className={Styles.viewButton}>
                View Course
              </button>
            </Link>

          </div>

        </div>
      </div>
    );
  };

  return (
    <section className={Styles.homePage}>

      {/* Hero Section */}
      <div className={Styles.hero}>

        <div className={Styles.heroContent}>
          <span className={Styles.heroBadge}>
            Learn. Grow. Succeed.
          </span>

          <h1>
            Welcome
            {user?.name ? `, ${user.name}` : ""}
          </h1>

          <p>
            Explore high-quality courses and build the skills
            you need for your career.
          </p>

          <Link to="/courses">
            <button className={Styles.exploreButton}>
              Explore All Courses
            </button>
          </Link>
        </div>

      </div>

      {/* Loading */}
      {loading ? (
        <div className={Styles.loading}>
          <p>Loading courses...</p>
        </div>
      ) : (
        <>

          {/* Featured Courses */}
          <section className={Styles.courseSection}>

            <div className={Styles.sectionHeader}>
              <div>
                <span className={Styles.sectionLabel}>
                  HANDPICKED FOR YOU
                </span>

                <h2>Featured Courses</h2>

                <p>
                  Discover some of our most popular courses.
                </p>
              </div>
            </div>

            <div className={Styles.courseGrid}>
              {featured.length > 0 ? (
                featured.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                  />
                ))
              ) : (
                <p>No featured courses available.</p>
              )}
            </div>

          </section>


          {/* Top Rated Courses */}
          <section className={Styles.courseSection}>

            <div className={Styles.sectionHeader}>
              <div>
                <span className={Styles.sectionLabel}>
                  STUDENTS LOVE THESE
                </span>

                <h2>Top Rated Courses</h2>

                <p>
                  Learn from courses that students are choosing.
                </p>
              </div>
            </div>

            <div className={Styles.courseGrid}>
              {topRated.length > 0 ? (
                topRated.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                  />
                ))
              ) : (
                <p>No top rated courses available.</p>
              )}
            </div>

          </section>


          {/* Newest Courses */}
          <section className={Styles.courseSection}>

            <div className={Styles.sectionHeader}>
              <div>
                <span className={Styles.sectionLabel}>
                  JUST ADDED
                </span>

                <h2>Newest Courses</h2>

                <p>
                  Check out the latest courses added to LearnHub.
                </p>
              </div>
            </div>

            <div className={Styles.courseGrid}>
              {newest.length > 0 ? (
                newest.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                  />
                ))
              ) : (
                <p>No newest courses available.</p>
              )}
            </div>

          </section>

        </>
      )}

    </section>
  );
};

export default HomePage;

