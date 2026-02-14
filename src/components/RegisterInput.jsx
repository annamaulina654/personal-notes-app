import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Password dan Confirm Password harus sama');
      return;
    }
    register({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className='input-register'>
      <label>Nama</label>
      <input type="text" value={name} onChange={onNameChange} required />

      <label>Email</label>
      <input type="email" value={email} onChange={onEmailChange} required />

      <label>Password</label>
      <input type="password" value={password} onChange={onPasswordChange} autoComplete='new-password' required />

      <label>Confirm Password</label>
      <input type="password" value={confirmPassword} onChange={onConfirmPasswordChange} autoComplete='new-password' required />

      <button type="submit" className="action-btn">Daftar</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;