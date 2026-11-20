import { useEffect, useState } from "react";
import { FaBookOpen, FaPlay } from "react-icons/fa";
import { getMyLearning } from "../../services/api/courseServices";
import Styles from "./_profile.module.css";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyLearning = async () => {
    try {
      const response = await getMyLearning();

      console.log("My Learning:", response);

      setCourses(response?.continueLearning || []);
    } catch (error) {
      console.error("My Learning Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyLearning();
  }, []);

  if (loading) {
    return (
      <aside className={Styles.content}>
        <div className={Styles.learningLoading}>
          Loading your courses...
        </div>
      </aside>
    );
  }

  return (
    <aside className={Styles.content}>
      <div className={Styles.learningHeader}>
        <div>
          <h1>My Learning</h1>
          <p>Continue learning and track your progress.</p>
        </div>

        <div className={Styles.courseCount}>
          <FaBookOpen />
          <span>{courses.length} Courses</span>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className={Styles.emptyLearning}>
          <FaBookOpen />
          <h2>No courses yet</h2>
          <p>
            You haven't enrolled in any courses yet.
          </p>
        </div>
      ) : (
        <div className={Styles.learningGrid}>
          {courses.map((item) => {
            const course = item.course;
            const enrollment = item.enrollment;

            return (
              <article
                className={Styles.learningCard}
                key={enrollment._id}
              >
                <div className={Styles.learningImage}>
                  <img
                    src={course?.thumbnail?.url}
                    alt={course?.name}
                  />

                  <span className={Styles.learningLevel}>
                    {course?.level}
                  </span>
                </div>

                <div className={Styles.learningCardBody}>
                  <span className={Styles.learningCategory}>
                    {course?.category}
                  </span>

                  <h2>{course?.name}</h2>

                  <div className={Styles.progressHeader}>
                    <span>Progress</span>
                    <strong>{enrollment?.progress || 0}%</strong>
                  </div>

                  <div className={Styles.progressBar}>
                    <div
                      className={Styles.progressFill}
                      style={{
                        width: `${enrollment?.progress || 0}%`,
                      }}
                    ></div>
                  </div>

                  <button className={Styles.continueButton}>
                    <FaPlay />
                    Continue Learning
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default MyLearning;