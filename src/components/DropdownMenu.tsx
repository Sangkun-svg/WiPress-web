import { useState } from "react";
import{
  MenuButton,
  List,
  ListItem,
  ListItemDecorator,
  Menu,
  MenuItem,
  Dropdown
} from "@mui/joy";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

export default function DropdownMenu() {
  const SIZES = ["Pick 많은 순", "최근 날짜 순", "좋아요 순", "나의 Pick"];
  const [size, setSize] = useState(SIZES[0]);

  return (
    <Dropdown>
      <MenuButton
        endDecorator={<ArrowDropDown />}
        style={{ background: "#F7F7FA", border: "none", padding: "6px 10px" }}
      >
        {size}
      </MenuButton>
      <Menu sx={{ width: 160, "--ListItemDecorator-size": "24px" }}>
        <ListItem nested>
          <List>
            {SIZES.map((item: string) => (
              <MenuItem
                key={item}
                role="menuitemradio"
                aria-checked={item === size ? "true" : "false"}
                onClick={() => {
                  setSize(item);
                }}
              >
                <ListItemDecorator>
                  {item === size && <ArrowRight />}
                </ListItemDecorator>
                {item}
              </MenuItem>
            ))}
          </List>
        </ListItem>
      </Menu>
    </Dropdown>
  );
}
