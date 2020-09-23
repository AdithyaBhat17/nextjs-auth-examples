import Layout from "../components/Layout";
import Profile from "../components/Profile";

const IndexPage = () => {
  return (
    <Layout>
      <h1>Hello Next.js 👋</h1>
      <p>
        <a href="/api/login">Login</a>
      </p>
      <Profile />
    </Layout>
  );
};

export default IndexPage;
