
const cerrarSession = async(req, res) => {
    req.session.destroy((error) => {
        return res.redirect("/")
    } )
}

module.exports = cerrarSession