import jwt from "jsonwebtoken";

const authMiddleware = async (request, response, next) => {
    let jwtToken
    const authHeader = request.headers['authorization']
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(' ')[1]
    }
    if (jwtToken === undefined) {
        response.status(401)
        response.send('Invalid JWT Token')
    } else {
        jwt.verify(jwtToken, process.env.MY_SECRECT_KEY, async (error, payload) => {
            if (error) {
                response.status(401)
                response.send('Invalid JWT Token')
            } else {
                request.userId = payload.userId
                next()
            }
        })
    }
};
export default authMiddleware;
