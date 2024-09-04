const admincookieToken = (admin, res) => {
    const token = admin.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // makes the token available only to backend
        secure: true,   // Only send over HTTPS
        sameSite: 'none' // Allow cross-origin requests
    };


    admin.password = undefined;
    res.status(200).cookie("admintoken", token, options).json({
        success: true,
        token,
        admin
    });
   
};
module.exports = admincookieToken;