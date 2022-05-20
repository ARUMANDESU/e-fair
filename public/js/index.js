const search=document.getElementById("search")
const searchLink=document.getElementById("search-link")
const search_suggestion= document.getElementById("search_suggestion")
const search_suggestion_users= document.getElementById("search_suggestion_users")

searchLink.onclick=function () {
    searchLink.classList.toggle("hidden")
    search.classList.toggle("hidden")

    document.getElementsByTagName("body")[0].style.overflow='hidden'

    setInterval(()=>{search.focus()},1000)
}

search.addEventListener("click", function(event) {
    if (event.target.closest(".search_inner")) return
    searchLink.classList.toggle("hidden")
    search.classList.toggle("hidden")
    document.getElementsByTagName("body")[0].style.overflow='auto'
})

function sendData(e){
    searchLink.value=e.value
    let match= e.value.match(/^[a-zA-Z ]*/);
    let match2 =e.value.match(/\s*/);
    if(match2[0]===e.value){
        search_suggestion.innerHTML=''
        search_suggestion_users.innerHTML=''
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
            search_suggestion_users.innerHTML='';
            if(payload.productAndUser.length<1){
                search_suggestion.innerHTML='<p class="text-center">Sorry. Nothing Found</p>'
            }
            else{
                payload.productAndUser.forEach((data,index)=>{
                    if(index>0) search_suggestion.innerHTML+='<hr>'
                    search_suggestion.innerHTML+=`

                    <a class="py-3" href="/product/${data.product._id}">
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
            }
            if(payload.users.length<1){
                search_suggestion_users.innerHTML='<p class="text-center">Sorry. Nothing Found</p>'
            }
            else{
                payload.users.forEach((data,index)=>{
                    if(index>0) search_suggestion_users.innerHTML+='<hr>'
                    search_suggestion_users.innerHTML+=`
                    <a class="py-3" href="/user/profile/${data.username}">
                    <div class="container d-flex flex-row flex-wrap justtify-content-center">
                        <div class="ad_list_cover" style="background-image: url('${data.avatarUrl}')"></div>
                        <div class="ad_list_body">
                            <div class="ad_list_name">${data.username}</div>
                            <div class="ad_list_info">
                                <div class="ad_list_type">${data.description}...</div>
                            </div> 
                        </div> 
                    </div>
                    </a>`

                })
            }



        })
        return;
    }
    search_suggestion_users.innerHTML=''
    search_suggestion.innerHTML=''
}

function newAdd(comment,from,to){
    fetch(`/addComment/${from}/to/${to}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({payload:comment.value})
    })
}
function setStatus(id,status){
    fetch(`/catalog/set/${status}/${id}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
    })
}
function removeProduct(id){
    fetch(`/catalog/remove/${id}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
    })
}
function addToMyWishList(productID){
    fetch(`/addToMyWishList/${productID}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},

    })
}

function deleteFromMyWishList(productID){
    fetch(`/deleteFromMyWishList/${productID}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
    })
}

