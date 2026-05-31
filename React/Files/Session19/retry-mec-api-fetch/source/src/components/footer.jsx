import React from "react";

export default function Footer() {
  return (
    <footer className="mt-40  border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">
              سرچ همیشه سبز
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              پلتفرم جستجوی هوشمند برای یافتن بهترین محصولات
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-neutral-800 mb-3">
              محصولات
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  لپ تاپ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  موبایل
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  لوازم جانبی
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  تخفیف‌ها
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-neutral-800 mb-3">شرکت</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  درباره ما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  تماس با ما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  بلاگ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  فرصت‌های شغلی
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-neutral-800 mb-3">
              پشتیبانی
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  راهنما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  سوالات متداول
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  حریم خصوصی
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  شرایط استفاده
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            © ۱۴۰۴ سرچ همیشه سبز. تمامی حقوق محفوظ است.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="text-neutral-500 hover:text-neutral-800 transition-colors"
              aria-label="اینستاگرام"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-neutral-500 hover:text-neutral-800 transition-colors"
              aria-label="تلگرام"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-neutral-500 hover:text-neutral-800 transition-colors"
              aria-label="توییتر"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
