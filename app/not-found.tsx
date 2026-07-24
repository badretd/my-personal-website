import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100svh", display: "grid", placeContent: "center", padding: "var(--page-gutter)" }}>
      <p style={{ fontFamily: '"Courier New", monospace', color: "var(--muted)" }}>[ badretd ] / 404</p>
      <h1 style={{ fontSize: "clamp(3rem, 10vw, 8rem)", fontWeight: 400, margin: "1rem 0" }}>Not found</h1>
      <Link href="/">← [ badretd ]</Link>
    </main>
  );
}
