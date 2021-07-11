const express = require('express')
const event = express()
const EventModel = require('../mongoSchema.js/event')
const { ifUerNameExistInDataBase } = require('../utils/findUser')
const jwt = require('jsonwebtoken');
const fileUpload = require("express-fileupload")
const { ifUseraskedToJoin } = require('../utils/evevntProperties')
const pool = require('../db');
const queryes = require('../utils/querys');
const { format } = require('date-fns')
event.use(fileUpload())

event.use(async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const userFromToken = await jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
            return decoded;
        });
        const user = await ifUerNameExistInDataBase(userFromToken.userName);
        req.user = user;
        next();

    } catch (error) {
        res.json({ err: "somthing went wrong" }).status(400)
    }
});

event.get('/getEvent', async (req, res, next) => {
    try {
        const { user } = req
        if (!user) throw new Error()
        const events = await EventModel.find({})
        ifUseraskedToJoin(user, events)
        res.json({ events })
    } catch (error) {
        res.json({ err: "no result found" })
    }
})

event.post('/getEventsFilter', async (req, res, next) => {
    try {
        const { user } = req
        if (!user) throw new Error()
        const { location, category, dateOfEvent } = req.body
        let events = await EventModel.find({ $or: [{ category: category }, { location: location }, { dateOfEvent: dateOfEvent }] })

        if (events.length === 0) {
            events = await EventModel.find({})
            return res.json({ events })
        } else {
            return res.json({ events })
        }
    } catch (error) {
        res.json({ err: "no result found" })
    }

})

event.get('/chatAccess/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params
        const { user } = req
        if (!user) throw new Error()
        const events = await EventModel.find({ userId: userId, requestsPending: { $in: [user.userId] } }, { userId: userId, approvedRequests: { $in: [user.userId] } })
        if (events.length === 0) {
            res.json({ chatAccess: false })
        } else {
            res.json({ chatAccess: true })
        }
    } catch (error) {
        res.json({ err: "something went wrong" })
    }
})

event.post('/requestToJoin', async (req, res, next) => {
    try {
        const { user } = req
        if (!user) throw new Error()
        const { eventId } = req.body
        const ifUserSentRequest = await EventModel.find({ _id: eventId, requestsPending: user.userId })
        if (ifUserSentRequest.length === 0) {
            const res = await EventModel.findOneAndUpdate({ _id: eventId }, { $push: { requestsPending: user.userId } })
        }
        else {
            const result = await EventModel.findOneAndUpdate({ _id: eventId }, { $pull: { requestsPending: user.userId } })
        }
        res.json(user)
    } catch (error) {
        res.json({ err: "something went wrong" })
    }
})

event.post('/addEvent', async (req, res, next) => {
    try {
        const { user } = req
        const { userId } = user
        const { event, tagPeople, img, private } = req.body
        console.log(req.body)
        const { description, location, dateOfEvent, category, eventName } = event
        const eventModel = new EventModel({ eventName, description, location, dateOfEvent, category, img, tagPeople, private, userId })
        await eventModel.save()
        const events = await EventModel.find()
        console.log(events)
        res.json({ events })
    } catch (error) {
        res.json({ err: "event dos't save" })
    }
})

event.get('/myEvent', async (req, res, next) => {
    try {
        const { user } = req

        const myEventsPost = await EventModel.find({ userId: user.userId })
        const requstOnPending = await EventModel.find({ requestsPending: { $in: [user.userId] } })
        var OneDay = new Date().getTime() - (1 * 24 * 60 * 60 * 1000)
        const yesterdayH = format(OneDay, 'HH:mm')
        const yesterdayD = format(OneDay, 'yyyy-MM-dd')
        const yesterday = yesterdayD + "T" + yesterdayH
        const todayH = format(new Date().getTime(), 'HH:mm')
        const todayD = format(new Date().getTime(), 'yyyy-MM-dd')
        const today = todayD + "T" + todayH
        const eventIHaveBeenIn = await EventModel.find({ dateOfEvent: { $lt: today, $gte: yesterday } })
        res.json({ myEventsPost, eventIHaveBeenIn, requstOnPending })
    } catch (error) {
        res.status(500)
    }
})

event.post('/usersDetails', async (req, res, next) => {
    try {
        const users = req.body
        users.forEach(async (item, i) => {
            const [user] = await pool.execute(queryes.findUsersDetails, [item]);
            return user
        })
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})



event.post('/ignoreUser', async (req, res, next) => {
    try {
        const { userId, eventId } = req.body
        await EventModel.findOneAndUpdate({ _id: eventId }, { $pull: { requestsPending: userId } })
        const myEventsPost = await EventModel.find({ userId: user.userId })
        res.json(myEventsPost)


    } catch (error) {
        res.status(500)
    }
})


event.post('/approveUser', async (req, res, next) => {
    try {
        const { userId, eventId } = req.body
        await EventModel.findOneAndUpdate({ _id: eventId }, { $pull: { requestsPending: userId } })
        await EventModel.findOneAndUpdate({ _id: eventId }, { $push: { approvedRequests: userId } })
        const event = await EventModel.find({ _id: eventId })
        const [first] = event
        const { requestsPending } = first
        if (requestsPending.length === 0) res.json([])
        else {
            const [users] = await pool.execute(queryes.findUsersDetails(event.requestsPending));
            res.json(users)
        }

    } catch (error) {
        res.status(500)
    }
})





module.exports = event