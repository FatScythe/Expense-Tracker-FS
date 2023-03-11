// import { useEffect, useState } from "react";

// const usePost = (url, payload) => {
//   const [response, setResponse] = useState({});
//   const [pending, setPending] = useState(true);
//   const [error, setError] = useState("");

//   const postData = async () => {
//     try {
//       const post = await fetch(url, {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await post.json();
//       setPending(false);
//       setResponse(data);
//       if (!post.ok) {
//         setError(data.msg);
//         // Alert here
//         alert(data.msg);
//       }
//     } catch (error) {
//       setPending(false);
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     postData();
//   }, [url, payload]);
//   console.log({ response, pending, error });
//   return { response, pending, error };
// };

// export const getPost = (url, payload) => {
//   return usePost(url, payload);
// };

// export default usePost;
