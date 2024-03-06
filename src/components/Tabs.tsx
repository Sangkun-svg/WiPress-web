import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, Tab } from "@mui/material";

export const TAB_ITEMS = [
  {
    label: "All",
    key: "/",
  },
  {
    label: "보도요청",
    key: "registerPost",
  },
  {
    label: "전체기사",
    key: "article",
  },
  {
    label: "공지사항",
    key: "notice",
  },
  {
    label: "자료실",
    key: "info",
  },
];

const setCurrentTab = (pathname: string): number | undefined => {
  if (pathname === "/") return 0;
  if (pathname === "/registerPost") return 1;
  if (pathname === "/article") return 2;
  if (pathname === "/notice") return 3;
  if (pathname === "/info") return 4;
};

export default function CenteredTabs() {
  const route = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    route.push(TAB_ITEMS[newValue].key);
  };

  useEffect(() => {
    const currentTabNumber = setCurrentTab(pathname);
    setValue(currentTabNumber as number);
  }, [pathname]);
  return (
    <Tabs
      textColor="inherit"
      value={value}
      onChange={handleChange}
      sx={{
        "& .MuiTabs-flexContainer": {
          gap: "18px",
        },
      }}
      TabIndicatorProps={{
        style: {
          backgroundColor: "#0B834B",
        },
      }}
    >
      {TAB_ITEMS.map((el: { key: string; label: string }) => {
        return (
          <Tab
            label={el.label}
            key={el.label}
            style={{ minWidth: "60px", minHeight: "50px", padding: 0 }}
            sx={{
              "&.Mui-selected": {
                color: "#0B834B"
              }
            }}
          />
        );
      })}
    </Tabs>
  );
}
