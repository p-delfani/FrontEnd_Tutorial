import { useState } from "react";
import "./App.css";
import banks from "./../data/banks.js";

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv2, setCvv2] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [bank, setBank] = useState("");

  const findBankByCardNumber = (value) => {
    if (value.length >= 6) {
      const firstSixDigits = value.slice(0, 6);
      const mainBank = banks[firstSixDigits];
      setBank(mainBank || "");
    } else {
      setBank("");
    }
  };

  return (
    <>
      <div id="form-root">
        <div id="credit-card">
          <div className="card-header">
            {bank ? (
              <div className="card-price-field">
                <span className="payment-price">{bank}</span>
              </div>
            ) : null}
          </div>

          <div className="card-content">
            <div id="cardNumber-field" className="field!">
              <p className="field-label">شماره کارت:</p>
              <div className="card-number-field">
                <p
                  className={
                    cardNumber
                      ? "card-text-area"
                      : "cardNumber-is-empty card-text-area"
                  }
                >
                  {cardNumber}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 w-full! mt-6">
              <div id="cvv2-field" className="field">
                <p className="field-label">Cvv2:</p>
                <div className="card-cvv2-field">
                  <p
                    className={
                      cvv2 ? "card-text-area" : "cvv2-is-empty card-text-area"
                    }
                  >
                    {cvv2}
                  </p>
                </div>
              </div>

              <div className="grid max-w-max grid-cols-2 justify-end ms-auto! gap-2">
                <div id="expire-month-field" className="field">
                  <p className="field-label">ماه انقضا:</p>
                  <div className="card-expireDate-field">
                    <p
                      className={
                        expireMonth
                          ? "card-text-area"
                          : "expireDate-is-empty card-text-area"
                      }
                    >
                      {expireMonth}
                    </p>
                  </div>
                </div>

                <div id="expire-date-field" className="field">
                  <p className="field-label">سال انقضا:</p>
                  <div className="card-expireDate-field">
                    <p
                      className={
                        expireYear
                          ? "card-text-area"
                          : "expireDate-is-empty card-text-area"
                      }
                    >
                      {expireYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-body">
          <div className="w-full!">
            <label htmlFor="card-number" className="form-label">
              شماره کارت:
            </label>

            <div className="w-full">
              <input
                value={cardNumber}
                onChange={(event) => {
                  const value = event.target.value; // مقدار جدید
                  setCardNumber(value);
                  findBankByCardNumber(value); // با مقدار جدید بانک را پیدا کن
                }}
                placeholder="****"
                id="card-number"
                type="number"
                className="form-input"
              />
            </div>
          </div>

          <div className="w-full!">
            <label htmlFor="cvv2-num" className="form-label">
              CVV2:
            </label>

            <div className="w-full">
              <input
                value={cvv2}
                onChange={(event) => setCvv2(event.target.value)}
                placeholder="***"
                id="cvv2-num"
                type="number"
                className="form-input"
              />
            </div>
          </div>

          <div className="w-full! form-expiration" dir="ltr">
            <div>
              <label htmlFor="yearExpiration-num" className="form-label">
                سال انقضا:
              </label>

              <div className="w-full">
                <input
                  value={expireYear}
                  onChange={(event) => setExpireYear(event.target.value)}
                  id="yearExpiration-num"
                  type="number"
                  placeholder="**"
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="monthExpiration-num" className="form-label">
                ماه انقضا:
              </label>

              <div className="w-full">
                <input
                  value={expireMonth}
                  onChange={(event) => setExpireMonth(event.target.value)}
                  id="monthExpiration-num"
                  type="number"
                  placeholder="**"
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div id="form-buttons">
          <button id="cancel-button">انصراف</button>
          <button id="submit-button">تائید و پرداخت</button>
        </div>

        <div className="text-yellow-600 rounded-lg border border-yellow-300 text-xs space-y-1.5 p-3 bg-yellow-500/10 w-full border-t">
          <p className="">* تمامی فیلد ها اجباری هستند</p>
          <p className="">
            * جهت جلوگیری از باطل شدن کارت, اطلاعات خود را با دقت وارد نمائید
          </p>
          <p className="">* تمامی اطلاعات برای سامانه سبز پی محفوظ می‌باشد</p>
        </div>
      </div>

      <div id="background-overlay">
        <div id="background-orb"></div>
      </div>
    </>
  );
}

export default App;
