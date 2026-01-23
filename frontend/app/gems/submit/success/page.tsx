import Link from 'next/link';

export default function SubmitSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <div className="bg-secondary rounded-xl p-12">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="font-heading text-3xl font-bold text-primary mb-4">
          Thank You!
        </h1>
        <p className="text-lg text-neutral-slate mb-6">
          Your hidden gem is in our queue! We&apos;ll review it within 48 hours.
        </p>
        <p className="text-sm text-neutral-slate mb-8">
          You&apos;ll receive an email notification once it&apos;s approved and published.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/gems" className="btn-primary">
            View Other Gems
          </Link>
          <Link href="/gems/submit" className="btn-outline">
            Submit Another
          </Link>
        </div>
      </div>
    </div>
  );
}
