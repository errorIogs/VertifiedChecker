var PlayerProfileURL = window.location.href
var userID = String(PlayerProfileURL).split("/")[4]
var VerifiedIDS = [
    1567446,
    102611803,
    18824203
]
var usertext = document.getElementsByClassName("profile-name text-overflow")[0]
var userInv = "https://inventory.roblox.com/v2/users/"  + userID+ "/inventory/8?cursor=&limit=100&sortOrder=Desc"
var isAccountVerified = false
var items = []
console.log(userInv)
function fetchJSONData(invJSON) {
    fetch(invJSON)

        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
            .then(data => {         
            // console.log(data.data)
            for(index in data.data){
                items.push(data.data[index])
            }
            if(data.nextPageCursor){
              //  console.log(data.nextPageCursor)
                var newPage = "https://inventory.roblox.com/v2/users/"  + userID+ "/inventory/8?cursor=" +data.nextPageCursor + "&limit=100&sortOrder=Desc"
            fetchJSONData(newPage)
            }else{
               // console.log(items)
                for(index in items){
                    // console.log(data.data[index].assetId)
                        if (items[index].collectibleItemId != null){
                            console.log(items[index].assetName)
                        }
                        for(    vi in VerifiedIDS){
                            if( VerifiedIDS[vi] == items[index].assetId){
                                isAccountVerified = true
                            }
                        }
                    }
                
                    if(isAccountVerified){
                        usertext.style.color = "#ff0000" 
                    }else{
                        usertext.style.color = "#43ff00" 
                    }
            }
        
        })
          
        .catch(error => {
            usertext.style.color = "rgb(255, 217, 0)" 
        }); 
        
}

fetchJSONData(userInv)
