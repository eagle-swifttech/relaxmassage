import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/bg-login-form.jpg')" }}
    >
      <div className="">
        <LoginForm />
      </div>
    </div>
  );
}
