export function FooterSection() {
  return (
    <footer className="text-xs text-center text-gray-500">
      Made with <strong className="font-mono font-medium">{"{🖤}"}</strong> in
      Berlin by{" "}
      <a
        href="https://higi.dev"
        target="_blank"
        className="font-semibold hover:underline"
      >
        Niklas Higi
      </a>{" "}
      • View source on{" "}
      <a
        href="https://github.com/shroudedcode/dnd-debugger"
        target="_blank"
        className="font-semibold hover:underline"
      >
        GitHub
      </a>
    </footer>
  );
}
