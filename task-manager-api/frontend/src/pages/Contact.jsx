import { useState } from 'react';
import {
  FiMail,
  FiMessageSquare,
  FiSend,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
} from 'react-icons/fi';
import Button from '../components/Button.jsx';
import {
  cn,
  paperCard,
  gloss,
  emboss,
  inputInset,
  badge,
  badgeGreen,
} from '../styles/classes.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className={cn(badge, badgeGreen)}>Lazy-Loaded Chunk</span>
          <span className="text-xs text-graphite-400">Routes code-split independently</span>
        </div>
        <h2 className={cn(emboss, 'mt-2 font-display text-2xl font-bold text-graphite-800')}>
          Contact & Workspace Support
        </h2>
        <p className="mt-1 text-sm text-graphite-500">
          Have queries, feedback, or need team assistance? Send us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Info Column */}
        <div className={cn(paperCard, gloss, 'space-y-6 p-6 md:col-span-1')}>
          <h3 className={cn(emboss, 'font-display text-base font-bold text-graphite-800')}>
            Support Channels
          </h3>

          <div className="space-y-4 text-sm text-graphite-600">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-accent-50 p-2 text-accent-600 border border-accent-200">
                <FiMail />
              </div>
              <div>
                <p className="font-semibold text-graphite-800">Email</p>
                <p className="text-xs text-graphite-500">support@taskflow.dev</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-accent-50 p-2 text-accent-600 border border-accent-200">
                <FiPhone />
              </div>
              <div>
                <p className="font-semibold text-graphite-800">Phone</p>
                <p className="text-xs text-graphite-500">+1 (800) 555-TASK</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-accent-50 p-2 text-accent-600 border border-accent-200">
                <FiMapPin />
              </div>
              <div>
                <p className="font-semibold text-graphite-800">Headquarters</p>
                <p className="text-xs text-graphite-500">Innovation Tech Park, Suite 402</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-graphite-100/70 p-4 text-xs text-graphite-500">
            <p className="font-semibold text-graphite-700">Performance Note</p>
            <p className="mt-1 leading-relaxed">
              This Contact page module was lazy-loaded on demand using <code>React.lazy()</code>.
              Users visiting only Dashboard never download this bundle!
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className={cn(paperCard, gloss, 'p-6 md:col-span-2')}>
          {submitted ? (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <div className="mb-3 rounded-full bg-emerald-50 p-3 text-emerald-600 border border-emerald-200">
                <FiCheckCircle size={32} />
              </div>
              <h3 className="font-display text-lg font-bold text-graphite-800">
                Message Dispatched!
              </h3>
              <p className="mt-1 text-sm text-graphite-500">
                Thank you for contacting us. Our engineering team will follow up soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-graphite-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className={cn(inputInset, 'w-full px-3.5 py-2.5 text-sm outline-none')}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-graphite-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className={cn(inputInset, 'w-full px-3.5 py-2.5 text-sm outline-none')}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-graphite-400">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Inquiry regarding feature optimization"
                  className={cn(inputInset, 'w-full px-3.5 py-2.5 text-sm outline-none')}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-graphite-400">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details or performance feedback..."
                  className={cn(inputInset, 'w-full px-3.5 py-2.5 text-sm outline-none resize-none')}
                />
              </div>

              <Button type="submit" variant="primary" className="flex items-center gap-2">
                <FiSend />
                Send Inquiry
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
