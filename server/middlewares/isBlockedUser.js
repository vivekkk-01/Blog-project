const isBlockedUser = (req, res, next) => {
    if (req.user.isBlocked) {
        return res.status(401).json(`Access denied, ${req.user.firstName} is blocked. You must've used profane words in our app. Contact the admin to resolve this issue.`)
    }
    next()
}

module.exports = isBlockedUser;