import MySessions from "@/Components/My-Sessions/MySessions";

export const metadata = {
  title: "My Sessions | Mediqueue",
  description: "Online Book Borrowing Platform",
};

const page = () => {
    return (
        <div>
            <MySessions/>
        </div>
    );
};

export default page;