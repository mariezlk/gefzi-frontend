import { Navigate } from "react-router-dom";

function EntryRoute({ user }) {

    if (user === undefined) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Navigate to={`/${user.userId}`} replace />;
}

export default EntryRoute;