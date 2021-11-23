let btn = document.querySelector('.btn')
btn.onclick = () => {
    let div = document.createElement('div')
    div.innerText = 'you have clicked'
    document.body.appendChild(div)
}