import { useEffect, useState } from "react";
import axios from "axios";

export default function UserFetch() {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let CONFIG = { withCredentials: true };
    let status = axios.get("http://localhost:3001/discord/get-user", CONFIG);

    status
      .then(({ data }) => {
        setUser(data);
      })
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, error, loading };
}
