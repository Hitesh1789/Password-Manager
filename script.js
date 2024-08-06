console.log("Jai Shri Ram");

const encrypt = (message)=>{
    //Encrypt password based on secretkey to store it in database
    const encrpytedtext = CryptoJS.AES.encrypt(message, "SecretKeyforSafety").toString();
    return encrpytedtext;
}

const decrypt = (encrpytedtext)=>{
    //Decrypt password based on secertkey for making original password available to the user
    const originalMessage = CryptoJS.AES.decrypt(encrpytedtext, "SecretKeyforSafety").toString(CryptoJS.enc.Utf8);
    return originalMessage;
}

const showPasswords = () => {

    //logic to fill the table
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No data To show"
    }
    else {
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
        </tr>`
        let arr = JSON.parse(data);
        let str = "";
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            str += ` <tr>
            <td>${element.website}<img src="copy.svg" alt= "Copy button" onclick="copyText('${element.website}')"></td>
            <td>${element.username}<img 
src="copy.svg" alt= "Copy button" onclick="copyText('${element.username}')"></td>
            <td>${maskPassword(decrypt(element.password))}<img src="copy.svg" alt= "Copy button" onclick="copyText('${decrypt(element.password)}')"></td>
            <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr> `
        }

        tb.innerHTML = tb.innerHTML + str;
        website.value = "";
        password.value = "";
        username.value = "";
    }

}

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`Successfully deleted ${website}'s password`)
    showPasswords();
}

const copyText = (txt) => {
    navigator.clipboard.writeText(txt).then(
        () => {
            // alert("Copied successfully : " + txt)
            alert1.style.display = "inline";
            setTimeout(() => {
                alert1.style.display = "none";
            }, 2000);
        },
        () => {
            alert("Failed to copy the text");
        }
    );
}

function maskPassword(pass) {
    let str = ""
    for (let i = 0; i < pass.length; i++) {
        str += "*"
    }
    return str
}

showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();  //so that form not submit and page not reload
    // console.log("Submit");
    // console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords");
    // console.log(passwords);
    if (passwords == null) {
        let arr = [];
        arr.push({ website: website.value, username: username.value, password: encrypt(password.value) });
        alert("Password Saved!")
        localStorage.setItem("passwords", JSON.stringify(arr));
    }
    else {
        let arr = JSON.parse(localStorage.getItem("passwords"))
        arr.push({ website: website.value, username: username.value, password: encrypt(password.value)});
        alert("Password Saved!")
        localStorage.setItem("passwords", JSON.stringify(arr));
    }
    showPasswords();
})


//about section hover
document.querySelector(".about").addEventListener("mouseover",(e)=>{   
    document.querySelector(".about1").style.display = "block";
})

document.querySelector(".about").addEventListener("mouseout",(e)=>{   
    document.querySelector(".about1").style.display = "none";
})

//conatct section hover
document.querySelector(".contact").addEventListener("mouseover",(e)=>{   
    document.querySelector(".contact1").style.display = "block";
})

document.querySelector(".contact").addEventListener("mouseout",(e)=>{   
    document.querySelector(".contact1").style.display = "none";
})
