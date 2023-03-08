import { useState } from "react";

const Post = async (url, payload) => {
  const [response, setResponse] = useState({});
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  try {
    const post = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await post.json();
    setPending(false);
    setResponse(data);
    if (!post.ok) {
      setError(data.msg);
      // Alert here
      alert(data.msg);
    }
    console.log({ response, pending, error });
    return { response, pending, error };
  } catch (error) {
    setPending(false);
    console.log(error);
  }
};

export default Post;
