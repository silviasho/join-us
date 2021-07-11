export  const convertBase64=(file)=>{
    return new Promise ((resolve,reject)=>{
        const fileReder=new FileReader()
        fileReder.readAsDataURL(file)
        console.log(file)
        fileReder.onload=()=>{
            resolve({base64:fileReder.result,name:file.name})
        }
        fileReder.onerror=(err)=>{
            reject(err)
    
        }
    })
        }