import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import app from '../firebase';
const initialUserData = JSON.parse(localStorage.getItem('userData'))
  ? JSON.parse(localStorage.getItem('userData'))
  : {};

const NavBar = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(initialUserData);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else if (user && pathname === '/login') {
        navigate('/');
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        localStorage.setItem('userData', JSON.stringify(result.user));
        navigate('/');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const listener = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <NavWrapper $show={show}>
      <Logo>
        <Image
          alt="Poke logo"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          onClick={() => (window.location.href = '/')}
        />
      </Logo>

      {pathname === '/login' ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <SignOut>
          <UserImg src={userData.photoURL} alt="user photo" />
          <DropDown>
            <span onClick={handleLogout}>Sign out</span>
          </DropDown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

const UserImg = styled.img`
  height: 100%;
  border-radius: 50%;
  width: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  cursor: pointer;
  color: white;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  color: #f9f9f9;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Image = styled.img`
  cursor: pointer;
  width: 100%;
`;

const Logo = styled.div`
  padding: 0;
  width: 50px;
  margin-top: 4px;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  background-color: ${(props) => (props.show ? '#090b13' : 'transparent')};
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 100;
  ${({ $show }) =>
    $show &&
    `
    background-color: #090b13;
`}
`;
export default NavBar;
