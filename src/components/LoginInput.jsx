import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';
import content from '../utils/content';

function LoginInput({ login }) {
  const { locale } = useContext(LocaleContext);
  
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className='input-login'>
      <label htmlFor="email">{content[locale].login.emailLabel}</label>
      <input 
        type="email" 
        id="email" 
        value={email} 
        onChange={onEmailChange} 
        required 
      />
      
      <label htmlFor="password">{content[locale].login.passwordLabel}</label>
      <input 
        type="password" 
        id="password" 
        value={password} 
        onChange={onPasswordChange} 
        required 
      />
      
      <button type="submit" className="action-btn">
        {content[locale].login.button}
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;