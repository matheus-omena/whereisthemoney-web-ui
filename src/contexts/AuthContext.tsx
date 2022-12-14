import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthApi } from "../apis/AuthApi";
import _ApiBase from "../apis/_ApiBase";
import Spinner from "../components/General/Spinner";
import { LoginModel } from "../models/Auth/LoginModel";
import { RegisterModel } from "../models/Auth/RegisterModel";
import { UserModel } from "../models/UserModel";

export type AuthContextData = {
  user?: UserModel;
  isLoggedIn: boolean;
  Login: (data: LoginModel) => void;
  Logout(): void;
  Register: (data: RegisterModel) => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default function AuthProvider(props: any) {
  const _svcAuth = useMemo(() => new AuthApi(), []);
  const [loading, setLoading] = useState(false);
  const [loadingToken, setLoadingToken] = useState(true);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("@MyFinances:token")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    const storagedUser = localStorage.getItem("@MyFinances:user");
    const storagedToken = localStorage.getItem("@MyFinances:token");

    if (storagedToken) {
      _ApiBase.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storagedToken}`;
      setLoadingToken(false);
    }

    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, [accessToken]);

  const Login = (data: LoginModel) => {
    setLoading(true);
    _svcAuth
      .login(data)
      .then((r) => {
        setAccessToken(r.data.token);
        localStorage.setItem("@MyFinances:token", r.data.token);
        _ApiBase.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        setUser(r.data.user);
        localStorage.setItem("@MyFinances:user", JSON.stringify(r.data.user));

        setIsLoggedIn(true);
        window.location.href = "/";
      })
      .catch((e) => {
        setIsLoggedIn(false);
        toast.info("Usu??rio ou senha inv??lidos");
      })
      .finally(() => setLoading(false));
  };

  const Logout = () => {
    localStorage.removeItem("@MyFinances:user");
    localStorage.removeItem("@MyFinances:token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const Register = (data: RegisterModel) => {
    setLoading(true);
    _svcAuth
      .register(data)
      .then((r) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usu??rio cadastrado com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/";
      })
      .catch((e) => {
        toast.info(
          "N??o foi poss??vel cadastrar o usu??rio. Tente novamente mais tarde!"
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        Login,
        Logout,
        Register,
      }}
    >
      {loading || (loadingToken && accessToken) ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner message={"Validando informa????es"} size={50} />
        </div>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
}
