import { redirect } from "next/navigation";

const Home = () => {
  redirect("/quizzes");
};

export default Home;
