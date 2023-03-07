const Post = async (url, payload) => {
  try {
    console.log("started here", url, payload);
    const post = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await post.json();
    if (!post.ok) {
      // Alert here
      alert(result.msg);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default Post;
