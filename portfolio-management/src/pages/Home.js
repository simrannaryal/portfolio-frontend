import BlogCard from "../components/BlogCard";

export default function Home() {
  const blogs = [
    { id: 1, title: "Market Insights", content: "Nifty50 rose 2% this week." },
    { id: 2, title: "Investment Tips", content: "Diversify your portfolio wisely." }
  ];

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => <BlogCard key={blog.id} {...blog} />)}
    </div>
  );
}
