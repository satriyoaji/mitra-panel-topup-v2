import List from "./list";

function AuthPage() {
  return (
    <div className="flex justify-center">
      <div className="max-w-6xl bg-background px-2 md:px-4 w-full rounded-xl min-h-[78vh] mb-4">
        <List />
      </div>
    </div>
  );
}

export default AuthPage;
