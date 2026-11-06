import { LoginForm } from "@/features/auth/components/LoginForm";
import { LoginPromoPanel } from "@/features/auth/components/LoginPromoPanel";

export default function LoginPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl flex-1 gap-8 px-6 py-8 lg:grid-cols-2">
      <LoginPromoPanel />
      <div className="flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
