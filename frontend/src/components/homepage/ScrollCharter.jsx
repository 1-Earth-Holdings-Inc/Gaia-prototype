import Image from 'next/image';

export default function ScrollCharter() {
  return (
    <section id="charter" className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6">
      <h2 className="text-2xl font-semibold">Earth Charter</h2>
      <div className="relative w-full h-96">
        <Image src="/scroll.jpg" alt="Earth Charter scroll" fill className="object-contain rounded-3xl shadow" />
      </div>
      <p className="text-center text-gray-600">Earth Charter (decorative scroll)</p>
    </section>
  );
}


