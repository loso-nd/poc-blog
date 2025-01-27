import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setisLoading] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setisLoading(false);
        });
        return unsubscribe;
    }, [])

    return {user, isLoading}
}

export default useUser;