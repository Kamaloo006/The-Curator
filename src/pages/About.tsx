import { useAuth } from "../context/AuthContext";

const About = () => {
  const { user } = useAuth();
  return <div>Hello {user?.name}</div>;
};

export default About;
