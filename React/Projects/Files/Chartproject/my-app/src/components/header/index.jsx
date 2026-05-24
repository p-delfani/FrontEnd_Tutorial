import ProfileDropdown from "./elements/profile-dropdown.jsx";

const Header = () => {
  return (
    <div id="client-header">
      <div className="stay-between">
        <div>
          <a href="#" className="select-none">
            مدیریت تراکنش های
            <strong className="sabz-pay">سبزپِی</strong>
          </a>
        </div>
        <div>
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
