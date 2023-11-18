import React from 'react';

const UserProfile = () => {
  return (
    <div className="pt-6">
      <div id="header-content" className="pl-4">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
          alt="Avatar"
          className="mb-4 h-auto rounded-full align-middle"
          style={{ maxWidth: '50px' }}
        />

        <h4 className="mb-2 text-2xl font-medium leading-[1.2]">Ann Smith</h4>
        <p className="mb-4">ann_s@mdbootstrap.com</p>
      </div>
      <hr className="border-gray-300" />
    </div>
  );
};

export default UserProfile;