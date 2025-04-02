import React, { useEffect, useState } from "react";

const UpdateBlog = ({ blogId, onCancel }) => {
    const [blog, setBlog] = useState({ id: blogId, title: "", content: "", imageUrl: "", imageFile: null });

    useEffect(() => {
        // Fetch blog details based on blogId
        // Ví dụ: setBlog(fetchedBlog);
    }, [blogId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBlog({ ...blog, imageFile: file, imageUrl: URL.createObjectURL(file) });
        } else {
            setBlog({ ...blog, imageFile: null });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic để cập nhật blog
        console.log("Cập nhật blog:", blog);
        onCancel(); // Quay lại danh sách
    };

    return (
        <div>
            <h2>Cập nhật Blog</h2>
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
                        name="content"
                        value={blog.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Link ảnh</label>
                    <input
                        type="file"
                        className="form-control mt-2"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">Cập nhật</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default UpdateBlog;