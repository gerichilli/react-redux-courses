import { ProSidebarProvider } from "react-pro-sidebar";

function Admin(props) {
  return (
    <ProSidebarProvider>
      <div>
        Admin Component<div></div>
      </div>
    </ProSidebarProvider>
  );
}

export default Admin;
