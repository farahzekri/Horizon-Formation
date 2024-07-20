import React, { useState, useEffect } from 'react';
import logo from "assets/img/avatars/logo.jpg";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { get_User_By_Username } from '../../../../services/UserService';
import { useParams, Link } from 'react-router-dom';

const Banner = () => {
  const { username } = useParams(); // Extract username from URL params
  const [formData, setFormData] = useState({
    username: '',
    role: '',
    status: '', // Add status field
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await get_User_By_Username(username);
        setFormData({
          username: data.username,
          role: data.role,
          status: data.status, // Update status field
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, [username]);

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Back button */}
      <div className="w-full flex justify-start mb-4">
        <Link to="/admin/Utilisateurs" className="text-blue-500 hover:text-blue-700 flex items-center">
          <span className="mr-1">&#8592;</span> {/* Unicode arrow character */}
          Retour
        </Link>
      </div>
      
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
        <h4 className="text-xl font-bold text-navy-700 dark:text-white flex items-center">
          {formData.username}
          {formData.status === 'actif' ? (
            <span className="ml-2 h-2 w-2 rounded-full bg-green-500"></span>
          ) : (
            <span className="ml-2 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </h4>
        <p className="text-base font-normal text-gray-600">{formData.role}</p>
      </div>
    </Card>
  );
};

export default Banner;
