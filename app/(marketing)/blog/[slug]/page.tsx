export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen w-full bg-background pt-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">{params.slug}</h1>
        <p className="text-foreground/60">Post coming soon.</p>
      </div>
    </main>
  )
}
