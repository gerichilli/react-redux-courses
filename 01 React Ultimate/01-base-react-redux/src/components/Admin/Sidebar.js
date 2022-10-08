import { Sidebar as ProSideBar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function Sidebar() {
  return (
    <ProSideBar>
      <Menu>
        <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
    </ProSideBar>
  );
}

export default Sidebar;
