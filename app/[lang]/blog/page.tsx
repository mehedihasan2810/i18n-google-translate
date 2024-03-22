import React from "react";
import { Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";

const Page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  console.log(lang);
  const dictionary = await getDictionary(lang);
  return (
    <div className="notranslate">
      <div>
        <h2 className="notranslate">google translate</h2>
        <p>Hi this is google translate</p>
      </div>
      <div className="notranslate">
        <h2>Static</h2>
        <p>{dictionary["blog"].static}</p>
      </div>
    </div>
  );
};

export default Page;
