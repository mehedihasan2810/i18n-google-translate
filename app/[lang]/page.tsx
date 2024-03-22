import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <p className="notranslate">Current locale: {lang}</p>

      <div>
        <h2 className="notranslate">Google translation</h2>
        <p>Welcome. How are you</p>
      </div>

      <div className="notranslate">
        <h2>Static</h2>
        <p>{dictionary["welcome"].welcome}</p>
      </div>
    </div>
  );
}
