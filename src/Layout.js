import Navbar from "./components/Navbar";

// Aufruf aller Komponenten, die dauerhaft angezeigt werden sollen
function Layout({userId}) {
  return (
    <>
      <Navbar userId={userId}/>
    </>
  );
}

export default Layout;
