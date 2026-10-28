const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');



passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    //authentication logic here 
    try{
        //console.log('Recieved Credentials', USERNAME, password);
        const user = await Person.findOne({username : USERNAME});
        if(!user)
            return done(null, false, {mesaage : 'Incorrect username.'});//

        const isPaaswordMatch = await user.comparePassword(password);
        if(isPaaswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message : 'Incorrent password.'});
        }
        

    }catch(err){
        return done(err)
    }
}))

module.exports = passport; //exports configured password
