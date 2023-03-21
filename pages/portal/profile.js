import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Styles from '/styles/profile.module.scss';
import { updateUserDetails } from '/store/userSlice';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';

export default function Profile() {
  const APIs = new AuthencticatedUserAPI();

  const dispatch = useDispatch();
  const { user_details } = useSelector((state) => state.user);

  const [userDetails, setUserDetails] = useState({});
  const [popup, setPopup] = useState(undefined);

  useEffect(() => {
    async function getData() {
      const { data } = await APIs.getUser();
      setUserDetails(data);
      dispatch(updateUserDetails(data));
    }
    if (Object.keys(user_details).length === 0) {
      getData();
    } else {
      setUserDetails(user_details);
    }
  }, []);

  return (
    <section className={Styles.profileCard}>
      <div className={Styles.userDetailsAndEdit}>
        <div className={Styles.userDetails}>
          <div>Name:</div>
          <span className={Styles.profileData}>
            {userDetails?.first_name}
            {userDetails?.last_name ? userDetails.last_name : ''}
          </span>
          <div>Email:</div>
          <span className={Styles.profileData}>{userDetails?.email}</span>
          <div>Phone:</div>
          <span className={Styles.profileData}>{userDetails?.mobile}</span>
        </div>
        <button
          className={Styles.edit}
          onClick={() => {
            setPopup('edit');
          }}
        >
          EDIT
        </button>
      </div>

      <div
        className={Styles.changePassword}
        onClick={() => {
          setPopup('changePassword');
        }}
      >
        CHANGE PASSWORD
      </div>
    </section>
  );
}
