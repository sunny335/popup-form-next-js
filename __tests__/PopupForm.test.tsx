import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PopupForm from '../components/PopupForm';
import '@testing-library/jest-dom';

describe('PopupForm Component', () => {
  it('renders without errors', () => {
    const { getByText } = render(<PopupForm />);
    const submitButton = getByText('Submit');
    expect(submitButton).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    // Mock the fetch function to simulate a successful form submission
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
      })
    );

    const { getByText, getByPlaceholderText, findByText } = render(<PopupForm />);

    // Fill in the form fields
    fireEvent.change(getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(getByPlaceholderText('Enter your phone number'), {
      target: { value: '123-456-7890' },
    });
    fireEvent.click(getByText('I agree to the terms and conditions.'));

    // Submit the form
    fireEvent.click(getByText('Submit'));
  });
});
