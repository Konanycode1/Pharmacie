$(document).ready(function(){

    //const urlDev = "http://localhost:3000"

        $("#formSign").on('click',(e)=>{
            e.preventDefault();
        });
    
        $("#btnSign").on("click", ()=>{
            console.log("hello")
            loading ();
            const nom = $("#nom").val();
            const prenom = $("#prenom").val();
            const numero = $("#numero").val();
            const fonction = $("#fonction").val();
            const pays = $("#pays").val();
            const ville = $("#ville").val();
            const password = $("#password").val();
            const data = {
                nom,
                prenom,
                numero,
                fonction,
                pays,
                ville,
                password
            }
            console.log(data)
            if(nom == "" || password == "" || prenom == "" || numero == "" || fonction == "" || pays == "" || ville == ""){
                closed("Veuillez remplir tout les champs", "bg-red-500")
            }
    
            $.ajax({
                url: "api/user",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(res) {
                    console.log(res)
                    const {success,msg} = res
                    if(success){
                        closed(msg,"bg-green-400")
                        
                        setTimeout(()=>{
                            window.location.href = `/`
                        },3000)
                    }
                    else{
                        closed(msg,"bg-red-500")
                        setTimeout(()=>{
                            window.location.reload()
                        },3000)
                    }
                },
                error: function(xhr, status, error) {
                    console.log(error)
                    closed("erreur", "bg-red-500")
                    console.log('Error:', error);
                    alert('Error: ' + error);
                }
            });
    
        })
   


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