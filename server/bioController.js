Bio = require('./bioModel');
exports.index = function (req, res) {
    Bio.get(function (err, bio) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Bio Successfully!",
            data: bio       
        });
    });
};

exports.add = function (req, res) {
    var bio = new Bio();
    bio.firstName = req.body.firstName? req.body.firstName: bio.firstName;
    bio.lastName = req.body.lastName;
    bio.email = req.body.email;
    bio.dateEvent = req.body.dateEvent;
    bio.save(function (err) {
        if (err) res.json(err);
           res.json({
           message: "New Bio Added!",
            data: bio
        });
    });
};

exports.view = function (req, res) {
    Bio.findById(req.params.bio_id, function (err, bio) {
        if (err)
            res.send(err);
        res.json({
            message: 'Bio Details',
            data: bio
        });
    });
};

exports.update = function (req, res) {
    Bio.findById(req.params.bio_id, function (err, bio) {
        if (err)
            res.send(err);
        bio.firstName = req.body.firstName? req.body.firstName: bio.firstName;
        bio.lastName = req.body.lastName;
        bio.email = req.body.email;
        bio.dateEvent = req.body.dateEvent;
        bio.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Bio Updated Successfully",
                data: bio
            });
        });
    });
};

exports.delete = function (req, res) {
    Bio.deleteOne({
        _id: req.params.bio_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Bio Deleted'
        })
    })
}