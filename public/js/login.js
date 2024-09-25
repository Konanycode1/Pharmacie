$(document).ready(function(){
    console.log("ooooo")
    //const urlDev = "http://localhost:3000"
    const token = JSON.parse(localStorage.getItem('x-token'));
    if(token !== null){
        window.location.href = `/dash`
    }
    else{
        $("#formLogin").on('click',(e)=>{
            e.preventDefault();
        });
    
        $("#btnLogin").on("click", ()=>{
    
            loading ();
            const userName = $("#numero").val();
            const password = $("#password").val();
    
            const data = {
                numero: userName,
                password
            }
            if(userName == "" || password == ""){
                closed("Veuillez remplir tout les champs", "bg-red-500")
            }
    
            $.ajax({
                url: "api/user/login",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(res) {
                    console.log(res)
                    const {status,userId,token} = res
                    if(status){
                        closed("Connexion encour ...","bg-green-400")
                        localStorage.setItem('x-token',JSON.stringify(token))
                        setTimeout(()=>{
                            window.location.href = `/dash`
                        },3000)
                    }
                    else{
                        closed("Connexion echouée","bg-red-700")
                        setTimeout(()=>{
                            window.location.reload()
                        },3000)
                    }
                },
                error: function(xhr, status, error) {
                    console.log('Error:', error);
                    alert('Error: ' + error);
                }
            });
    
        })
    }
   


});

function loading (){
    $('#textBtn').addClass("hidden")
    $(".load").removeClass('hidden')
}

function closed(message, color){
    $('#textBtn').removeClass("hidden");
    $(".load").addClass('hidden')
    $('#textBtn').text(message)
    $("#btnLogin").removeClass("bg-blue-400")
    $("#btnLogin").addClass(color)
}