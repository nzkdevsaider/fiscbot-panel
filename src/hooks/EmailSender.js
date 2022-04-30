import { useEffect, useState } from "react";
import axios from "axios";

export default function EmailSender({ id, email, nombre}) {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let REQUEST = { id, email, nombre };
    let status = axios.post(
      "http://localhost:3001/email/send-verification",
      REQUEST
    );

    status
      .then(({ data }) => {
        console.log(`Data: ${data}`);
        setData(data);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, error, loading };
}
