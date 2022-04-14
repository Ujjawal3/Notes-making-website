const db=require('../db/model.js')

module.exports.login=async(req,res)=>{
    
    const user=await db.where("userid").equals(req.body.userid).where("password").equals(req.body.password);
   
    if(user.length!==0)
    {
        req.session.auth=user[0].userid;
        res.status(200).redirect('/dashboard');
    }
    else
    {   
        req.session.context="Invalid login credentials..";
        res.status(400).redirect('/login');
    }
}


module.exports.dashboard=async(req,res)=>{
    if(!req.session.auth)
    res.status(401).redirect('/');
    else
    {const user=await db.where("userid").equals(req.session.auth);
    res.render('dashboard',{arr: user[0].notes});}
}


module.exports.signup=async(req,res)=>{

    const user=await db.where("userid").equals(req.body.userid)

    if(user.length!==0)
    {
        req.session.context="Username in use! Choose a different Username";
        res.status(400).redirect('/signup');
    }
    else if (req.body.password!=req.body.confirmpassword)
    {
        req.session.context="Password and Confirm password do not match";
        res.status(400).redirect('/signup');
    }
    else
    {   
        const user= new db({userid:req.body.userid, password:req.body.password});
        await user.save();
        req.session.auth=req.body.userid;
        res.status(201).redirect('/dashboard');

    }
}

module.exports.data=async(req,res)=>{
    if(!req.session.auth)
    res.status(401).redirect('/');
    else
    {
        const user=await db.where("userid").equals(req.session.auth);
        if(user[0].notes.length>=(parseInt(req.params.id)+1))
        { 
            const note=user[0].notes[req.params.id];
            res.render('shownotes',{notes: note, index:req.params.id})
        }
        else
        {
            const note={
                title: null,
                data: null,
            }
            user[0].notes.push(note);
            await user[0].save();
            res.render('shownotes',{notes: note, index:req.params.id})
        }
    }
}

module.exports.update=async(req,res)=>{
    const user=await db.where("userid").equals(req.session.auth);
    user[0].notes[req.params.id].title=req.body.title;
    user[0].notes[req.params.id].data=req.body.data;
    await user[0].save();
    res.status(200).send(null);
}
