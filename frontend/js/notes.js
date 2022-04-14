const form=document.querySelector('form');
const title=form.querySelector('textarea[name="title"]');
const data=form.querySelector('textarea[name="data"]');




const run=()=>{
    const tvalue=title.value;
    const dvalue=data.value;
    fetch(form.getAttribute('action'),{
        method:"POST",
        body:JSON.stringify({
            title: tvalue,
            data: dvalue
        }),
        headers:{
            "Content-type":"application/json; charset=UTF-8",
        }
    })
}

title.addEventListener('keyup',run);
data.addEventListener('keyup',run);
