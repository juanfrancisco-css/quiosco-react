export const FormatearDinero = cantidad =>{
    return cantidad.toLocaleString('en-US',{
               style:'currency',
               currency:'USD'
    })
}