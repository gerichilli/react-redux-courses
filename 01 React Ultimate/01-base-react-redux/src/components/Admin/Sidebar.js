import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { RiReactjsFill, RiDashboard2Line } from "react-icons/ri";
import { BsGem, BsGithub } from "react-icons/bs";

function Sidebar({ collapsed, toggled, handleToggleSidebar }) {
  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <Link to="/admin" className="text-white text-decoration-none d-flex align-items-center">
          {collapsed ? (
            <RiReactjsFill size={"1.25em"} />
          ) : (
            <div className="d-flex align-items-center">
              <RiReactjsFill size={"1.25em"} /> <span>Admin</span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconshape="circle">
          <MenuItem icon={<RiDashboard2Line />}>
            Dashboard
            <Link to="/admin" />
          </MenuItem>
        </Menu>
        <Menu iconshape="circle">
          <SubMenu title="Features" icon={<BsGem />}>
            <MenuItem>
              Quản lý Users
              <Link to="/admin/manage-users" />
            </MenuItem>
            <MenuItem>
              Quản lý Bài Quizzes <Link to="/admin/manage-quizzes" />
            </MenuItem>
            <MenuItem>
              Quản lý Câu hỏi <Link to="/admin/manage-questions" />
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <div className="sidebar-btn-wrapper">
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <BsGithub />
            <span
              style={{
                marginLeft: "8px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              View source
            </span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
}

export default Sidebar;
