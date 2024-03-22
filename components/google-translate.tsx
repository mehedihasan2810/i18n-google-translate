"use client";

/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from "cookies-next";

// import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

const languages = [
  { label: "English", value: "/auto/en" },
  { label: `Malay`, value: "/auto/ms" },
  { label: "Arabic", value: "/auto/ar" },
];

import React from "react";
// import { cn } from "./lib/utils";
// import { Button } from "./components/ui/button";

const GoogleTranslate = () => {
  const [isLangSwitcherOpen, setIsLangSwitcherOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("/auto/en");

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

  // @ts-ignore
  const langChange = (e: string) => {
    if (e === selectedLang) {
      setIsLangSwitcherOpen(false);
      return;
    }
    if (hasCookie("googtrans")) {
      setCookie("googtrans", decodeURI(e));
      setSelectedLang(e);
    } else {
      setCookie("googtrans", e);
      setSelectedLang(e);
    }
    setIsLangSwitcherOpen(false);
    window.location.reload();
  };

  

  return (
    <div>
      <div className="sr-only" id="google_translate_element" />

      <select name="lang" id="lang">
        {languages.map((lang, index) => (

        <option value={lang.value}>{lang.label}</option>
        ))}
        {/* <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option> */}
      </select>

      {/* <Popover open={isLangSwitcherOpen} onOpenChange={setIsLangSwitcherOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isLangSwitcherOpen}
            className="w-[200px] justify-between"
          >
            {
              languages.find((framework) => framework.value === selectedLang)
                ?.label
            }
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandGroup>
              {languages.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={langChange}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedLang === framework.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover> */}
    </div>
  );
};

export default GoogleTranslate;
