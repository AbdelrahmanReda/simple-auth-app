export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center gap-1">
        <span className={"text-red-400 text-3xl font-semibold"}>
          Home at localhost
        </span>
        <span className={"text-red-400 font-semibold"}>
          This server website
        </span>
      </div>
    </main>
  );
}
