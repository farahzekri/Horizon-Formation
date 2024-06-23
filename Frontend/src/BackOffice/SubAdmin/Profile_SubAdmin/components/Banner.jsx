import React, { useState, useEffect } from 'react';
import logo from "assets/img/avatars/logo.jpg";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import userService from '../../../../services/authServices';
import { useParams } from 'react-router-dom';

const Banner = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const { username } = useParams();


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await userService.getUserProfile(username);
        setUserProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 left-5 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={logo} alt="" />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-10 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white ">
        {userProfile.username}
        </h4>
        <p className="text-base font-normal text-gray-600">{userProfile.role}</p>
      </div>
    </Card>
  );
};

export default Banner;
