/**
 * Hàm giải mã token JWT để lấy thông tin người dùng
 * @param token Token JWT cần giải mã
 * @returns Thông tin người dùng từ token
 */
export function parseJwt(token: string) {
    try {
        // Lấy phần payload của token (phần thứ 2 sau khi tách bởi dấu chấm)
        const base64Url = token.split('.')[1];
        // Chuyển đổi base64url thành base64 thông thường
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // Giải mã base64 thành chuỗi JSON
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT token:', error);
        return null;
    }
}

/**
 * Hàm lấy userId từ token JWT
 * @returns userId hoặc null nếu không tìm thấy
 */
export function getUserIdFromToken() {
    try {
        // Lấy token từ localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }
        
        // Giải mã token
        const decodedToken = parseJwt(token);
        if (!decodedToken) {
            return null;
        }
        
        // Lấy userId từ token (nameid là ClaimTypes.NameIdentifier)
        const userId = decodedToken.nameid || decodedToken.sub || decodedToken.userId;
        return userId ? parseInt(userId) : null;
    } catch (error) {
        console.error('Error getting user ID from token:', error);
        return null;
    }
}
