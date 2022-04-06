const Event = require('../models/Event')
const User = require('../models/User')


module.exports = class EventController {
    static async showAllEvents(req, res) {
        res.render('/')
    }
    
    static async createEvent(req, res) {
        res.render('events/add')
    }

    static async createEventSave(req, res) {

        const event = {
            UserId: req.session.userid,
            name: req.body.name,
            city: req.body.city,
            private: false,
            description: req.body.description
        }

        try {
            await Event.create(event) //

            req.flash('message', 'Evento anunciado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
            } catch (err) {
                console.log('Erro:' + err)
            }
        }

}