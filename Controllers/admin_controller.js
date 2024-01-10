const usermoadal =  require('../Modals/user_modal');





function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.adminPage = async (req, res)=> {
    const users = await usermoadal.find();
    const { _id, name, email } = req.session.user;
    const capitalizedName = capitalizeFirstLetter(name);
    res.render('adminpage', {capitalizedName, users});
}