import React, { useState } from 'react';
import { useColorContext } from '../../contexts/colorPickerContext';

function Contact() {
  const {  selectedColor } = useColorContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget:'',
    message: '',
  });

  const [submissionMessage, setSubmissionMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch('https://formspree.io/f/mbjngeva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionMessage('Form submitted successfully!');
        setFormData(
          {
            name: '',
            email: '',
            address:'',
            message: '',
          }
        )
       
      } else {
        setSubmissionMessage('Form submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmissionMessage('Form submission failed.');
    }
    finally{
      setLoading(false)
      
    }
   
  };


  return (
    <div 
         data-aos="fade-down"
     data-aos-duration="3000"
    id="projectDiscussion" 
    className="w-[90%] lg:w-[50%] mx-auto p-4  shadow-lg rounded-lg mt-5 bg-main dark:bg-[#1e1e1e] dark:text-text text-[#1e1e1e]"
    // style={{backgroundColor:selectedColor}}
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-yellow-500 py-3">Get in touch with us</h2>

      <form
       onSubmit={handleSubmit}
       className='dark:text-white ' 
       >
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold  mb-2 ">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className={` w-full px-4 py-2 border rounded-md focus:outline-none focus:border-icons dark:bg-slate-600`}
          placeholder="Your Name"
          onChange={handleChange}
        />
      </div>
  
      <div className="mb-4 ">
        <label htmlFor="email" className="block text-sm font-semibold  mb-2 ">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={`  w-full px-4 py-2 border rounded-md focus:outline-none focus:border-icons dark:bg-slate-600 `}
          placeholder="your@email.com"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4 ">
        <label htmlFor="budget" className="block text-sm font-semibold  mb-2">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className={` w-full px-4 py-2 border rounded-md focus:outline-none focus:border-icons dark:bg-slate-600 `}
          placeholder="Where are you contacting from"
          onChange={handleChange}
        />
      </div>
  
      <div className="mb-4 ">
        <label htmlFor="message" className="block text-sm font-semibold  mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          className={` w-full px-4 py-2 border rounded-md focus:outline-none focus:border-icons dark:bg-slate-600 `}
          placeholder="Your message for us..."
          onChange={handleChange}
        ></textarea>
      </div>
  

        <div className="text-center">
        <button
            type="submit"
            className="text-white px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ease-in-out transition duration-300 focus:shadow-outline-blue"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      {submissionMessage && (
        <div className={`text-center py-3 ${submissionMessage.includes('failed') ? 'text-red-500' : 'text-green-500'} `}>
          {submissionMessage}
        </div>
      )}
    </div>
  );
}

export default Contact;
