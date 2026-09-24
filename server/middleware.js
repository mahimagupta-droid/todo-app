export default function AuthMiddleware(req, res, next){
    const token = req.headers.token;
    if(!token) return res.status(404).json({
        message: "Faulty token | User not authenticated"
    });
}