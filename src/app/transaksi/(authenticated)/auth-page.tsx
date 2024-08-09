import List from "./list";

function AuthPage() {
  return (
    <div className="flex justify-center">
      <div className="max-w-6xl bg-background px-2 md:px-4 w-full min-h-[92vh]">
        <List />
      </div>
    </div>
  );
}

export default AuthPage;
