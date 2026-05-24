import {
  HiMiniClipboardDocumentCheck,
  HiMiniPresentationChartLine,
  HiOutlineBanknotes,
  HiOutlineShieldExclamation,
} from "react-icons/hi2";

const Summary = () => {
  return (
    <div className="summaries">
      <div>
        <div className="summary-icon">
          <HiMiniPresentationChartLine />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-zinc-600">تعداد تراکنش ها</p>
          <p>
            <strong className="summary-value">5,765</strong>
          </p>
        </div>
      </div>
      <div>
        <div className="summary-icon">
          <HiMiniClipboardDocumentCheck />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-zinc-600">تراکنش های موفق</p>
          <p>
            <strong className="summary-value">5,765</strong>
          </p>
        </div>
      </div>
      <div>
        <div className="summary-icon">
          <HiOutlineShieldExclamation />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-zinc-600">تراکنش های ناموفق</p>
          <p>
            <strong className="summary-value">5,765</strong>
          </p>
        </div>
      </div>
      <div>
        <div className="summary-icon">
          <HiOutlineBanknotes />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-zinc-600">مبلغ کل</p>
          <p>
            <strong className="summary-value">5,765</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
