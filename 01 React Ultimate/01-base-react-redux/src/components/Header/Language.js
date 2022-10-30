import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

const lngs = {
  en: { nativeName: "English" },
  vi: { nativeName: "Tiếng Việt" },
};

function Language() {
  const { t, i18n } = useTranslation();
  return (
    <NavDropdown
      title={lngs[i18n.resolvedLanguage].nativeName || "Language"}
      id="basic-nav-dropdown"
    >
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          style={{ fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal" }}
          type="submit"
          className="dropdown-item"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng].nativeName}
        </button>
      ))}
    </NavDropdown>
  );
}

export default Language;
