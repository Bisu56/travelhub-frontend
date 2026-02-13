import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      alert('Failed to log out');
    }
  };

  return (
    <div className="page">
      <Container>
        <h2 className="text-center my-5">Profile</h2>
        <p className="text-center">
          <strong>Email:</strong> {currentUser?.email}
        </p>
        <div className="text-center">
          <Button variant="danger" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default ProfilePage;
