import * as React from 'react';
import { useNavigate } from "react-router-dom";
import useToken from '../useToken';

export default function Logout() {
    const navigate = useNavigate();
    const { setToken } = useToken();

    React.useEffect(() => {
        setToken({token: null});
        navigate("/", { replace: true });
        window.location.reload(false);
    });
  
    return "Wait...";
};