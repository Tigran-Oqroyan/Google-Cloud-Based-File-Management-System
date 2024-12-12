import { useSelector } from "react-redux";
import am from "../languages/am";
import ru from "../languages/ru";
import en from "../languages/en";
import de from "../languages/de";
import es from "../languages/es";
import fr from "../languages/fr";
import it from "../languages/it";
import ka from "../languages/ka";
import pt from "../languages/pt";
import sv from "../languages/sv";
import uk from "../languages/uk";

const languages = { am, ru, en, de, es, it, fr, ka, pt, sv, uk };

export const useTranslation = () => {
  const language = useSelector((state) => state.language);
  const t = (word) => {
    return languages[language][word] ? languages[language][word] : word;
  };
  return { t };
};
