import Layout from "../components/layout";
import Loginform from "../components/forms/loginform";
import Register from "../components/forms/registerform";

const login_register = () => {
  return (
    <Layout>
      <Loginform redirect={"/subscribe"} />
      <Register />
    </Layout>
  );
};

export default login_register;
