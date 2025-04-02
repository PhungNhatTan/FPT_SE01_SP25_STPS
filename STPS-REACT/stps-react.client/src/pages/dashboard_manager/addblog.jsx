import React, { useState } from "react";

const AddBlog = ({ onCancel }) => {
    const [newBlog, setNewBlog] = useState({
        title: "",
        content: "",
        imageUrl: "",
        imageFile: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
        console.log("Thêm blog:", newBlog);
        // Logic để thêm blog vào danh sách
        onCancel(); // Quay lại danh sách
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewBlog({ ...newBlog, imageFile: file, imageUrl: URL.createObjectURL(file) });
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
                        value={newBlog.content}
                        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
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
                <button type="submit" className="btn btn-success me-2">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default AddBlog;