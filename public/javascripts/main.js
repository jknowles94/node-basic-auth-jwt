async function loginFetch(url, data) {
  let body = {
    email: data.get("email"),
    password: data.get("password")
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if(res.status !== 200) {
      throw new Error(res.status);
    }
    return res.text();
  } catch(err) {
    return err;
  }
}

async function Login(e) {
  e.preventDefault();
  let form = document.getElementById("loginForm");
  let action = form.getAttribute("action");
  let data = new FormData(document.forms.loginForm);
  try {
    let res = await loginFetch(action, data);
    let token = JSON.parse(res).token;
    document.cookie = `token=${token}`;
    window.location.href = "/welcome";
  } catch(err) {
    console.log(err);
  }
}
