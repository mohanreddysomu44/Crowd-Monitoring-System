import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) setPost(fetchedPost);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status && post.featuredimage) {
        await appwriteService.deleteFile(post.featuredimage);
      }
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // ✅ Image preview logic
  const imageUrl = post?.featuredimage
    ? appwriteService.getFilePreview(
        typeof post.featuredimage === "string"
          ? post.featuredimage
          : post.featuredimage?.fileId
      )
    : "https://via.placeholder.com/600x400?text=No+Image";

  console.log("Image Preview URL:", imageUrl); // ✅ Debug

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={imageUrl}
            alt={post.title}
            className="rounded-xl max-h-[400px] object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/600x400?text=Image+Not+Found";
            }}
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
        </div>

        <div className="browser-css text-gray-700 leading-relaxed">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : (
    <div className="py-8">
      <Container>
        <p className="text-center text-gray-500">Loading post...</p>
      </Container>
    </div>
  );
}
