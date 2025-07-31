import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';

const Profile: React.FC = () => {
  const { user, updateProfileInfo, deleteAccount, refreshProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [address, setAddress] = useState(user?.address ?? '');
  const [msg, setMsg] = useState('');

  useEffect(() => { setName(user?.name ?? ''); setAddress(user?.address ?? '') }, [user]);

  const onSave = async () => { await updateProfileInfo({ name, address }); setMsg('Profile updated'); setTimeout(()=>setMsg(''), 2000); await refreshProfile() };
  const onDelete = async () => { if (confirm('Delete your account? This cannot be undone.')) { await deleteAccount() } };

  if (!user) return null;
  return (
    <div>
      <h2>My Profile</h2>
      {msg && <p className="success-message">{msg}</p>}
      <p>Email: {user.email}</p>
      <label>Name</label>
      <input value={name} onChange={e=>setName(e.target.value)} />
      <label>Address</label>
      <input value={address} onChange={e=>setAddress(e.target.value)} />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={onSave}>Save</button>
        <button onClick={onDelete} style={{ marginLeft: '0.5rem', background: '#b91c1c' }}>Delete Account</button>
      </div>
    </div>
  );
};
export default Profile;
