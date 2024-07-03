import { router } from "@moraki/inertia-react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect } from "react";
import Dropdown from "./Dropdown";
import { LanguageIcon } from "./Icons";

const LanguageSwitcher = ({ initialLocale }) => {
    const { t, setLocale, getLocales, currentLocale } = useLaravelReactI18n();

    useEffect(() => {
        setLocale(initialLocale ?? "es");
    }, []);

    const handleLocaleChange = async (locale) => {
        if (currentLocale() === locale) return;

        router.visit(route("setlang", { locale }));
    };

    return (
        <div className="relative">
            <Dropdown>
                <Dropdown.Trigger>
                    <LanguageIcon
                        size={24}
                        className="opacity-75 hover:opacity-50 hover:cursor-pointer"
                    />
                </Dropdown.Trigger>
                <Dropdown.Content width="32">
                    <p className="px-4 py-1 text-sm font-bold">Lenguaje</p>
                    {getLocales().map((locale) => (
                        <div key={locale}>
                            <Dropdown.Divider />
                            <div
                                onClick={() => handleLocaleChange(locale)}
                                className={
                                    "text-sm text-gray-800 px-4 py-2 cursor-pointer hover:bg-gray-200 " +
                                    (currentLocale() === locale
                                        ? "font-bold bg-gray-100"
                                        : "")
                                }
                            >
                                {t("pages.language-switcher." + locale)}
                            </div>
                        </div>
                    ))}
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
};

export default LanguageSwitcher;
