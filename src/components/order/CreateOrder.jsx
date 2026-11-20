import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createOrder } from "../../services/api/courseServices";
import Styles from "./_createOrder.module.css";

const CreateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    const permission = window.confirm(
      "Are you sure you want to enroll in this course?"
    );

    if (!permission) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        courseId: id,
        payment_info: {
          id: `mock_payment_${Date.now()}`,
          status: "succeeded",
        },
      };

      const response = await createOrder(payload);

      if (response?.success) {
        toast.success("Course enrolled successfully!");

        navigate("/user/profile");
      } else {
        toast.error(response?.message || "Enrollment failed");
      }
    } catch (error) {
      console.error("Enrollment error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while enrolling"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={Styles.orderPage}>
      <div className={Styles.orderCard}>
        <div className={Styles.icon}>🎓</div>

        <h1>Ready to Learn?</h1>

        <p>
          Confirm your enrollment and start learning this course.
        </p>

        <button
          className={Styles.confirmButton}
          onClick={handleEnroll}
          disabled={loading}
        >
          {loading ? "Enrolling..." : "Confirm Enrollment"}
        </button>

        <button
          className={Styles.cancelButton}
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default CreateOrder;