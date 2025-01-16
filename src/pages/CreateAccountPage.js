import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Password must match')
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, password)
      navigate('/articles')
    } catch (error){
      setError(error.message)

    }
  }
  return (
    <>
      <h1>Create Account</h1>
      {error && <p className="error">{error}</p>}
      <input 
          type="text"
          value={email}
          placeholder="Your email address"
          onChange={(e) => setEmail(e.target.value)}
      />
      <input 
          type="password"
          value={password}
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
      />
      <input 
          type="password" 
          value={confirmPassword}
          placeholder="Re-enter your password"
          onChange={(e) => setConfirmPassword(e.target.value)}/>
      <button onClick={createAccount}> Log In</button>
      <Link to="/login" > 
          <p className="login" >Already have an account? Login here. </p> 
      </Link>
    </>
  )
}

export default CreateAccountPage