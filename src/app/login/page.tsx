import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { auth, signIn } from "../utils/auth";
  import { redirect } from "next/navigation";
  import { GitHubAuthButton, GoogleAuthButton } from "@/components/global/SubmitButton";
  import { unstable_noStore } from "next/cache";
  export default async function Login() {
    unstable_noStore()
    const session = await auth();
  
    if (session?.user) {
      redirect("/onboarding");
    }
    return (
      <>
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[size:6rem_4rem]">
        </div>
        <div className="flex h-screen w-full items-center justify-center px-4">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col gap-3 mt-5">
            <form
              className="w-full"
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <GoogleAuthButton />
            </form>
  
            <form
              className="w-full"
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <GitHubAuthButton />
            </form>
  
          </div>
              
            </CardContent>
          </Card>
        </div>
      </>
    );
  }