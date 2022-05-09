const search=document.getElementById("search")
const search_suggestion= document.getElementById("search_suggestion")
document.getElementById("search-link").onclick=function () {
    search.classList.toggle("hidden")
    document.getElementsByTagName("body")[0].style.overflow='hidden'
}

search.addEventListener("click", function(event) {
    if (event.target.closest(".search_inner")) return

    search.classList.toggle("hidden")
    document.getElementsByTagName("body")[0].style.overflow='auto'
})

function sendData(e){
    let match= e.value.match(/^[a-zA-Z ]*/);
    let match2 =e.value.match(/\s*/);
    if(match2[0]===e.value){
        search_suggestion.innerHTML=''
        return;
    }
    if(match[0]===e.value){
        fetch('getAds',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({payload:e.value})
        }).then(res=>res.json()).then(data=>{
            let payload=data.payload
            search_suggestion.innerHTML='';
            if(payload.length<1){
                search_suggestion.innerHTML='<p class="text-center">Sorry. Nothing Found</p>'
                return;
            }
            payload.forEach((data,index)=>{
                if(index>0) search_suggestion.innerHTML+='<hr>'
                search_suggestion.innerHTML+=`<a href="/product/${data.product.id}">${data.product.name}</a>`
            })

        })
        return;
    }
    search_suggestion.innerHTML=''


}
