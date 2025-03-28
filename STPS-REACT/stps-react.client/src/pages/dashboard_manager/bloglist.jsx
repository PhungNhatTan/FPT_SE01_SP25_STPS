import React, { useState } from "react";
import "./style/dashboard_manager.css"; // Đảm bảo đường dẫn tới CSS nếu cần

const initialBlogs = [
    { id: "001", title: "Blog 1", content: "Nội dung blog 1" },
    { id: "002", title: "Blog 2", content: "Nội dung blog 2" },
];

const BlogList = ({ onAddBlog, onEditBlog }) => {
    const [blogList, setBlogList] = useState(initialBlogs);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBlogs = blogList.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa blog này?")) {
            setBlogList(blogList.filter((blog) => blog.id !== id));
        }
    };

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

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th className="text-center" style={{ width: "150px" }}>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBlogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>{blog.id}</td>
                            <td>{blog.title}</td>
                            <td>{blog.content}</td>
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