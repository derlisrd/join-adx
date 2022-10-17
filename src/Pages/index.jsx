import LoginProvider from "../Context/LoginProvider";
import RoutesMain from "../Routes/RoutesMain";

function Pages() {
  return (
    <LoginProvider>
      <RoutesMain />
    </LoginProvider>
  );
}

export default Pages;
