
import { useAuth } from "../contexts/AuthContext";
import SignRoutes from "./SignRoutes";
import WebRoutes from "./WebRoutes";

export default function Routes() {
    const auth = useAuth();
    return (
        auth.isLoggedIn ? <WebRoutes /> : <SignRoutes />
    );
}