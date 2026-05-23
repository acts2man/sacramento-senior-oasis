export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-white">{title}</h1>
        <p className="text-sm text-neutral-400">This area is coming in a later phase.</p>
      </div>
      <div className="bg-teal-900/60 border border-teal-800 rounded-lg p-12 text-center">
        <div className="text-coral-400 text-sm uppercase tracking-wider font-semibold mb-2">Coming soon</div>
        <p className="text-neutral-300 text-sm max-w-md mx-auto">
          We're focused on Leads in this phase. {title} will land in an upcoming release.
        </p>
      </div>
    </div>
  );
}
