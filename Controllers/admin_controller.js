const usermoadal =  require('../Modals/user_modal');





function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.adminPage = async (req, res)=> {
    const { _id, name, email } = req.session.user;
    const capitalizedName = capitalizeFirstLetter(name);
   
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 7;
    const skip = (page - 1) * pageSize;
    const users = await usermoadal.find().sort({ _id: -1 }).skip(skip).limit(pageSize);

    const totalUsers = await usermoadal.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);
    
    res.render('adminpage', { totalPages, currentPage: page,pageSize, capitalizedName, users });

}