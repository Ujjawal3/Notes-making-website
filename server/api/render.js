module.exports.login=(req,res)=>{
    if(req.session.auth)
    {res.redirect('/dashboard')
     return;}
        
    const response=req.session.context;
    req.session.context=" ";
    res.render('signin',{message: response})
}


module.exports.signup=(req,res)=>{
    if(req.session.auth)
    {res.redirect('/dashboard')
     return;}

    const response=req.session.context;
    req.session.context=" ";
    res.render('signup',{message: response});
}

module.exports.home=(req,res)=>{
    if(req.session.auth)
    res.render('homepage',{message1:"Dashboard",message2:" ", message5:"Logout", message3:"Go to Dashboard", message4:" "});
    else
    res.render('homepage',{message1:"SignIN", message2:"SignUP",message3:"Sign Up for FREE!!",message4:"Already have an account? LogIn.", message5:""});
}

module.exports.logout=(req,res)=>{
    req.session.auth=null;
    res.redirect('/');
}