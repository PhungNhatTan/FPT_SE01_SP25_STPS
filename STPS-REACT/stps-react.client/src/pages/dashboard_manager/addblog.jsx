import React, { useState } from "react";
import { BlogService } from "../../services/BlogService";

const AddBlog = ({ onCancel }) => {
    const [newBlog, setNewBlog] = useState({
        title: "",
        description: "",
        imageFile: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const blogService = new BlogService();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await blogService.addBlog({
                title: newBlog.title,
                description: newBlog.description,
                imageFile: newBlog.imageFile,
            });
            alert("Thêm blog thành công!");
            onCancel();
        } catch (err) {
            setError("Thêm blog thất bại!");
        }
        setLoading(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewBlog({ ...newBlog, imageFile: file });
        }
    };

    return (
        <div>
            <h2>Thêm mới Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tiêu đề</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nội dung</label>
                    <textarea
                        className="form-control"
                        required
                        value={newBlog.description}
                        onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Tải ảnh từ máy tính</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-success me-2" disabled={loading}>{loading ? "Đang lưu..." : "Lưu"}</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default AddBlog;