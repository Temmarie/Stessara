import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="max-w-md mx-auto px-5 text-center">
        <p className="font-display text-crimson text-7xl md:text-8xl tracking-title-luxe uppercase mb-6">
          404
        </p>
        <h1 className="font-script text-rose text-3xl mb-4">This piece is still being made</h1>
        <p className="text-ink/60 mb-8">
          The page you’re looking for doesn’t exist — but our collections do.
        </p>
        <Link href="/" className="btn-crimson">Back to home</Link>
      </div>
    </section>
  );
}
