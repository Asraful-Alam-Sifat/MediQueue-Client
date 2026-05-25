import MyTutorsClient from "@/Components/My-Tutors-Client/MyTutorsClient";

export const metadata = {
  title: "My Tutors | MediQueue ",
  description: "Online Book Borrowing Platform",
};



export default async function MyTutorsPage() {
  return (
    <div>
        <MyTutorsClient/>
    </div>
  )
}
