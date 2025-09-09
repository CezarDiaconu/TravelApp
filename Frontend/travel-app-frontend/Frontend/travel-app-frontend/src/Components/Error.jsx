import { useNavigate } from 'react-router-dom';
import '../Styles/Error.css'; 

function Error() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/signin');
    };

    return (
        <div className="error-page">
            <h1>Something bad happened!</h1>
            <h2>Please go back to the sign-in page!</h2>
            <button className="goToSignIn" onClick={handleSubmit}>
                Go to sign-in page
            </button>
        </div>
    );
}

export default Error;
