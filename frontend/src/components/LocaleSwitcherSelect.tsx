import { Locale, routing, useRouter, usePathname } from "@/i18n/routing";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// import { useParams } from "next/navigation";

const LocaleSwitcherSelect = ({
  defaultValue,
  label,
}: {
  defaultValue: string;
  label: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  //   const params = useParams();

  const onSelectChange = (nextLocale: string) => {
    router.replace({ pathname }, { locale: nextLocale as Locale });
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={onSelectChange}>
      <SelectTrigger
        className="w-[80px] h-8 border-none bg-transparent focus:ring-0 focus:ring-offset-0"
        aria-label={label}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocaleSwitcherSelect;
