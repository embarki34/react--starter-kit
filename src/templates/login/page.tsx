import { LoginForm } from "@/components/login-form"


export default function LoginPage() {



    return (
        <div className=" flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-4xl max-w-sm md:max-w-sm">
                <LoginForm />

            </div>
        </div>


    )
}