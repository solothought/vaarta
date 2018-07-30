var shabdawali = require('shabdawali');

function TalkingNode(actor, count, delay, last ){
    this.actor = actor;
    this.count = count;
    this.delay = delay || 0;
    this.last = last;
    if(last){
        var that = this;
        last.actor.on('pause', function(){
            setTimeout( function(){
                actor.start(count);
            }, that.delay);
        })
    }
}

function Vaarta(){
    this.startingNode = {
        actor : {
            events : [],
            on : function(eventName, fn){
                this.events.push(fn);
            }
        }
    }
    this.last = this.startingNode;
    this.actors = {};
}

//register an actor
Vaarta.prototype.add = function(actorName, el, opts){
    this.actors[actorName] = {
        target : el,
        options: opts
    }
}

//resiter a speech
Vaarta.prototype.speak = function(actorName, dialauges, delay){
    return this._addTalkingNode(actorName, dialauges, delay, true);
}

//register a parallel speech 
Vaarta.prototype.and = function(actorName, dialauges, delay){
    return this._addTalkingNode(actorName, dialauges, delay);
}

Vaarta.prototype._addTalkingNode = function(actorName, dialauges, delay, appendToLast){
    if(typeof dialauges === 'string'){
        dialauges = [ dialauges ];
    }else if(!Array.isArray(dialauges) ){
        throw Error("invalid parameters");
    }
    var opts = Object.assign({},{ lines : dialauges }, this.actors[actorName].options );
    var actor = shabdawali( this.actors[actorName].target, opts );

    var talkingNode = new TalkingNode( actor, dialauges.length, delay , this.last );
    if(appendToLast === true)
        this.last = talkingNode ;

    return this;
}

Vaarta.prototype.start = function (){
    for(var i=0; i< this.startingNode.actor.events.length; i++){
        this.startingNode.actor.events[i]();
    }
}


module.exports = Vaarta;