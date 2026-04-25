function NoCity({ onClose }) {
  return (
    <div id="modal-screen">
      <div id="modal-content">
        <div id="danger-icon">
          <i className="fa-solid fa-exclamation"></i>
        </div>
        <p id="modal-title">یافت نشد !</p>
        <p id="modal-caption">متاسفانه شهر مدنظر شما پیدا نشد !</p>

        <div id="modal-footer" onClick={onClose}>
          <button id="close-btn">تایید</button>
        </div>
      </div>
    </div>
  );
}

export default NoCity;
