import React, { useEffect, useState } from "react";
import { BlogService } from "../../services/BlogService";

const UpdateBlog = ({ blogId, onCancel }) => {
    const [blog, setBlog] = useState({
        id: blogId,
        title: "",
        description: "",
        imageUrl: "",
        imageFile: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const blogService = new BlogService();

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await blogService.getBlogById(blogId);
                if (response.data.success) {
                    const blogData = response.data.data;
                    setBlog({
                        id: blogData.id,
                        title: blogData.title,
                        description: blogData.description,
                        imageUrl: blogData.image,
                        imageFile: null
                    });
                }
            } catch (err) {
                setError("Không thể tải thông tin blog!");
            }
        };
        fetchBlogDetails();
    }, [blogId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBlog({
                ...blog,
                imageFile: file,
                imageUrl: URL.createObjectURL(file)
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await blogService.updateBlog(blogId, {
                title: blog.title,
                description: blog.description,
                imageFile: blog.imageFile
            });
            alert("Cập nhật blog thành công!");
            onCancel();
        } catch (err) {
            setError("Cập nhật blog thất bại!");
        }
        setLoading(false);
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Cập nhật Blog</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tiêu đề</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nội dung</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={blog.description}
                        onChange={handleChange}
                        required
                        rows="5"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Ảnh</label>
                    {blog.imageUrl && (
                        <div className="mb-2">
                            <img
                                src={blog.imageUrl}
                                alt="Blog preview"
                                style={{ maxWidth: "200px", maxHeight: "200px" }}
                                className="img-thumbnail"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Đang cập nhật..." : "Cập nhật"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBlog;