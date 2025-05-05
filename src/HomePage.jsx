import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Dim2Door</h1>
      <p>Your trusted egg delivery platform.</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <button
          onClick={() => navigate('/admin')}
          style={buttonStyle}
        >
          Go to Admin Dashboard
        </button>

        <button
          onClick={() => navigate('/customer')}
          style={buttonStyle}
        >
          Go to Customer Dashboard
        </button>

        <button
          onClick={() => navigate('/reseller')}
          style={buttonStyle}
        >
          Go to Reseller Dashboard
        </button>

        <button onClick={() => navigate('/deliveryman')} style={buttonStyle}>
           Go to Delivery Dashboard
       </button>

       <button onClick={() => navigate('/login')} style={buttonStyle}>
           Go to Login Page
       </button>
   
    

      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};
