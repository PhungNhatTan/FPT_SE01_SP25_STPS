import React, { useState, useEffect } from "react";
import { BlogService } from "../../services/BlogService";
import "./style/dashboard_manager.css"; // Đảm bảo đường dẫn tới CSS nếu cần

const BlogList = ({ onAddBlog, onEditBlog }) => {
    const [blogList, setBlogList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const blogService = new BlogService();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await blogService.getAllBlogs();
            setBlogList(res.data.data || []);
        } catch (err) {
            setError("Không thể tải danh sách blog");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa blog này?")) {
            try {
                await blogService.deleteBlog(id);
                setBlogList(blogList.filter((blog) => blog.id !== id));
            } catch (err) {
                alert("Xóa blog thất bại!");
            }
        }
    };

    const filteredBlogs = blogList.filter((blog) =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Danh sách Blogs</h2>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control rounded-start"
                        placeholder="Tìm kiếm theo tiêu đề"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={onAddBlog}>
                    Thêm mới Blog
                </button>
            </div>
            {loading && <p>Đang tải...</p>}
            {error && <p className="text-danger">{error}</p>}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Ảnh</th>
                        <th className="text-center" style={{ width: "150px" }}>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBlogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>{blog.id}</td>
                            <td>{blog.title}</td>
                            <td>{blog.description}</td>
                            <td>{blog.image && <img src={blog.image} alt="blog" style={{ maxWidth: 80, maxHeight: 60 }} />}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => onEditBlog(blog.id)}>Sửa</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(blog.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogList;