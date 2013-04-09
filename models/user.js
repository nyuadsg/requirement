// we need mongoose
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	photo: String,
	fbID: Number,
	fbPosts: {type: Number, default: 0},
	postRank: Number,
	fbComments: {type: Number, default: 0},
	commentRank: Number,
	disabled: {type: Boolean, default: false}
});

userSchema.methods.getRank = function (cb) {
	
	// if( this.fbComments = undefined )
		// this.fbComments = 0;
		
	usr = this;
		
	User.count( { 'fbPosts' : { $gt : usr.fbPosts }, 'disabled': { '$not': true } }, function( err, count ) {
		usr.postRank = count + 1;
				
		User.count( { 'fbComments' : { $gt : usr.fbComments }, 'disabled': { '$not': true } }, function( err, count ) {
			
			usr.commentRank = count + 1;
			
			cb( usr.postRank, usr.commentRank );
		} );
		
	} );
}

var User = module.exports = mongoose.model('User', userSchema);