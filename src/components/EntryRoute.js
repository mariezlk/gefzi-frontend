import { Navigate } from "react-router-dom";

function EntryRoute({ user }) {

    //Entscheidung, damit Login aufgerufen wird, wenn keine userId gesetzt bzw, in der URL enthalten ist
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Navigate to={`/${user.userId}`} replace />;
}

export default EntryRoute;