function like(tab){
    if(typeof tab != "object"){
        return "la variable doit etre un tableau"
    }
    const count = tab.length;
    switch (count) {
        case 0:
            return "no one likes this"
        case 1:
            return `${tab[0]} like this`
        case 2:
            return `${tab[0]} and ${tab[1]} like this`
        case 3:
            return `${tab[0]}, ${tab[1]} and ${2} like this`
        
        default:
            return `${tab[0]}, ${tab[1]} and ${count-2} others like this`
    }


}
function add(nb1,nbr2){
    return nb1+nbr2
}

function tva(nmb,pour){
    if(typeof nmb != "number" || typeof pour != "number"){
        return -1
    }
    return (nmb*pour)/100

}
function somme_paire(table) {
    if(typeof table != "object"){
        return -1
    }
    let somme = 0

    for(let i = 0; i < table.length;i++){
        if(table[i] %2 === 0){
            somme+=table[i]
        }
    }
    return somme
    
}

function inverse_tableau(tab) {
    if(typeof tab != "object"){
        return -1
    }
    return tab.reverse()
}

function est_anagramme(let1,let2){
    if(typeof let1 !== "string" || typeof let2 !== "string"){
        return -1
    }
    const one = let1.split("").sort().join('')
    const two = let2.split("").sort().join('')
    return one === two


}


function filtre_voyelles(ch) {
    const voy = ["a","e","y","u","i","o","A","E","Y","U","I","O"]
    if(typeof ch != "string"){
        return -1
    }
    let voyelles = ""
    const table = ch.split("")
    for(let i = 0; i < table.length;i++){
        if( voy.includes(table[i])){
            voyelles+=table[i]
        }
    }
    return voyelles
    
}

function changement_casse(ch) {
    if(typeof ch != "string"){
        return -1
    }

    return ch.split("").map(ele =>{ return ele === ele.toLowerCase()?ele.toUpperCase():ele.toLowerCase()}).join('')
}

function tri_impairs(ch) {
    const impairs = ch.filter(num => num % 2 !== 0).sort((a, b) => a - b);
    let index = 0;
    return ch.map(num => num % 2 !== 0 ? impairs[index++] : num);
}

function trouver_sous_ensemble(val, inter) {
    const n = val.length;
    function subSum(i, sum) {
        if (sum === 0) return true;
   
        if (i === 0 && sum !== 0) return false;
        if (val[i - 1] > sum) {
            return subSum(i - 1, sum);
        }
        return subSum(i - 1, sum) || subSum(i - 1, sum - val[i - 1]);
    }
    return subSum(n, inter);
}




console.log(add(2,4))
// 6
console.log(like(["ab","issa","bou", "ba","bi"]))
// ab, issa and 3 others like this
console.log(tva(1000,18))
//180

console.log(somme_paire([1,2,3,4]))
// 6
console.log(somme_paire([10,15,20]))
// 30

console.log(inverse_tableau([1,2,3,4]))
// [ 4, 3, 2, 1 ]

console.log(est_anagramme("azer","azer"))
// true

console.log(filtre_voyelles("bonjours"))
//oou

console.log(changement_casse("BonJour"))
// bONjOUR

console.log(tri_impairs([5, 3, 2, 8, 1, 4]))
/// [ 1, 3, 2, 8, 5, 4 ]

console.log(trouver_sous_ensemble([3, 34, 4, 12, 5, 2], 9))
//true