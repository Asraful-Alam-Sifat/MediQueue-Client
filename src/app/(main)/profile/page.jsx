import ProfileClient from "@/Components/ProfileClient/ProfileClient"

export const metadata = {
  title: "Profile | Mediqueue",
  description: "Online Book Borrowing Platform",
};

const Profile = () => {
    return (
        <div>
            <ProfileClient/>
        </div>
    );
};

export default Profile;