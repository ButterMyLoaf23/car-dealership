export const requiredAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
};

export const requiredRole = (role) => {
    return (req, res, next) => {
        if (!req.session.user || req.session.user.role !== role) {
            return res.send("Access denied bro");
        }
        next();
    };
};

export const definedUser = (req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
}