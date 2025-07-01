import { useState } from 'react';
import { useToast } from '../hooks/use-toast';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration with your actual credentials
      const serviceId = 'service_qklbs5m';
      const templateId = 'template_pgkwqc3';
      const publicKey = 'VHqdZf6et7WQV3YAA';

      // Template parameters mapped to form fields
      // Use these variable names in your EmailJS template:
      const templateParams = {
        // Basic contact information
        contact_name: formData.name,
        contact_email: formData.email,
        contact_phone: formData.phone,
        
        // Communication preferences
        preferred_contact_method: formData.preferredContact,
        
        // Message content
        contact_message: formData.message || 'No specific message provided',
        
        // Form type identifier
        form_type: 'General Contact Form',
        
        // Metadata
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString(),
        
        // Your business email (where you want to receive inquiries)
        to_email: 'your-business-email@example.com' // Replace with your email
      };

      console.log('Sending contact form with EmailJS:', templateParams);

      // Send email via EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      console.log('EmailJS response:', response);
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you soon based on your preferred contact method.",
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredContact: 'email'
      });
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Message Sending Failed",
        description: "We couldn't send your message right now. Please try again or call us directly at (916) 538-9563.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-senior-slate mb-2">Contact Us</h3>
        <p className="text-gray-600">We're here to help you find the perfect senior living community.</p>
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
          <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Contact Method
          </label>
          <select
            id="preferredContact"
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-senior-blue"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
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
