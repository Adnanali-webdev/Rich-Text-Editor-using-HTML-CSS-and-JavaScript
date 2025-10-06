
const formatDoc = (cmd, value=false) => {
    if(value){
        document.execCommand(cmd, false, value)
    }
    else{
       document.execCommand(cmd)

    }
};

const addLink = () => {
    const url = prompt("Insert url");
    formatDoc("createLink", url);

}

const content = document.getElementById('content');

content.addEventListener('mouseenter' , () => {
    let anchors = document.querySelectorAll('a');
    anchors.forEach((anchor) => {
        anchor.addEventListener('mouseenter', () => {
            anchor.setAttribute("target", "_blank")
            content.setAttribute("contenteditable", false);
        })

        anchor.addEventListener("mouseleave", () => {
            content.setAttribute("contenteditable", true );
        })
    })
})

let fileName = document.getElementById('filename');
const fileHandle = (value) => {

    if(value === "new"){
        content.innerHTML = "";
        fileName.value = "untitled";
        }
        if(value === "pdf"){
            html2pdf(content).save(fileName.value)
        }

        if(value === "txt"){
            const extractedText = content.innerText;
            const blob = new Blob([extractedText]);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName.value + ".txt";
            a.click();
        }
}

let active = false;
let showCode = document.getElementById('show-code');

showCode.addEventListener('click', () => {
    active = !active;
    showCode.dataset.active = active;
    if(active){
        content.textContent = content.innerHTML;
    content.setAttribute('contenteditable', false)
    }
    else{
      content.innerHTML = content.textContent;  
    content.setAttribute('contenteditable', true)

    }
})