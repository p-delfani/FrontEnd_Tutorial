import React from "react";

const FormHeader = () => {
  return (
    <header>
      <h1 className="text-2xl font-black! text-zinc-700">
        ثبت‌نام آنلاین دانشجو
      </h1>
      <p className="text-zinc-500 max-w-xl text-[15px] mt-2">
        لطفاً اطلاعات کامل خود را برای ورود به دوره‌های دانشگاهی وارد کنید. این
        فرم به صورت مرحله‌ای پیش می‌رود و پس از تکمیل، پروفایل شما ایجاد خواهد
        شد.
      </p>
    </header>
  );
};

export default FormHeader;
