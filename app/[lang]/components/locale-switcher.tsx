"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "../../../i18n-config";
import { useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const languages = [
  { label: "English", value: "en" },
  { label: `Malay`, value: "ms" },
  { label: "Arabic", value: "ar" },
];

export default function LocaleSwitcher() {
  const [selectedLang, setSelectedLang] = useState("/auto/en");
  const pathName = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  const langChange = (e: any) => {
    const locale = e.target.value;
    console.log(locale);
    console.log(`/auto/${locale}`);

    if (`/auto/${locale}` === selectedLang) {
      return;
    }

    if (hasCookie("googtrans")) {
      setCookie("googtrans", decodeURI(`/auto/${locale}`));
      setSelectedLang(`/auto/${locale}`);
    } else {
      setCookie("googtrans", `/auto/${locale}`);
      setSelectedLang(`/auto/${locale}`);
    }

    redirectedPathName(locale);
  };

  const googleTranslateElementInit = () => {
    // @ts-ignore
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "auto",
        autoDisplay: false,
        includedLanguages: "en,ms,ar", // If you remove it, by default all google supported language will be included
        // @ts-ignore
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    // @ts-ignore
    window.googleTranslateElementInit = googleTranslateElementInit;

    if (hasCookie("googtrans")) {
      // @ts-ignore
      setSelectedLang(getCookie("googtrans"));
    } else {
      setSelectedLang("/auto/en");
    }
  }, []);

  return (
    <div>
      <div className="sr-only" id="google_translate_element" />
      <select
        className="notranslate"
        value={selectedLang.replace("/auto/", "")}
        onChange={langChange}
      >
        {languages.map((lang, index) => (
          <option key={index} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
