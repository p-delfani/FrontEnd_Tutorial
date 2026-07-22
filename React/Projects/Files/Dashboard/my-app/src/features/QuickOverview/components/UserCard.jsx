const UserCard = ({ fullName, email, profile }) => {
  return (
    <article className="flex h-20 rounded-md bg-gradient-to-b from-zinc-50/50 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)] border p-4 items-center primary-border-color gap-5">
      <div className="size-14 rounded-full overflow-hidden">
        <img src={profile} alt="Avatar" className="size-full object-cover" />
      </div>
      <div className="text-xs space-y-1">
        <p>
          کاربر
          <span className="inline-block text-green-500 px-1">
            <strong>{fullName}</strong>
          </span>
          داخل وبسایت ثبت نام کرد
        </p>
        <p className="text-neutral-500/80">{email}</p>
      </div>
    </article>
  );
};

export default UserCard;
