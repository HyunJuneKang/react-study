export default function Header() {
  const btnStyle =
    "px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition hover:underline";
  return (
    <header className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">Dashboard</h1>
      <nav className="flex gap-4 text-sm">
        <button className={btnStyle}>Home</button>
        <button className={btnStyle}>Posts</button>
        <button className={btnStyle}>Profile</button>
      </nav>
    </header>
  );
}
