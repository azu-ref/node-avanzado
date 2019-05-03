const eventEmitter = require('events')

class PlatziverseAgent extends eventEmitter {
    constructor(opts){
        super()
        this._options = opts
        this._started = false
        this._timer = null
    }

    connect(){
        if(!this._started){
            this._started = true
            
            this.emit('connected')

            const opt = this._options
            this._timer = setInterval( () => {
                this.emit('agent/message', 'This is a Message')
            }, opt.interval)
        }
    }

    disconnect(){
        if(this._started){
            clearInterval(this._timer)
            this._started = false
            this.emit('disconnected')
        }
    }
}

module.exports = PlatziverseAgent