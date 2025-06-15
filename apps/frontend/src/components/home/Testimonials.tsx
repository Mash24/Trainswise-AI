import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Software Engineer',
    content: 'The platform helped me find the perfect AI training job. The process was smooth and efficient.',
    avatar: '/avatars/john.jpg'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Data Scientist',
    content: 'I was able to connect with top companies and land my dream job in AI. Highly recommended!',
    avatar: '/avatars/jane.jpg'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'ML Engineer',
    content: 'The quality of jobs and companies on the platform is outstanding. Great experience overall.',
    avatar: '/avatars/mike.jpg'
  }
];

export default function Testimonials() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 bg-white rounded-2xl shadow-xl shadow-primary/10 mb-12">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-700">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 