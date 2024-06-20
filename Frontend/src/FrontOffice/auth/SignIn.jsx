import InputField from "components/fields/InputField";
import authService from "../../services/authServices";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SignIn() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameState, setUsernameState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const navigate = useNavigate();
  const handleUsernameChange = (value) => {
    setUsername(value);
    setUsernameState('');
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordState('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(username, password)
      const { token } = await authService.login(username, password);
      localStorage.setItem('token', token);
      console.log(token)
      setUsernameState('success');
      setPasswordState('success');
      setTimeout(() => {
        navigate('/admin/default');
      }, 1000);
    } catch (error) {
      setError(error.message || 'An error occurred during login');
      setUsernameState('error'); // Set state to error
      setPasswordState('error');
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
        S'identifier
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Entrer Votre Nom d'Utilisateur et votre Mot de Passe!
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          {/* Username Input */}
          <InputField
              variant="auth"
              extra="mb-3"
              label="Username*"
              placeholder="username..."
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              state={usernameState}
          />

          {/* Password Input */}
          <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              state={passwordState}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4 flex items-center justify-between px-2">
            <a
                className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                href=" "
            >
              Forgot Password?
            </a>
          </div>
          <button
              className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
        </form>
      </div>
    </div>
);
}
