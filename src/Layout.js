import Navbar from "./components/Navbar";


function Layout({userId}) {
  return (
    <>
      <Navbar userId={userId}/>
    </>
  );
}

export default Layout;
