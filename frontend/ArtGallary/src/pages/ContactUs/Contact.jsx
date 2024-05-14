import React from 'react'
import { useState } from 'react';
import './Contact.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Handle form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here (e.g., sending data to a server)
        console.log('Form submitted:', formData);
        // Clear form fields after submission
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    }

    return (
      <>
        <div className="container">
            <div className="contact-us" data-aos="flip-up">
                <h1>Contact us</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Inventore commodi laboriosam quos maxime, soluta quia <br />
                     incidunt eius ex consectetur assumenda ipsa quod voluptates 
                     similique accusantium tenetur? Dicta recusandae accusamus dolore,<br />
                     incidunt eius ex consectetur assumenda ipsa quod voluptates  </p>
            </div>
            {/* Company Info */}
            <div className="info" data-aos="flip-down">
                <h1>Our Company</h1>
                <p><strong>Address:</strong> <h3>Building No.45,Main Street,Mumbai</h3> </p>
                <p><strong>Phone:</strong> <h3>+1234567890</h3></p>
                <p><strong>Email:</strong><h3> ArtGallery123@gmail.com</h3></p>
            </div>
            {/* Contact Form */}
            <div className="form">
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                    <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows="5" required></textarea>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        </div>
      
        </>
        
    );
}

export default Contact