const mysql = require("mysql2/promise");
const config = require("./config");
const getFollowersHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)
    const followedUserId = req.params.id

    try {
        const [results] = await connection.query(
            'SELECT relationships.followerUserId, user.name, user.lastName FROM `relationships` ' +
            'LEFT JOIN `user` ON relationships.followedUserId = user.userId ' +
            'WHERE relationships.followedUserId = ?', [followedUserId])
        res.status(200).send(results)

    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }

}

const newFollowerHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)
    const followerUserId = req.params.id

    try {
        const [results] = await connection.query(
            'INSERT INTO relationships (`followerUserId, followedUserId`) VALUES (?,?)' , [followerUserId])
        res.status(200).send(results)

    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }

}

module.exports = { getFollowersHandler, newFollowerHandler}