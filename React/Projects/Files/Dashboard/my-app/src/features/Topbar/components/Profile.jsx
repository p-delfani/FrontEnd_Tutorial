import { AVATAR_URL } from "../../../data/constants";

const Profile = () => {
  return (
    <div
      tabindex="1"
      className="flex focus-within:ring-2 focus-within:ring-black/20 cursor-pointer items-center gap-2 select-none p-3 hover:bg-black/5 rounded-md duration-150"
    >
      <div className="size-10">
        <img
          className="size-full rounded-full object-cover"
          src={AVATAR_URL}
          alt="User Avatar"
        />
      </div>
      <div>
        <p className="text-sm font-bold">محمدامین سعیدی راد</p>
        <p className="text-xs text-gray-600">مدیرعامل</p>
      </div>
    </div>
  );
};

export default Profile;
