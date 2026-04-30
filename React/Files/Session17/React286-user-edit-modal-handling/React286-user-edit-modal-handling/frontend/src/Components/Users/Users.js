import React, { useEffect, useState } from "react";
import ErrorBox from "../Errorbox/Errorbox";
import DeleteModal from './../DeleteModal/DeleteModal'
import EditModal from './../EditModal/EditModal'
import { AiOutlineDollarCircle } from "react-icons/ai";

import './Users.css'

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [mainUserID, setMainUserID] = useState(null)

  useEffect(() => {
    getAllUsers()
  }, []);

  function getAllUsers () {
    fetch(`http://localhost:8000/api/users`)
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }

  const closeDeleteModal = () => setIsShowDeleteModal(false)
  const closeEditModal = () => setIsShowEditModal(false)
  
  const removeUser = () => {
    console.log(mainUserID);
    fetch(`http://localhost:8000/api/users/${mainUserID}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setIsShowDeleteModal(false)
      getAllUsers()
    })
  }

  const updateUser = event => {
    event.preventDefault()
    console.log('اطلاعات کاربر مورد نظر اپدیت شد');
    setIsShowEditModal(false)
  }

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
                <td>{user.firsname}-{user.lastname}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => {
                    setIsShowDeleteModal(true)
                    setMainUserID(user.id)
                  }}>حذف</button>
                  <button>جزییات</button>
                  <button onClick={() => {
                    setIsShowEditModal(true)
                    setMainUserID(user.id)
                  }}>ویرایش</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ کاربری یافت نشد" />
      )}
      {
        isShowDeleteModal && (
          <DeleteModal
            title="آیا از حذف اطمینان دارید؟"
            cancelAction={closeDeleteModal}
            submitAction={removeUser}
          />
        )
      }
      {
        isShowEditModal && (
          <EditModal
            onClose={closeEditModal}
            onSubmit={updateUser}
          >
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text" className="edit-user-info-input" placeholder="مقدار جدید را وارد نمایید" />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text" className="edit-user-info-input" placeholder="مقدار جدید را وارد نمایید" />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text" className="edit-user-info-input" placeholder="مقدار جدید را وارد نمایید" />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text" className="edit-user-info-input" placeholder="مقدار جدید را وارد نمایید" />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text" className="edit-user-info-input" placeholder="مقدار جدید را وارد نمایید" />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text" className="edit-user-info-input" placeholder="مقدار جدید را وارد نمایید" />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text" className="edit-user-info-input" placeholder="مقدار جدید را وارد نمایید" />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text" className="edit-user-info-input" placeholder="مقدار جدید را وارد نمایید" />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text" className="edit-user-info-input" placeholder="مقدار جدید را وارد نمایید" />
            </div>
            <div className="edit-user-info-input-group">
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text" className="edit-user-info-input" placeholder="مقدار جدید را وارد نمایید" />
            </div>
          </EditModal>
        )
      }
    </div>
  );
}
