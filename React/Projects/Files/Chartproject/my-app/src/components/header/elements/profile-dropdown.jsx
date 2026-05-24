const ProfileDropdown = () => {
  return (
    <div className="profile-wrap">
      <button id="profile-dropdown">
        <img
          src="/images/avatar.jpg"
          alt=""
          className="object-cover rounded-full"
        />
      </button>
      <div className="space-y-1">
        <span className="text-sm">سلام محمدامین عزیز 👋</span>
        <p className="tag">مالک</p>
      </div>
    </div>
  );
};

export default ProfileDropdown;
