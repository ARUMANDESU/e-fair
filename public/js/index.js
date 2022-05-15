const search=document.getElementById("search")
const search_suggestion= document.getElementById("search_suggestion")
document.getElementById("search-link").onclick=function () {
    search.classList.toggle("hidden")
    document.getElementById("search-link").focus()
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
                search_suggestion.innerHTML+=`
                    <a class="pb-3" href="/product/${data.product._id}">
                    <div class="container d-flex flex-row flex-wrap justtify-content-center">
                        <div class="ad_list_cover" style="background-image: url('${data.product.images[0].path}')"></div>
                        <div class="ad_list_body">
                            <div class="ad_list_name">${data.product.name}</div>
                            <div class="ad_list_info">
                                <div class="ad_list_rating">${data.product.rating}</div>
                                <div class="ad_list_type">${data.product.type.toString().slice(0,1)+data.product.type.toString().slice(1,)}</div>
                                <div class="ad_list_owner"><a href="/user/profile/${data.user.username}">${data.user.username}</a></div>
                            </div> 
                        </div> 
                    </div>
                        
                    </a>`
            })

        })
        return;
    }
    search_suggestion.innerHTML=''
}

function newAdd(comment,from,to){
    console.log("something")
    fetch(`/addComment/${from}/to/${to}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({payload:comment.value})
    })
}
