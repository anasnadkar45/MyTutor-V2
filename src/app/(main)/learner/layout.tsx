import { getUserData } from "@/app/actions";
import { Sidebar } from "@/app/components/learner/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";

export default async function LearnerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUserData()
    if (user?.accountName !== "Learner") {
        redirect('/tutor/dashboard')
    }
    return (
        <div className="w-screen h-screen flex custom-scrollbar scroll-smooth">
            <div className="m-3 hidden md:flex flex-col">
                <Sidebar />
            </div>
            <div className="w-full">
                <ScrollArea className="h-[100vh] md:h-[100vh]  border-l-2">
                    {children}
                </ScrollArea>
            </div>
            {/* <BottomNav /> */}
        </div>
    );
}