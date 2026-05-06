
import { useState } from 'react';
import { useToast } from '../hooks/use-toast';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface ContactFormProps {
  facilityName?: string;
}

const NETLIFY_FORM_NAME = 'contact';

const encodeFormData = (data: Record<string, string>) =>
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

const ContactForm = ({ facilityName }: ContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryFor: 'for-me'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryFor: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({
          'form-name': NETLIFY_FORM_NAME,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          'inquiry-for': formData.inquiryFor,
          facility_of_interest: facilityName || '',
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        inquiryFor: 'for-me'
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Message Sending Failed",
        description: "We couldn't send your message right now. Please try again in a few moments.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6"
      name={NETLIFY_FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
      <input type="hidden" name="facility_of_interest" value={facilityName || ''} />
      <p className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-senior-slate mb-2">Contact Us</h3>
        <p className="text-gray-600">We're here to help you find the perfect senior living community.</p>
        {facilityName && (
          <p className="mt-3 text-sm text-senior-blue bg-senior-light px-3 py-2 rounded-md inline-block">
            Inquiring about: <strong>{facilityName}</strong>
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-senior-blue"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-senior-blue"
            placeholder="johndoe@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-senior-blue"
            placeholder="(916) 555-1234"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Is this for you or someone else?
          </label>
          <RadioGroup value={formData.inquiryFor} onValueChange={handleRadioChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="for-me" id="for-me" />
              <Label htmlFor="for-me">For me</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="someone-else" id="someone-else" />
              <Label htmlFor="someone-else">Someone else</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-senior-blue"
            placeholder="Tell us about your needs or ask any questions..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-senior-blue text-white font-medium rounded-md hover:bg-senior-blue/90 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </button>
        
        <p className="text-xs text-gray-500 mt-3">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
