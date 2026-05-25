

const mockTutors = [
  {
    id: 1,
    name: "Dr. Aisha Rahman",
    subject: "Mathematics",
    fee: 600,
    slots: 8,
    mode: "Online",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
  },
  {
    id: 2,
    name: "Prof. Karim Hossain",
    subject: "Physics",
    fee: 700,
    slots: 5,
    mode: "Both",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
  },
  {
    id: 3,
    name: "Dr. Fatima Begum",
    subject: "Chemistry",
    fee: 650,
    slots: 6,
    mode: "Offline",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
  },
];

const MySessions = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Sessions</h1>
        </div>
    );
};

export default MySessions;




