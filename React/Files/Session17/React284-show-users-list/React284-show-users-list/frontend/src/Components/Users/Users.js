import React, { useEffect, useState } from "react";
import ErrorBox from "../Errorbox/Errorbox";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/users`)
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);

  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کاربران</h1>

      {users.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>یوزرنیم</th>
              <th>رمز عبور</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button>حذف</button>
                  <button>جزییات</button>
                  <button>ویرایش</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ کاربری یافت نشد" />
      )}
    </div>
  );
}
