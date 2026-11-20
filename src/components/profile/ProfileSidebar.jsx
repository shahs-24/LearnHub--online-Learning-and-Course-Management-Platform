import { Link } from "react-router-dom";
import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/fetchUser";
import { FaPencilAlt, FaBookOpen } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";

const ProfileSidebar = () => {
  const { user } = useAuth();

  return (
    <aside className={Styles.sidebar}>
      <picture>
        <Link to={"update-profile-picture"} className={Styles.profilePic}>
          <HiOutlinePencilAlt />
          <img src={user?.avatar?.url} alt="avatar" />
        </Link>
      </picture>

      <figcaption>
        <Link to={"update-user-info"}>
          <span className={Styles.icon}>
            <FaPencilAlt />
          </span>
        </Link>

        <h1>{user?.name}</h1>
      </figcaption>

      {/* My Learning */}
      <nav className={Styles.profileMenu}>
        <Link to={"my-learning"} className={Styles.profileMenuItem}>
          <span className={Styles.profileMenuIcon}>
            <FaBookOpen />
          </span>

          <span>My Learning</span>
        </Link>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
