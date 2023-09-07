

import { NextApiRequest, NextApiResponse } from 'next';

import { dbConnect } from '../../lib/db'; // Import the Mongoose configuration
import FormSubmit from '../../models/FormData'; // Import the Mongoose model

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { name, email, phoneNumber, consent } = req.body;
      const formData = new FormSubmit({
        name,
        email,
        phoneNumber,
        consent,
      });
      await dbConnect();
      await formData.save();

      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      if (error) {
        const validationErrors = {};
   
        return res.status(400).json(error);
      } else {
        // Handle other errors
        console.error('Error submitting form:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
