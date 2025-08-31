"use client";

const benefits = [
  {
    icon: "🌱",
    title: "Environmental Impact",
    description: "Track your contributions to global sustainability initiatives and see real-world impact.",
    bgColor: "bg-blue-100"
  },
  {
    icon: "🤝",
    title: "Global Community",
    description: "Connect with like-minded individuals from around the world who share your passion.",
    bgColor: "bg-green-100"
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    description: "Monitor your personal sustainability journey with detailed analytics and insights.",
    bgColor: "bg-purple-100"
  }
];

export default function BenefitsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {benefits.map((benefit, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-4`}>
            <span className="text-2xl">{benefit.icon}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
          <p className="text-gray-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}
