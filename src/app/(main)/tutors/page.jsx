// No "use client" here
// import TutorsClient from "@/Components/TutorsClient";

import TutorsClient from "@/Components/Tutors-Client/TutorsClient";

export const metadata = {
  title: "All Tutors | Mediqueue",
  description: "Online Book Borrowing Platform",
};

const TutorsPage = () => {
  return <TutorsClient />;
};

export default TutorsPage;